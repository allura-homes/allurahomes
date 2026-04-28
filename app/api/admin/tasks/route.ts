import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { sql } from '@/lib/db'
import { verifyToken } from '@/lib/command/auth'

export async function GET(request: Request) {
  try {
    // Check auth from cookie or header
    const cookieStore = await cookies()
    let token = cookieStore.get('command_session')?.value
    
    if (!token) {
      const authHeader = request.headers.get('Authorization')
      if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.substring(7)
      }
    }

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const userId = payload.userId

    const tasks = await sql`
      SELECT 
        t.*,
        p.name as property_name,
        p.address as property_address,
        ph.name as phase_name,
        ph.color as phase_color
      FROM command_tasks t
      JOIN command_properties p ON t.property_id = p.id
      LEFT JOIN command_phases ph ON t.phase_id = ph.id
      WHERE t.assignee_id = ${userId}
      ORDER BY 
        CASE t.status 
          WHEN 'in_progress' THEN 1 
          WHEN 'pending' THEN 2 
          WHEN 'completed' THEN 3 
        END,
        t.due_date ASC NULLS LAST
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

    const tasksWithSubtasks = tasks.map((task: any) => ({
      ...task,
      subtasks: subtasks.filter((s: any) => s.task_id === task.id),
    }))

    return NextResponse.json({ tasks: tasksWithSubtasks })
  } catch (error) {
    console.error('Failed to fetch tasks:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
