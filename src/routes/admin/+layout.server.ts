// src/routes/admin/+layout.server.ts
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
    // 1. Проверка авторизации
    if (!locals.user) {
        throw redirect(302, '/login');
    }

    // 2. Проверка роли
    if (locals.user.role !== 'admin') {
        // Можно сделать страницу 403, но пока просто редирект на главную
        throw redirect(302, '/');
    }

    return {
        user: locals.user
    };
};