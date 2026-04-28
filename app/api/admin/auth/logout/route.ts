import { NextResponse } from 'next/server'
import { clearSessionCookie } from '@/lib/command/auth'

export async function POST() {
  await clearSessionCookie()
  return NextResponse.json({ success: true })
}
