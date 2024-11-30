import {
  integer,
  pgTable,
  varchar,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const usersTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  role: varchar({ length: 255 }).notNull().default('user'),

  name: varchar({ length: 255 }).notNull(),
  address: text(),
  avatarUrl: varchar({ length: 255 }),
  createdAt: timestamp().defaultNow().notNull(), // Автоматично додається при створенні
  updatedAt: timestamp().defaultNow().notNull(), // Автоматично оновлюється
});

export const createUserSchema = createInsertSchema(usersTable).omit({
  id: true,
  role: true,
});

export const loginSchema = createInsertSchema(usersTable).pick({
  email: true,
  password: true,
});
