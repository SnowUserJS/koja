import { json, error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { products } from '$lib/server/db/schema';
import { inArray } from 'drizzle-orm';

export const GET = async ({ url }) => {
    const idsString = url.searchParams.get('ids');
    
    if (!idsString) {
        return json([]);
    }

    // Превращаем строку "1,2,3" в массив чисел [1, 2, 3]
    const ids = idsString.split(',').map(id => parseInt(id)).filter(id => !isNaN(id));

    if (ids.length === 0) {
        return json([]);
    }

    try {
        // Получаем все товары, чьи ID есть в списке избранного
        const items = await db
            .select()
            .from(products)
            .where(inArray(products.id, ids));

        return json(items);
    } catch (e) {
        console.error('Ошибка загрузки избранного:', e);
        throw error(500, 'Ошибка сервера при получении товаров');
    }
};