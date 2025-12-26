// src/routes/admin/upload/+page.server.ts
import { fail } from '@sveltejs/kit';
import { processYmlFeed } from '$lib/server/feedUtils';

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const file = formData.get('xml_file') as File;

        if (!file || file.name === 'undefined') {
            return fail(400, { missing: true });
        }

        try {
            // Читаем файл как текст
            const text = await file.text();
            
            // Запускаем наш парсер
            const result = await processYmlFeed(text);

            return { success: true, processedCount: result.count };
        } catch (error) {
            console.error(error);
            return fail(500, { error: 'Ошибка парсинга файла' });
        }
    }
};