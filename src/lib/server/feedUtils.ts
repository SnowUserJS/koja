// src/lib/server/feedUtils.ts
import { db } from '$lib/server/db';
import { products, categories } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import xml2js from 'xml2js';
import slugify from 'slugify';

// Типизация (упрощенная) входящего YML
interface YmlCategory {
    $: { id: string; parentId?: string };
    _: string; // Имя категории
}

interface YmlOffer {
    name?: string[];
    price?: string[];
    description?: string[];
    picture?: string[];
    url?: string[]; // Партнерская ссылка
    categoryId?: string[];
    param?: Array<{ $: { name: string }; _: string }>; // Характеристики
}

export async function processYmlFeed(xmlData: string) {
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(xmlData);

    const shop = result.yml_catalog.shop[0];
    const ymlCategories: YmlCategory[] = shop.categories[0].category;
    const ymlOffers: YmlOffer[] = shop.offers[0].offer;

    // 1. Обработка категорий
    // Создаем Map для быстрого поиска имени категории по ID из YML
    const categoryMap = new Map<string, string>(); // ID -> Slug

    for (const cat of ymlCategories) {
        const name = cat._;
        const ymlId = cat.$.id;
        
        // Генерируем slug (например: "zhenskie-koshelki")
        const slug = slugify(name, { lower: true, strict: true, locale: 'ru' });

        // Сохраняем в БД (upsert - если есть, ничего не делаем или обновляем)
        await db.insert(categories)
            .values({ name, slug })
            .onConflictDoUpdate({ target: categories.slug, set: { name } });

        categoryMap.set(ymlId, slug);
    }

    // 2. Обработка товаров
    for (const offer of ymlOffers) {
        // Берем данные из массивов (xml2js всегда возвращает массивы)
        const title = offer.name?.[0] || 'Без названия';
        const price = offer.price ? parseInt(offer.price[0]) : 0;
        const description = offer.description?.[0] || '';
        const imageUrl = offer.picture?.[0] || '';
        const externalUrl = offer.url?.[0] || '';
        const catId = offer.categoryId?.[0];

        // Генерируем уникальный slug для товара
        let itemSlug = slugify(title, { lower: true, strict: true, locale: 'ru' });
        // Добавим рандом, чтобы избежать дублей, если названия одинаковые
        itemSlug = `${itemSlug}-${Math.floor(Math.random() * 1000)}`;

        const categorySlug = catId ? categoryMap.get(catId) : null;

        // Вставляем товар
        await db.insert(products).values({
            title,
            slug: itemSlug,
            description,
            price,
            imageUrl,
            externalUrl,
            categorySlug, // Связь с категорией
            metaTitle: title,
            metaDescription: description.substring(0, 150), // Обрезаем для мета
        });
    }

    return { success: true, count: ymlOffers.length };
}