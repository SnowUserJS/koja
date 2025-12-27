<script lang="ts">
    import { Home, HelpCircle, Info } from 'lucide-svelte';
    import { Search } from 'lucide-svelte';
    import { favorites } from '$lib/favorites.svelte';
    import { Heart } from 'lucide-svelte';


    function toggleMenu() {
    }
</script>
<div class="bg-stone-900 text-stone-100 py-12 px-4">
    <div class="max-w-7xl mx-auto text-center">
        <a href="/">
            <h1 class="text-4xl font-serif mb-2">Мастерская кожи</h1>
        </a>
        <p class="text-stone-400">Изделия с душой и характером</p>
    </div>
</div>

<div class="header-menu sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-stone-200 py-4 mb-8 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 flex justify-between items-center">
        
        <nav class="space-x-1 flex flex-nowrap">
            <a href="/" onclick={toggleMenu} class="flex items-center gap-3 p-2 rounded hover:bg-stone-100 text-stone-800 font-medium">
                <Home size={18} /> Главная
            </a>
            <a href="/faq" onclick={toggleMenu} class="flex items-center gap-3 p-2 rounded hover:bg-stone-100 text-stone-800 font-medium">
                <HelpCircle size={18} /> FAQ
            </a>
            <a href="/about" onclick={toggleMenu} class="flex items-center gap-3 p-2 rounded hover:bg-stone-100 text-stone-800 font-medium">
                <Info size={18} /> О нас
            </a>
            <a href="/favorites" onclick={toggleMenu} class="flex items-center justify-between p-2 rounded hover:bg-stone-100">
                <div class="flex items-center gap-3 text-stone-800 font-medium">
                    <Heart size={18} /> Избранное &nbsp;
                </div>
                {#if favorites.ids.length > 0}
                <span class="bg-amber-900 text-white text-[10px] px-2 py-0.5 rounded-full">
                    {favorites.ids.length}
                </span>
                {/if}
            </a>
        </nav>
        <form action="/search" class="relative hidden sm:block">
            <input 
            name="q" 
            type="text" 
            placeholder="Поиск..." 
            class="pl-10 pr-4 py-2 border border-stone-300 rounded-full text-sm focus:outline-none focus:border-stone-800 focus:ring-1 focus:ring-stone-800 w-64"
            />
            <Search size={18} class="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
        </form>
    </div>
</div>
