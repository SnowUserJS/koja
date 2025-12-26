// src/routes/login/+page.server.ts
import { fail, redirect } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { Scrypt } from 'oslo/password';

export const load = async ({ locals }) => {
	if (locals.user) throw redirect(302, '/admin/upload');
	return {};
};

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		if (typeof username !== 'string' || typeof password !== 'string') {
			return fail(400, { message: 'Неверные данные' });
		}

		// Поиск пользователя
		const existingUser = await db.query.users.findFirst({
			where: eq(users.username, username)
		});

		if (!existingUser) {
			return fail(400, { message: 'Неверный логин или пароль' });
		}

		// Проверка пароля
		const scrypt = new Scrypt();
		const validPassword = await scrypt.verify(existingUser.passwordHash, password);

		if (!validPassword) {
			return fail(400, { message: 'Неверный логин или пароль' });
		}

		// Создание сессии
		const session = await lucia.createSession(existingUser.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		throw redirect(302, '/admin/upload');
	}
};