<script lang="ts">
    import CategorySidebar from '$lib/components/CategorySidebar.svelte';
    let { data } = $props();
    let items = $derived(data.initialProducts);
    let offset = $derived(21);
    let isLoading = $derived(false);
    let hasMore = $derived(data.initialProducts.length === 21);

    async function loadMore() {
        if (isLoading) return;
        isLoading = true;

        try {
            const res = await fetch(`/api/products?offset=${offset}`);
            const newItems = await res.json();

            if (newItems.length < 21) {
                hasMore = false; // Товары кончились
            }

            // Добавляем новые товары к существующим
            items = [...items, ...newItems];
            offset += 21;
        } catch (e) {
            console.error('Ошибка загрузки:', e);
        } finally {
            isLoading = false;
        }
    }

    const websiteJsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://kojashop.ru/",
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://kojashop.ru/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        }
    };
</script>

<svelte:head>
    <title>Leather Shop | Изделия из натуральной кожи</title>
    {@html `<script type="application/ld+json">${JSON.stringify(websiteJsonLd)}</script>`}
    <meta name="description" content="Кожаные изделия премиум-качества — сумки, портмоне и аксессуары из натуральной кожи. Идеальный выбор для повседневной жизни." />
</svelte:head>



<div class="main-box mx-auto px-4 flex justify-between">

    <CategorySidebar categories={data.categories} />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        {#each items as product}
            <a href="/product/{product.slug}" class="border p-4 hover:shadow-lg transition">
                <img src={product.imageUrl} alt={product.title} class="group-hover:scale-105 transition object-contain h-60 w-96" />
                <h2 class="mt-2 font-bold">{product.title}</h2>
                <p class="text-amber-800 font-semibold">{product.price} ₽</p>
            </a>
        {/each}
    </div>
</div>

{#if hasMore}
    <button 
        onclick={loadMore}
        class="mt-10 mx-auto my-20 block px-8 py-3 bg-stone-800 text-white rounded-md hover:bg-stone-700"
    >
        Показать еще
    </button>
{/if}