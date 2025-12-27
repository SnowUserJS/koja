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
                {/each}
        </div>
    {/if}
</div>