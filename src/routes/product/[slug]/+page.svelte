<script lang="ts">
    import { ShoppingBag } from 'lucide-svelte';
    import { onMount } from 'svelte';
    import FavoriteButton from '$lib/components/FavoriteButton.svelte';
    let scrollProgress = $state(0);

    onMount(() => {
        const updateProgress = () => {
            const h = document.documentElement;
            const scroll = h.scrollTop || document.body.scrollTop;
            const height = h.scrollHeight - h.clientHeight;
            scrollProgress = (scroll / height) * 100;
        };
        window.addEventListener('scroll', updateProgress);
        return () => window.removeEventListener('scroll', updateProgress);
    });
    
    // В Svelte 5 используем деструктуризацию пропсов вот так,
    // чтобы переменные product и related обновлялись автоматически при смене data
    let { data } = $props();
    
    // Используем $derived или просто обращаемся через data, 
    // чтобы при смене URL данные обновлялись мгновенно
    let product = $derived(data.product);
    let related = $derived(data.related);


    // Формируем объект микроразметки
    const jsonLd = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.title,
        "image": [product.imageUrl],
        "description": product.description,
        "sku": product.id.toString(),
        "brand": {
            "@type": "Brand",
            "name": "Leather Shop"
        },
        "offers": {
            "@type": "Offer",
            "url": `https://kojashop.ru/product/${product.slug}`,
            "priceCurrency": "RUB",
            "price": product.price,
            "availability": "https://schema.org/InStock",
            "itemCondition": "https://schema.org/NewCondition"
        }
    };
</script>

<svelte:head>
    <title>{product.title} | Мастерская Кожи</title>
    {@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
    <meta name="description" content={product.metaDescription} />
    <meta property="og:type" content="product" />
    <meta property="og:url" content="https://kojashop.ru/product/${product.slug}" />
    <meta property="og:title" content={product.title} />
    <meta property="og:description" content={product.description?.substring(0, 160)} />
    <meta property="og:image" content={product.imageUrl} />

    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:title" content={product.title} />
    <meta property="twitter:image" content={product.imageUrl} />
</svelte:head>

<div class="max-w-6xl mx-auto px-4 py-10">
    <nav class="flex text-sm text-stone-500 mb-6 bg-stone-50 p-3 rounded-lg">
        <a href="/" class="hover:text-stone-800">Главная</a>
        <span class="mx-2 text-stone-300">/</span>
        <a href="/category/{product.categorySlug}" class="hover:text-stone-800 capitalize">
            {product.categorySlug?.replace(/-/g, ' ')}
        </a>
        <span class="mx-2 text-stone-300">/</span>
        <span class="text-stone-800 truncate font-medium">{product.title}</span>
    </nav>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div class="bg-stone-50 rounded-xl overflow-hidden shadow-sm border border-stone-100">
            <img 
                src={product.imageUrl} 
                alt={product.title} 
                class="w-full h-auto object-cover" 
            />
        </div>

        <div class="space-y-6">
            <h1 class="text-4xl font-serif text-stone-900">{product.title}</h1>
            <p class="text-2xl font-bold text-amber-900">{product.price} ₽</p>
            
            <div class="prose prose-stone border-t pt-6">
                <p class="whitespace-pre-line text-stone-700 leading-relaxed">
                    {product.description}
                </p>
            </div>
            
            <a href={product.externalUrl} target="_blank" rel="nofollow"
               class="inline-flex items-center justify-center gap-3 bg-stone-800 text-white w-full md:w-auto px-10 py-4 rounded-lg hover:bg-stone-700 transition shadow-lg shadow-stone-200">
                <ShoppingBag size={20} /> Купить сейчас
            </a>
            &nbsp; <FavoriteButton productId={product.id} />
        </div>
    </div>

    {#if related.length > 0}
        <div class="mt-20">
            <h3 class="text-2xl font-serif mb-8 border-b pb-4 text-stone-800">Похожие изделия</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                {#each related as item}
                    <a href="/product/{item.slug}" class="group block">
                        <div class="aspect-square overflow-hidden bg-stone-100 rounded-lg mb-3 border border-stone-200">
                            <img src={item.imageUrl} alt={item.title} class="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                        </div>
                        <h4 class="font-medium text-stone-800 line-clamp-1 group-hover:text-amber-800 transition">{item.title}</h4>
                        <p class="text-amber-800 font-bold">{item.price} ₽</p> 
                    </a>
                {/each}
            </div>
        </div>
    {/if}
</div>