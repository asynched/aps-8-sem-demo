import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'

const sqlite = new Database('dev.sqlite3')

export const db = drizzle(sqlite, {
  logger: true,
})
