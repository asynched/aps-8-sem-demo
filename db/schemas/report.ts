import { sql } from 'drizzle-orm'
import {
  mysqlTable,
  float,
  varchar,
  serial,
  index,
  datetime,
} from 'drizzle-orm/mysql-core'

export const reports = mysqlTable(
  'reports',
  {
    reportId: serial('report_id').primaryKey().notNull(),
    latitude: float('latitude').notNull(),
    longitude: float('longitude').notNull(),
    ip: varchar('ip', { length: 255 }).notNull(),
    severity: varchar('severity', {
      length: 6,
      enum: ['low', 'medium', 'high'],
    }).notNull(),
    city: varchar('city', { length: 255 }).notNull(),
    country: varchar('country', { length: 255 }).notNull(),
    state: varchar('state', { length: 255 }).notNull(),
    suburb: varchar('suburb', { length: 255 }).notNull(),
    createdAt: datetime('created_at', {
      mode: 'date',
    })
      .default(sql`now()`)
      .notNull(),
  },
  (table) => ({
    reportsCityIndex: index('reports_city_index').on(table.city),
    reportsCountryIndex: index('reports_country_index').on(table.country),
    reportsStateIndex: index('reports_state_index').on(table.state),
  }),
)
