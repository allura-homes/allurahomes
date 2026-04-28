import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/command/auth'
import { sql } from '@/lib/db'
import { getDefaultPhases } from '@/lib/command/onboarding-template'

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const properties = await sql`
      SELECT 
        p.*,
        ph.name as current_phase_name,
        ph.color as current_phase_color,
        (SELECT COUNT(*) FROM command_tasks t WHERE t.property_id = p.id AND t.status = 'completed') as completed_tasks,
        (SELECT COUNT(*) FROM command_tasks t WHERE t.property_id = p.id) as total_tasks
      FROM command_properties p
      LEFT JOIN command_phases ph ON p.current_phase_id = ph.id
      ORDER BY p.created_at DESC
    `

    return NextResponse.json({ properties })
  } catch (error) {
    console.error('Get properties error:', error)
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, address, bedrooms, bathrooms, owner_name, owner_email, owner_phone, notes } = body

    if (!name || !address) {
      return NextResponse.json(
        { error: 'Name and address are required' },
        { status: 400 }
      )
    }

    // Create property
    const [property] = await sql`
      INSERT INTO command_properties (name, address, bedrooms, bathrooms, owner_name, owner_email, owner_phone, notes, status)
      VALUES (${name}, ${address}, ${bedrooms}, ${bathrooms}, ${owner_name}, ${owner_email}, ${owner_phone}, ${notes}, 'onboarding')
      RETURNING *
    `

    // Create default phases and tasks from template
    const template = getDefaultPhases()
    let firstPhaseId: number | null = null

    for (const phaseTemplate of template) {
      const [phase] = await sql`
        INSERT INTO command_phases (property_id, name, color, phase_order)
        VALUES (${property.id}, ${phaseTemplate.name}, ${phaseTemplate.color}, ${phaseTemplate.phase_order})
        RETURNING id
      `

      if (firstPhaseId === null) {
        firstPhaseId = phase.id
      }

      for (const taskTemplate of phaseTemplate.tasks) {
        const [task] = await sql`
          INSERT INTO command_tasks (property_id, phase_id, title, description, task_order, status)
          VALUES (${property.id}, ${phase.id}, ${taskTemplate.title}, ${taskTemplate.description || null}, ${taskTemplate.task_order}, 'pending')
          RETURNING id
        `

        if (taskTemplate.subtasks) {
          for (const subtaskTemplate of taskTemplate.subtasks) {
            await sql`
              INSERT INTO command_subtasks (task_id, title, subtask_order, is_completed)
              VALUES (${task.id}, ${subtaskTemplate.title}, ${subtaskTemplate.subtask_order}, false)
            `
          }
        }
      }
    }

    // Update property with first phase
    if (firstPhaseId) {
      await sql`
        UPDATE command_properties 
        SET current_phase_id = ${firstPhaseId}
        WHERE id = ${property.id}
      `
    }

    // Log activity
    await sql`
      INSERT INTO command_activity (user_id, action, property_id, details)
      VALUES (${user.id}, 'property_created', ${property.id}, ${JSON.stringify({ name, address })}::jsonb)
    `

    return NextResponse.json({ property })
  } catch (error) {
    console.error('Create property error:', error)
    return NextResponse.json({ error: 'Failed to create property' }, { status: 500 })
  }
}
