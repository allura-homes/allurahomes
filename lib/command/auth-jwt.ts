import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { compare, hash } from 'bcryptjs'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'allura-command-secret-key-change-in-production'
)

export interface TokenPayload {
  userId: number
  email: string
  role: string
  iat?: number
  exp?: number
}

// Create JWT token
export async function createJWT(payload: Omit<TokenPayload, 'iat' | 'exp'>): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET)
}

// Verify JWT token
export async function verifyJWT(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as unknown as TokenPayload
  } catch {
    return null
  }
}

// Get token from cookies
export async function getTokenFromCookies(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get('command_session')?.value || null
}

// Set token in cookies
export async function setTokenCookie(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set('command_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })
}

// Clear token from cookies
export async function clearTokenCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete('command_session')
}

// Hash password
export async function hashUserPassword(password: string): Promise<string> {
  return hash(password, 12)
}

// Verify password
export async function verifyUserPassword(password: string, hashedPassword: string): Promise<boolean> {
  return compare(password, hashedPassword)
}

// Get current session payload
export async function getCurrentSession(): Promise<TokenPayload | null> {
  const token = await getTokenFromCookies()
  if (!token) return null
  return verifyJWT(token)
}
