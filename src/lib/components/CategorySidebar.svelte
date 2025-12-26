<script lang="ts">
import { X, Menu, ChevronRight, Search } from 'lucide-svelte';
import { fade, fly } from 'svelte/transition';

    // Получаем список категорий как пропс
    let { categories } = $props();

    // Состояние открытия меню
    let isOpen = $state(false);

    function toggleMenu() {
        isOpen = !isOpen;
    }
</script>

<button 
    onclick={toggleMenu}
    class="button-cat top-20 flex items-center h-20 w-72 gap-2 px-6 py-3 bg-stone-800 text-white font-medium rounded hover:bg-stone-700 transition shadow-md"
>
    <Menu size={20} />
    <span>Категории</span>
</button>

{#if isOpen}
    <div 
        transition:fade={{ duration: 200 }}
        onclick={toggleMenu}
        class="fixed inset-0 bg-black/50 z-40 cursor-pointer backdrop-blur-sm"
        aria-hidden="true"
    ></div>
{/if}

{#if isOpen}
    <aside 
        transition:fly={{ x: -300, duration: 300 }}
        class="fixed top-0 left-0 h-full w-80 bg-white z-50 shadow-2xl flex flex-col border-r border-stone-200"
    >
        <div class="p-4 border-b border-stone-100 flex justify-between items-center bg-stone-50">
            <h2 class="text-xl font-serif font-bold text-stone-800">Навигация</h2>
            <button onclick={toggleMenu} class="p-2 hover:bg-stone-200 rounded-full transition text-stone-600">
                <X size={24} />
            </button>
        </div>

        <div class="p-4 border-b border-stone-100">
            <form action="/search" class="relative">
                <input 
                    name="q" 
                    type="text" 
                    placeholder="Поиск товаров..." 
                    class="w-full pl-10 pr-4 py-2 bg-stone-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-stone-400 focus:bg-white transition"
                />
                <Search size={18} class="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            </form>
        </div>

        <div class="flex-1 overflow-y-auto p-4 space-y-6">
            
            <hr class="border-stone-100" />

            <div>
                <h3 class="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3 px-2">Категории</h3>
                <nav class="space-y-1">
                    {#each categories as cat}
                        <a 
                            href="/category/{cat.slug}"
                            onclick={toggleMenu}
                            class="flex items-center justify-between p-2 rounded hover:bg-stone-100 text-stone-600 hover:text-amber-900 transition group"
                        >
                            <span>{cat.name}</span>
                            <ChevronRight size={16} class="text-stone-300 group-hover:translate-x-1 transition" />
                        </a>
                    {/each}
                </nav>
            </div>
        </div>
    </aside>
{/if}


