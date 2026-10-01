import { NextResponse } from 'next/server'
import { switchAnalysisEmail, switchAnalysisSchema } from '@/lib/switch-analysis'
import { saveSwitchAnalysis } from '@/lib/switch-analysis-storage'

export async function POST(req: Request) {
  if (req.headers.get('sec-fetch-site') === 'cross-site') {
    return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 })
  }
  let raw: unknown
  try {
    const body = await req.text()
    if (body.length > 10000) return NextResponse.json({ error: 'Request too large.' }, { status: 413 })
    raw = JSON.parse(body)
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }
  const result = switchAnalysisSchema.safeParse(raw)
  if (!result.success) {
    return NextResponse.json({ error: 'Please check your details and try again.', fields: result.error.flatten().fieldErrors }, { status: 400 })
  }
  if (!process.env.DATABASE_URL || !process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: 'Submission is temporarily unavailable. Please book a call instead.' }, { status: 503 })
  }
  try {
    const leadId = await saveSwitchAnalysis(result.data)
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `switch-analysis/${leadId}`,
      },
      body: JSON.stringify({
        from: 'Allura Homes <noreply@allurahomes.com>',
        to: ['mike@allurahomes.com'], reply_to: result.data.email,
        subject: `New Switch Analysis Request — ${result.data.name}`,
        text: switchAnalysisEmail(result.data),
      }),
      signal: AbortSignal.timeout(15000),
    })
    if (!response.ok) {
      return NextResponse.json({ error: 'Your details were saved, but the email notification failed. Please retry or book a call.' }, { status: 502 })
    }
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'We could not complete your request. Please retry or book a call.' }, { status: 500 })
  }
}
