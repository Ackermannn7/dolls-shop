import {
  integer,
  pgTable,
  varchar,
  text,
  doublePrecision,
  timestamp,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const dollsTable = pgTable('dolls', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  dollName: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  viewsCount: integer().default(0),
  image: varchar({ length: 255 }).notNull(),
  price: doublePrecision().notNull(),
  createdAt: timestamp().defaultNow().notNull(), // Автоматично додається при створенні
  updatedAt: timestamp().defaultNow().notNull(), // Автоматично оновлюється
});

export const createDollSchema = createInsertSchema(dollsTable).omit({
  id: true,
  viewsCount: true,
  createdAt: true,
  updatedAt: true,
});

export const updateDollSchema = createInsertSchema(dollsTable)
  .omit({
    id: true,
    viewsCount: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();
