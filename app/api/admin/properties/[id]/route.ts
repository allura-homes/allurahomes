import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/command/auth'
import { sql } from '@/lib/db'

interface Props {
  params: Promise<{ id: string }>
}

export async function GET(request: Request, { params }: Props) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const [property] = await sql`
      SELECT 
        p.*,
        ph.name as current_phase_name,
        ph.color as current_phase_color
      FROM command_properties p
      LEFT JOIN command_phases ph ON p.current_phase = ph.phase_order AND ph.property_id = p.id
      WHERE p.id = ${parseInt(id)}
    `

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 })
    }

    // Get phases
    const phases = await sql`
      SELECT * FROM command_phases 
      WHERE property_id = ${id}
      ORDER BY phase_order
    `

    // Get tasks
    const tasks = await sql`
      SELECT 
        t.*,
        ph.name as phase_name,
        ph.color as phase_color
      FROM command_tasks t
      JOIN command_phases ph ON t.phase_id = ph.id
      WHERE t.property_id = ${id}
      ORDER BY ph.phase_order, t.task_order
    `

    // Get subtasks
    const taskIds = tasks.map((t: any) => t.id)
    const subtasks = taskIds.length > 0 
      ? await sql`
          SELECT * FROM command_subtasks 
          WHERE task_id = ANY(${taskIds})
          ORDER BY subtask_order
        `
      : []

    return NextResponse.json({ property, phases, tasks, subtasks })
  } catch (error) {
    console.error('Get property error:', error)
    return NextResponse.json({ error: 'Failed to fetch property' }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: Props) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()

    const updates: string[] = []
    const values: any[] = []

    if (body.name !== undefined) {
      updates.push('name')
      values.push(body.name)
    }
    if (body.address !== undefined) {
      updates.push('address')
      values.push(body.address)
    }
    if (body.status !== undefined) {
      updates.push('status')
      values.push(body.status)
    }
    if (body.current_phase !== undefined) {
      updates.push('current_phase')
      values.push(body.current_phase)
    }

    if (updates.length === 0) {
      return NextResponse.json({ error: 'No updates provided' }, { status: 400 })
    }

    // Build dynamic update query
    const [property] = await sql`
      UPDATE command_properties 
      SET ${sql(updates.reduce((acc, field, i) => ({ ...acc, [field]: values[i] }), {}))}
      WHERE id = ${parseInt(id)}
      RETURNING *
    `

    // Log activity
    await sql`
      INSERT INTO command_activity (user_id, action, property_id, details)
      VALUES (${user.id}, 'property_updated', ${parseInt(id)}, ${JSON.stringify({ updates })}::jsonb)
    `

    return NextResponse.json({ property })
  } catch (error) {
    console.error('Update property error:', error)
    return NextResponse.json({ error: 'Failed to update property' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: Props) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    // Get property name for logging
    const [property] = await sql`
      SELECT name FROM command_properties WHERE id = ${parseInt(id)}
    `

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 })
    }

    // Delete in order: subtasks -> tasks -> phases -> property
    await sql`DELETE FROM command_subtasks WHERE task_id IN (SELECT id FROM command_tasks WHERE property_id = ${parseInt(id)})`
    await sql`DELETE FROM command_tasks WHERE property_id = ${parseInt(id)}`
    await sql`DELETE FROM command_phases WHERE property_id = ${parseInt(id)}`
    await sql`DELETE FROM command_properties WHERE id = ${parseInt(id)}`

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete property error:', error)
    return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 })
  }
}
