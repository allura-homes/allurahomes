import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { verifyToken } from '@/lib/command/auth'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  try {
    // Check auth from cookie or Authorization header
    const cookieStore = await cookies()
    let token = cookieStore.get('command_session')?.value
    
    if (!token) {
      const authHeader = request.headers.get('Authorization')
      if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.slice(7)
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

    // Get stats
    const [properties] = await sql`
      SELECT 
        COUNT(*) FILTER (WHERE status = 'onboarding') as onboarding,
        COUNT(*) FILTER (WHERE status = 'active') as active,
        COUNT(*) as total
      FROM command_properties
    `
    
    const [tasks] = await sql`
      SELECT 
        COUNT(*) FILTER (WHERE status = 'pending') as pending,
        COUNT(*) FILTER (WHERE status = 'in_progress') as in_progress,
        COUNT(*) FILTER (WHERE status = 'completed') as completed,
        COUNT(*) as total
      FROM command_tasks
    `
    
    const [leads] = await sql`
      SELECT COUNT(*) as total FROM command_leads WHERE status = 'new'
    `

    // Get my tasks
    const myTasks = await sql`
      SELECT 
        t.id,
        t.title,
        t.status,
        t.due_date,
        t.property_id,
        p.name as property_name,
        ph.name as phase_name,
        ph.color as phase_color
      FROM command_tasks t
      JOIN command_properties p ON t.property_id = p.id
      LEFT JOIN command_phases ph ON t.phase_id = ph.id
      WHERE t.assignee_id = ${userId}
        AND t.status != 'completed'
      ORDER BY t.due_date ASC NULLS LAST
      LIMIT 5
    `

    // Get recent activity
    const activity = await sql`
      SELECT 
        a.id,
        a.action,
        a.details,
        a.created_at,
        u.name as user_name,
        p.name as property_name
      FROM command_activity a
      LEFT JOIN command_users u ON a.user_id = u.id
      LEFT JOIN command_properties p ON a.property_id = p.id
      ORDER BY a.created_at DESC
      LIMIT 10
    `

    return NextResponse.json({
      stats: {
        properties: {
          onboarding: Number(properties.onboarding) || 0,
          active: Number(properties.active) || 0,
          total: Number(properties.total) || 0,
        },
        tasks: {
          pending: Number(tasks.pending) || 0,
          in_progress: Number(tasks.in_progress) || 0,
          completed: Number(tasks.completed) || 0,
          total: Number(tasks.total) || 0,
        },
        newLeads: Number(leads.total) || 0,
      },
      myTasks,
      activity,
    })
  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
