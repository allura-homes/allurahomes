import { neon } from '@neondatabase/serverless'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, propertyAddress, city, bedrooms, currentlyListed, currentPlatform } = body

    if (!name || !email || !propertyAddress) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Store in Neon
    const sql = neon(process.env.DATABASE_URL!)
    await sql`
      INSERT INTO income_report_leads (
        name, email, phone, property_address, city,
        bedrooms, currently_renting, heard_from
      )
      VALUES (
        ${name}, ${email}, ${phone ?? null}, ${propertyAddress}, ${city ?? null},
        ${bedrooms ?? null}, ${currentlyListed ?? null}, ${currentPlatform ?? null}
      )
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
          subject: `New Income Report Request — ${name} | ${propertyAddress}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #0d1f3c; padding: 24px; border-radius: 8px 8px 0 0;">
                <h1 style="color: #c9962a; margin: 0; font-size: 20px;">New Income Report Request</h1>
              </div>
              <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e5e5;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px 0; color: #666; width: 160px;"><strong>Name</strong></td><td style="padding: 8px 0;">${name}</td></tr>
                  <tr><td style="padding: 8px 0; color: #666;"><strong>Email</strong></td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
                  ${phone ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Phone</strong></td><td style="padding: 8px 0;"><a href="tel:${phone}">${phone}</a></td></tr>` : ''}
                  <tr><td style="padding: 8px 0; color: #666;"><strong>Property</strong></td><td style="padding: 8px 0;">${propertyAddress}</td></tr>
                  ${city ? `<tr><td style="padding: 8px 0; color: #666;"><strong>City</strong></td><td style="padding: 8px 0;">${city}</td></tr>` : ''}
                  ${bedrooms ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Bedrooms</strong></td><td style="padding: 8px 0;">${bedrooms}</td></tr>` : ''}
                  ${currentlyListed ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Currently Listed</strong></td><td style="padding: 8px 0;">${currentlyListed}</td></tr>` : ''}
                  ${currentPlatform ? `<tr><td style="padding: 8px 0; color: #666;"><strong>Platform</strong></td><td style="padding: 8px 0;">${currentPlatform}</td></tr>` : ''}
                </table>
              </div>
            </div>
          `,
        }),
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[income-report route]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
