import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/command/auth-jwt'
import { sql } from '@/lib/db'

export async function GET(request: Request) {
  try {
    // Try to get token from cookie first
    const cookieStore = await cookies()
    let token = cookieStore.get('command_session')?.value
    
    // If no cookie, try Authorization header (for localStorage fallback)
    if (!token) {
      const authHeader = request.headers.get('Authorization')
      if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.slice(7)
      }
    }
    
    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 })
    }
    
    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.json({ user: null }, { status: 401 })
    }
    
    const users = await sql`
      SELECT id, email, name, role 
      FROM command_users 
      WHERE id = ${payload.userId}
    `
    
    if (users.length === 0) {
      return NextResponse.json({ user: null }, { status: 401 })
    }
    
    return NextResponse.json({ user: users[0] })
  } catch (error) {
    console.error('Auth check error:', error)
    return NextResponse.json({ user: null }, { status: 401 })
  }
}
