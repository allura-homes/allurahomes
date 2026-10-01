import 'server-only'
import { Pool } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'
import { integer, pgTable, text } from 'drizzle-orm/pg-core'
import { and, eq, sql } from 'drizzle-orm'
import type { SwitchAnalysisSubmission } from './switch-analysis'

const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 3, connectionTimeoutMillis: 10000 })
const db = drizzle(pool)
const contactLeads = pgTable('contact_leads', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  name: text('name'), email: text('email'), phone: text('phone'),
  subject: text('subject'), message: text('message'), source: text('source'),
})

export async function saveSwitchAnalysis(data: SwitchAnalysisSubmission) {
  const source = 'switch-analysis'
  const subject = `Switch analysis ${data.requestId}`
  const message = JSON.stringify(data)
  return db.transaction(async tx => {
    // Serialize retries of the same public submission without changing the existing lead schema.
    await tx.execute(sql`select pg_advisory_xact_lock(hashtext(${subject}))`)
    const [existing] = await tx.select({ id: contactLeads.id, message: contactLeads.message })
      .from(contactLeads).where(and(eq(contactLeads.source, source), eq(contactLeads.subject, subject))).limit(1)
    if (existing) {
      if (existing.message !== message) throw new Error('Submission conflict')
      return existing.id
    }
    const [lead] = await tx.insert(contactLeads).values({
      name: data.name, email: data.email, phone: data.phone || null, subject, message, source,
    }).returning({ id: contactLeads.id })
    return lead.id
  })
}
