import { sql } from '@/lib/db'
import { hash } from 'bcryptjs'
import { NextResponse } from 'next/server'

// Temporary endpoint to reset admin password - DELETE AFTER USE
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  
  // Simple protection - must know the secret
  if (secret !== 'allura-reset-2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    // Hash the new password
    const newPassword = 'demo1000'
    const passwordHash = await hash(newPassword, 12)
    
    // Update the password
    const result = await sql`
      UPDATE command_users 
      SET password_hash = ${passwordHash}
      WHERE email = 'mike@allurahomes.com'
      RETURNING id, email
    `
    
    if (result.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Password reset successfully',
      user: result[0].email
    })
  } catch (error) {
    console.error('Password reset error:', error)
    return NextResponse.json({ error: 'Failed to reset password' }, { status: 500 })
  }
}
