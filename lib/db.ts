import { neon } from '@neondatabase/serverless'

// Create a reusable SQL client for Neon database
export const sql = neon(process.env.DATABASE_URL!)
