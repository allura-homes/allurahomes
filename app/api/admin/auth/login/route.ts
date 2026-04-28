import { NextResponse } from 'next/server'
import { verifyCredentials, createToken } from '@/lib/command/auth'

export async function POST(request: Request) {
  try {
    console.log('[v0] Login attempt starting...')
    const { email, password } = await request.json()
    console.log('[v0] Login for email:', email)

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    console.log('[v0] Verifying credentials...')
    const user = await verifyCredentials(email, password)
    console.log('[v0] User result:', user ? 'found' : 'not found')

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    console.log('[v0] Creating token...')
    const token = await createToken(user)
    console.log('[v0] Token created')

    // Create response with user data and token
    const response = NextResponse.json({
      token, // Include token for localStorage fallback
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })

    // Set cookie on the response object
    response.cookies.set('command_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    )
  }
}
