<script lang="ts">
    let { data } = $props();
    const { items, query } = data;
</script>

<svelte:head>
    <title>Результаты поиска: {query}</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 py-12">
    <header class="mb-12">
        <h1 class="text-3xl font-serif text-stone-900">
            Результаты поиска по запросу: <span class="text-amber-900">"{query}"</span>
        </h1>
        <p class="mt-2 text-stone-500">
            {#if items.length > 0}
                Найдено товаров: {items.length}
            {:else}
                К сожалению, ничего не найдено.
            {/if}
        </p>
    </header>

    {#if items.length > 0}
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {#each items as product}
                <article class="group">
                    <a href="/product/{product.slug}" class="block">
                        <div class="aspect-[4/5] overflow-hidden rounded-lg bg-stone-100 mb-4 shadow-sm">
                            <img 
                                src={product.imageUrl} 
                                alt={product.title} 
                                class="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                            />
                        </div>
                        <h3 class="text-stone-800 font-medium line-clamp-2">{product.title}</h3>
                        <p class="mt-1 text-lg font-bold text-stone-900">{product.price} ₽</p>
                    </a>
                </article>
            {/each}
        </div>
    {:else}
        <div class="py-20 text-center bg-stone-50 rounded-xl border border-dashed border-stone-300">
            <p class="text-stone-500 mb-6">Попробуйте изменить запрос или поискать в категориях.</p>
            <a href="/" class="px-6 py-2 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition">
                На главную
            </a>
        </div>
    {/if}
</div>