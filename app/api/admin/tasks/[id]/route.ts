import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/command/auth'
import { sql } from '@/lib/db'

interface Props {
  params: Promise<{ id: string }>
}

export async function PATCH(request: Request, { params }: Props) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { status, assignee_id, due_date } = body

    // Get current task for logging
    const [currentTask] = await sql`
      SELECT * FROM command_tasks WHERE id = ${parseInt(id)}
    `

    if (!currentTask) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 })
    }

    // Update task
    const [task] = await sql`
      UPDATE command_tasks 
      SET 
        status = COALESCE(${status}, status),
        assignee_id = COALESCE(${assignee_id}, assignee_id),
        due_date = COALESCE(${due_date}, due_date),
        updated_at = NOW()
      WHERE id = ${parseInt(id)}
      RETURNING *
    `

    // Log activity if status changed
    if (status && status !== currentTask.status) {
      await sql`
        INSERT INTO command_activity (user_id, action, property_id, details)
        VALUES (
          ${user.id}, 
          ${`task_${status}`}, 
          ${currentTask.property_id},
          ${JSON.stringify({ task_id: id, task_title: currentTask.title })}::jsonb
        )
      `
    }

    // Check if all tasks in phase are complete - auto advance phase
    if (status === 'completed') {
      const [incompleteTasks] = await sql`
        SELECT COUNT(*) as count FROM command_tasks 
        WHERE phase_id = ${currentTask.phase_id} AND status != 'completed'
      `

      if (Number(incompleteTasks.count) === 0) {
        // All tasks complete, get next phase
        const currentPhase = await sql`
          SELECT phase_order FROM command_phases WHERE id = ${currentTask.phase_id}
        `
        
        const nextPhase = await sql`
          SELECT phase_order FROM command_phases 
          WHERE property_id = ${currentTask.property_id} 
            AND phase_order > ${currentPhase[0].phase_order}
          ORDER BY phase_order
          LIMIT 1
        `

        if (nextPhase.length > 0) {
          await sql`
            UPDATE command_properties 
            SET current_phase = ${nextPhase[0].phase_order}
            WHERE id = ${currentTask.property_id}
          `
        } else {
          // No more phases - mark property as active
          await sql`
            UPDATE command_properties 
            SET status = 'active'
            WHERE id = ${currentTask.property_id}
          `
        }
      }
    }

    return NextResponse.json({ task })
  } catch (error) {
    console.error('Update task error:', error)
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 })
  }
}
