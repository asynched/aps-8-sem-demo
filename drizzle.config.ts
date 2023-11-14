import type { Config } from 'drizzle-kit'

export default {
  schema: 'db/schemas',
  out: 'drizzle',
  driver: 'better-sqlite',

  dbCredentials: {
    url: 'dev.sqlite3',
  },
} satisfies Config
