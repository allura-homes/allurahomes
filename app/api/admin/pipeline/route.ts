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

    const properties = await sql`
      SELECT 
        p.*,
        ph.name as current_phase_name,
        ph.color as current_phase_color,
        ph.phase_order as phase_position,
        (SELECT COUNT(*) FROM command_tasks t WHERE t.property_id = p.id AND t.status = 'completed') as completed_tasks,
        (SELECT COUNT(*) FROM command_tasks t WHERE t.property_id = p.id) as total_tasks
      FROM command_properties p
      LEFT JOIN command_phases ph ON p.current_phase = ph.phase_order AND ph.property_id = p.id
      WHERE p.status = 'onboarding'
      ORDER BY ph.phase_order, p.created_at DESC
    `

    // Get distinct phase names for column headers
    const phases = await sql`
      SELECT DISTINCT name, color, phase_order
      FROM command_phases
      ORDER BY phase_order
    `

    return NextResponse.json({ properties, phases })
  } catch (error) {
    console.error('Failed to fetch pipeline:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
