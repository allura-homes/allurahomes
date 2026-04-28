import 'server-only'
import { cookies } from 'next/headers'
import { compare, hash } from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'
import { sql } from '@/lib/db'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'allura-command-secret-key-change-in-production'
)

export interface User {
  id: number
  email: string
  name: string
  role: 'admin' | 'manager' | 'staff'
}

export interface JWTPayload {
  userId: number
  email: string
  role: string
  iat: number
  exp: number
}

// Hash a password
export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12)
}

// Verify password against hash
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return compare(password, hashedPassword)
}

// Create a JWT token
export async function createToken(user: User): Promise<string> {
  return new SignJWT({ 
    userId: user.id, 
    email: user.email, 
    role: user.role 
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET)
}

// Verify a JWT token
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as unknown as JWTPayload
  } catch {
    return null
  }
}

// Set the session cookie
export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set('command_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })
}

// Clear the session cookie
export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete('command_session')
}

// Get current user from session
export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('command_session')?.value
    
    console.log('[v0] getCurrentUser - token exists:', !!token)
    
    if (!token) return null
    
    const payload = await verifyToken(token)
    console.log('[v0] getCurrentUser - payload:', payload)
    
    if (!payload) return null
    
    const users = await sql`
      SELECT id, email, name, role 
      FROM command_users 
      WHERE id = ${payload.userId}
    `
    
    console.log('[v0] getCurrentUser - users found:', users.length)
    
    if (users.length === 0) return null
    
    return users[0] as User
  } catch (error) {
    console.error('[v0] getCurrentUser error:', error)
    return null
  }
}

// Verify credentials and return user
export async function verifyCredentials(email: string, password: string): Promise<User | null> {
  try {
    const users = await sql`
      SELECT id, email, name, role, password_hash 
      FROM command_users 
      WHERE email = ${email}
    `
    
    if (users.length === 0) return null
    
    const user = users[0]
    const isValid = await verifyPassword(password, user.password_hash)
    
    if (!isValid) return null
    
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    }
  } catch {
    return null
  }
}

// Require authentication - throws if not authenticated
export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Unauthorized')
  }
  return user
}

// Check if user has specific role
export function hasRole(user: User, roles: string[]): boolean {
  return roles.includes(user.role)
}
