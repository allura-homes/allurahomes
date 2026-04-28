import { neon } from '@neondatabase/serverless'
import { hash } from 'bcryptjs'

async function resetPassword() {
  const sql = neon(process.env.DATABASE_URL!)
  
  const email = 'mike@allurahomes.com'
  const newPassword = 'demo1000'
  
  // Hash the password with bcryptjs v3
  const passwordHash = await hash(newPassword, 12)
  
  console.log('Generated hash:', passwordHash)
  
  // Update the password in the database
  await sql`
    UPDATE command_users 
    SET password_hash = ${passwordHash}
    WHERE email = ${email}
  `
  
  console.log(`Password reset for ${email}`)
}

resetPassword().catch(console.error)
