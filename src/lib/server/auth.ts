// src/lib/server/auth.ts
import { Lucia } from 'lucia';
import { dev } from '$app/environment';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { db } from '$lib/server/db';
import { sessions, users } from '$lib/server/db/schema';

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev // Использовать Secure только на продакшене (HTTPS)
		}
	},
	getUserAttributes: (attributes) => {
		return {
			// Открываем доступ к этим полям через объект user
			username: attributes.username,
			role: attributes.role
		};
	}
});

// Важно для TypeScript, чтобы он знал структуру пользователя
declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	username: string;
	role: string;
}