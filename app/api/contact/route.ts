import { neon } from '@neondatabase/serverless'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Store in Neon
    const sql = neon(process.env.DATABASE_URL!)
    await sql`
      INSERT INTO contact_leads (name, email, phone, subject, message)
      VALUES (${name}, ${email}, ${phone ?? null}, ${subject ?? null}, ${message})
    `

    // Send email notification via Resend
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Allura Homes <noreply@allurahomes.com>',
          to: ['mike@allurahomes.com'],
          reply_to: email,
          subject: `New Contact: ${subject ?? 'General Inquiry'} — ${name}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #0d1f3c; padding: 24px; border-radius: 8px 8px 0 0;">
                <h1 style="color: #c9962a; margin: 0; font-size: 20px;">New Contact Form Submission</h1>
              </div>
              <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e5e5;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px 0; color: #666; width: 140px;"><strong>Name</strong></td><td style="padding: 8px 0;">${name}</td></tr>
                  <tr><td style="padding: 8px 0; color: #666;"><strong>Email</strong></td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
                  ${phone ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Phone</strong></td><td style="padding: 8px 0;"><a href="tel:${phone}">${phone}</a></td></tr>` : ''}
                  ${subject ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Subject</strong></td><td style="padding: 8px 0;">${subject}</td></tr>` : ''}
                </table>
                <div style="margin-top: 16px; padding: 16px; background: white; border-radius: 6px; border: 1px solid #e5e5e5;">
                  <strong style="color: #666;">Message</strong>
                  <p style="margin: 8px 0 0; white-space: pre-wrap;">${message}</p>
                </div>
              </div>
            </div>
          `,
        }),
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact route]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
