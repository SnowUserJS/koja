// src/routes/logout/+page.server.ts
import { redirect } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth';

export const actions = {
    default: async ({ locals, cookies }) => {
        if (!locals.session) {
            throw redirect(302, '/login');
        }
        
        // Удаляем сессию из базы
        await lucia.invalidateSession(locals.session.id);
        
        // Чистим куку
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies.set(sessionCookie.name, sessionCookie.value, {
            path: '.',
            ...sessionCookie.attributes
        });

        throw redirect(302, '/login');
    }
};