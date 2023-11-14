import {
  sqliteTable,
  integer,
  real,
  text,
  index,
} from 'drizzle-orm/sqlite-core'

export const reports = sqliteTable(
  'reports',
  {
    reportId: integer('report_id')
      .primaryKey({ autoIncrement: true })
      .notNull(),
    latitude: real('latitude').notNull(),
    longitude: real('longitude').notNull(),
    ip: text('ip').notNull(),
    severity: text('severity', {
      enum: ['low', 'medium', 'high'],
    }).notNull(),
    city: text('city').notNull(),
    country: text('country').notNull(),
    state: text('state').notNull(),
    suburb: text('suburb').notNull(),
    createdAt: integer('created_at', {
      mode: 'timestamp',
    })
      .notNull()
      .$default(() => new Date()),
  },
  (table) => ({
    reportsCityIndex: index('reports_city_index').on(table.city),
    reportsCountryIndex: index('reports_country_index').on(table.country),
    reportsStateIndex: index('reports_state_index').on(table.state),
  }),
)
