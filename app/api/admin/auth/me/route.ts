import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/command/auth'
import { sql } from '@/lib/db'

export async function GET(request: Request) {
  try {
    // Get token from cookie or Authorization header
    const cookieStore = await cookies()
    let token = cookieStore.get('command_session')?.value

    // Fallback to Authorization header for localStorage-based auth
    if (!token) {
      const authHeader = request.headers.get('Authorization')
      if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.slice(7)
      }
    }

    console.log('[v0] /api/admin/auth/me - token exists:', !!token)

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const payload = await verifyToken(token)
    console.log('[v0] /api/admin/auth/me - payload:', payload)

    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const users = await sql`
      SELECT id, email, name, role 
      FROM command_users 
      WHERE id = ${payload.userId}
    `

    if (users.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 })
    }

    return NextResponse.json({ user: users[0] })
  } catch (error) {
    console.error('[v0] /api/admin/auth/me error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
