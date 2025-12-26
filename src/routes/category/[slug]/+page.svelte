<script lang="ts">
    import CategorySidebar from "$lib/components/CategorySidebar.svelte";
    let { data } = $props();
    const { category, products: items } = data;
</script>

<svelte:head>
    <title>{category.name} | Купить изделия из кожи</title>
    <meta name="description" content="Все изделия в категории {category.name}" />
</svelte:head>

<div class="max-w-7xl mx-auto px-4 py-12">
    <header class="mb-12 border-b border-stone-200 pb-8">
        <nav class="text-sm text-stone-500 mb-4">
            <a href="/" class="hover:text-stone-800">Главная</a> 
            <span class="mx-2">/</span> 
            <span class="text-stone-800 uppercase font-bold tracking-widest">{category.name}</span>
        </nav>
        <h1 class="text-4xl font-serif text-stone-900">{category.name}</h1>
        {#if items.length === 0}
            <p class="mt-4 text-stone-500 text-lg">В этой категории пока нет товаров.</p>
        {:else}
            <p class="mt-2 text-stone-500">Найдено изделий: {items.length}</p>
        {/if}
    </header>

    {#if items.length > 0}
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {#each items as product}
                <article class="group">
                    <a href="/product/{product.slug}" class="block">
                        <div class="aspect-[4/5] overflow-hidden rounded-lg bg-stone-100 mb-4 shadow-sm group-hover:shadow-md transition">
                            <img 
                                src={product.imageUrl} 
                                alt={product.title} 
                                class="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                            />
                        </div>
                        <h3 class="text-stone-800 font-medium line-clamp-2 group-hover:text-amber-800 transition">
                            {product.title}
                        </h3>
                        <p class="mt-1 text-lg font-bold text-stone-900">
                            {product.price} ₽
                        </p>
                    </a>
                </article>
            {/each}
        </div>
    {/if}
    
    <div class="mt-20 text-center">
        <a href="/" class="mt-10 mx-auto block px-8 py-3 bg-stone-800 text-white rounded-md hover:bg-stone-700">
            Вернуться на главную
        </a>
    </div>
</div>