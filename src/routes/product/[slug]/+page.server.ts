import { db } from '$lib/server/db';
import { products } from '$lib/server/db/schema';
import { eq, ne, and } from 'drizzle-orm';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
    // 1. Получаем основной товар
    const product = await db.query.products.findFirst({
        where: eq(products.slug, params.slug)
    });

    if (!product) throw error(404, 'Товар не найден');

    // 2. Получаем похожие товары (из той же категории, исключая текущий)
    const related = await db.query.products.findMany({
        where: and(
            eq(products.categorySlug, product.categorySlug || ''),
            ne(products.id, product.id)
        ),
        limit: 4
    });

    return { product, related };
};