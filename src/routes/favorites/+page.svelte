<script lang="ts">
    import { favorites } from '$lib/favorites.svelte';
    import { onMount } from 'svelte';
    
    let favoriteProducts = $state([]);
    let isLoading = $state(true);

    onMount(async () => {
        if (favorites.ids.length > 0) {
            // Запрашиваем данные о товарах по списку ID
            const res = await fetch(`/api/products/batch?ids=${favorites.ids.join(',')}`);
            favoriteProducts = await res.json();
        }
        isLoading = false;
    });
</script>

<div class="max-w-7xl mx-auto px-4 py-12">
    <h1 class="text-3xl font-serif mb-8">Моё избранное</h1>

    {#if isLoading}
        <p>Загрузка мастерской...</p>
    {:else if favoriteProducts.length === 0}
        <div class="text-center py-20 bg-stone-50 rounded-xl">
            <p class="text-stone-500 mb-4">Вы еще ничего не добавили в избранное</p>
            <a href="/" class="text-amber-900 font-bold underline">Перейти в каталог</a>
        </div>
    {:else}
        <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {#each favoriteProducts as product}
            <article class="group relative bg-white border border-stone-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                <a href="/product/{product.slug}">
                    <div class="aspect-square overflow-hidden bg-stone-100">
                        <img 
                            src={product.imageUrl} 
                            alt={product.title} 
                            class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                    </div>
                    <div class="p-4">
                        <h3 class="text-sm text-stone-700 line-clamp-2 min-h-[40px] mb-2">{product.title}</h3>
                        <p class="text-lg font-bold text-stone-900">{product.price} ₽</p>
                    </div>
                </a>
                <div class="absolute top-2 right-2">
                    <button 
                        onclick={() => {
                            favorites.toggle(product.id);
                            // Сразу убираем из списка на экране без перезагрузки
                            favoriteProducts = favoriteProducts.filter(p => p.id !== product.id);
                        }}
                        class="bg-white/90 p-2 rounded-full text-red-800 shadow-sm"
                    >
                        Удалить
                    </button>
                </div>
            </article>
        {/each}
        </div>
    {/if}
</div>