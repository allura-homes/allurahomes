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
    const { is_completed } = body

    const [subtask] = await sql`
      UPDATE command_subtasks 
      SET is_completed = ${is_completed}, updated_at = NOW()
      WHERE id = ${parseInt(id)}
      RETURNING *
    `

    if (!subtask) {
      return NextResponse.json({ error: 'Subtask not found' }, { status: 404 })
    }

    // Check if all subtasks in task are complete - auto mark task in progress
    const [incompleteSubtasks] = await sql`
      SELECT COUNT(*) as count FROM command_subtasks 
      WHERE task_id = ${subtask.task_id} AND is_completed = false
    `

    if (Number(incompleteSubtasks.count) === 0) {
      // All subtasks complete - mark task as completed
      await sql`
        UPDATE command_tasks 
        SET status = 'completed', updated_at = NOW()
        WHERE id = ${subtask.task_id}
      `
    } else if (is_completed) {
      // At least one subtask done - mark task as in_progress
      await sql`
        UPDATE command_tasks 
        SET status = 'in_progress', updated_at = NOW()
        WHERE id = ${subtask.task_id} AND status = 'pending'
      `
    }

    return NextResponse.json({ subtask })
  } catch (error) {
    console.error('Update subtask error:', error)
    return NextResponse.json({ error: 'Failed to update subtask' }, { status: 500 })
  }
}
