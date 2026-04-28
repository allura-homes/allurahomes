import { NextResponse } from 'next/server'

// Auth is handled by AuthGuard component in dashboard layout
// This proxy is a placeholder for future non-auth proxy needs

export function proxy() {
  return NextResponse.next()
}

export const config = {
  // Don't run proxy on any routes for now
  matcher: [],
}
