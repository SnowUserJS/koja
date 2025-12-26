import { db } from '$lib/server/db';
import { products, categories } from '$lib/server/db/schema';

export async function GET({ url }) {
    // 1. Запрашиваем все товары и категории
    // Для больших магазинов здесь лучше использовать stream или пагинацию, но для старта пойдет
    const allProducts = await db.select({ slug: products.slug, updated: products.createdAt }).from(products);
    const allCategories = await db.select({ slug: categories.slug }).from(categories);

    const siteUrl = url.origin;

    // 2. Генерируем XML строку
    const sitemap = `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
    >
        <url>
            <loc>${siteUrl}</loc>
            <priority>1.0</priority>
            <changefreq>daily</changefreq>
        </url>
        
        <url>
            <loc>${siteUrl}/about</loc>
            <priority>0.5</priority>
        </url>
        <url>
            <loc>${siteUrl}/faq</loc>
            <priority>0.5</priority>
        </url>

        ${allCategories.map(cat => `
        <url>
            <loc>${siteUrl}/category/${cat.slug}</loc>
            <priority>0.7</priority>
            <changefreq>weekly</changefreq>
        </url>
        `).join('')}

        ${allProducts.map(prod => `
        <url>
            <loc>${siteUrl}/product/${prod.slug}</loc>
            <lastmod>${prod.updated ? new Date(prod.updated).toISOString() : new Date().toISOString()}</lastmod>
            <priority>0.8</priority>
            <changefreq>weekly</changefreq>
        </url>
        `).join('')}
    </urlset>`;

    // 3. Отдаем с правильным заголовком
    return new Response(sitemap.trim(), {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'max-age=0, s-maxage=3600' // Кэшируем на час
        }
    });
}