import { db } from '$lib/server/db';
import { products, categories } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
    const { slug } = params;

    // 1. Проверяем, существует ли такая категория
    const category = await db.query.categories.findFirst({
        where: eq(categories.slug, slug)
    });

    if (!category) {
        throw error(404, 'Категория не найдена');
    }

    // 2. Получаем товары этой категории
    const categoryProducts = await db.select()
        .from(products)
        .where(eq(products.categorySlug, slug))
        .orderBy(desc(products.id));

    return {
        category,
        products: categoryProducts
    };
};