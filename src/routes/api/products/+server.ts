import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { products } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';

export const GET = async ({ url }) => {
    const offset = Number(url.searchParams.get('offset')) || 0;
    const limit = 21;
    
    // Если нужно будет фильтровать по категории при подгрузке
    // const categorySlug = url.searchParams.get('category'); 

    const nextProducts = await db.select()
        .from(products)
        .orderBy(desc(products.id))
        .limit(limit)
        .offset(offset);

    return json(nextProducts);
};