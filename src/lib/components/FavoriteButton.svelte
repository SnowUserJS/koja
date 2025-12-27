<script lang="ts">
    import { Heart } from 'lucide-svelte';
    import { favorites } from '$lib/favorites.svelte';
    import { scale } from 'svelte/transition';

    let { productId } = $props();
</script>

<button 
    onclick={(e) => { e.preventDefault(); favorites.toggle(productId); }}
    class="p-2 rounded-full transition-all duration-300 bg-white/80 backdrop-blur shadow-sm hover:scale-110"
    aria-label="В избранное"
>
    {#if favorites.has(productId)}
        <div in:scale={{ duration: 300, start: 0.5 }}>
            <Heart size={20} fill="#7f1d1d" class="text-red-900" />
        </div>
    {:else}
        <Heart size={20} class="text-stone-400 hover:text-red-900" />
    {/if}
</button>