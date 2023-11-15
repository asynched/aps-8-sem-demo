import { drizzle } from 'drizzle-orm/mysql2'
import { createPool } from 'mysql2'

const mysql = createPool({
  uri: process.env.DB_URL!,
})

export const db = drizzle(mysql, {
  logger: true,
})
