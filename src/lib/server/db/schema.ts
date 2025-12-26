// src/lib/server/db/schema.ts
import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {
    id: serial('id').primaryKey(),
    name: text('name').notNull().unique(),
    slug: text('slug').notNull().unique(),
});

export const products = pgTable('products', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(), // ЧПУ
    description: text('description'),
    price: integer('price'),
    imageUrl: text('image_url'),
    externalUrl: text('external_url'), // Партнерская ссылка
    categorySlug: text('category_slug').references(() => categories.slug),
    metaTitle: text('meta_title'),
    metaDescription: text('meta_description'),
    createdAt: timestamp('created_at').defaultNow()
});

// Таблицы для Lucia Auth (стандарт для v3)
export const users = pgTable('users', {
    id: text('id').primaryKey(),
    username: text('username').notNull().unique(),
    role: text("role").notNull().default('user'),
    passwordHash: text('password_hash').notNull()
});

export const sessions = pgTable('sessions', {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull().references(() => users.id),
    expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});