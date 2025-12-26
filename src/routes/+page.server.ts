import { db } from '$lib/server/db';
import { products, categories } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';

export const load = async () => {
    // 1. Получаем все категории для навигации
    const allCategories = await db.select().from(categories);

    // 2. Получаем первые 21 товар (сортируем по новизне)
    const initialProducts = await db.select()
        .from(products)
        .orderBy(desc(products.id)) // или products.createdAt, если добавил
        .limit(21);

    return {
        categories: allCategories,
        initialProducts
    };
};