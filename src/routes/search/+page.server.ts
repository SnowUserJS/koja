import { db } from '$lib/server/db';
import { products } from '$lib/server/db/schema';
import { ilike, or } from 'drizzle-orm';

export const load = async ({ url }) => {
    const query = url.searchParams.get('q') || '';

    if (query.length < 3) {
        return { items: [], query };
    }

    const items = await db.select()
        .from(products)
        .where(
            or(
                ilike(products.title, `%${query}%`),
                ilike(products.description, `%${query}%`)
            )
        )
        .limit(50);

    return { items, query };
};