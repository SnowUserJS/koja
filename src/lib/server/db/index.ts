import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import { env } from '$env/dynamic/private';
import * as schema from './schema';

if (!env.DATABASE_URL) {
    throw new Error('🔴 DATABASE_URL is not set in .env');
}

const pool = new pg.Pool({
    connectionString: env.DATABASE_URL
});

// Экспортируем подключение с привязанной схемой
export const db = drizzle(pool, { schema });