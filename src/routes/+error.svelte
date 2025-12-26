<script lang="ts">
    import { page } from '$app/stores';
    import { Hammer, ArrowLeft, Scissors } from 'lucide-svelte';
</script>

<svelte:head>
    <title>Страница не найдена | Ошибка в мастерской</title>
</svelte:head>

<div class="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-stone-50">
    <div class="max-w-2xl w-full text-center">
        
        <div class="flex justify-center gap-6 mb-8 text-stone-300">
            <div class="animate-bounce">
                <Hammer size={48} />
            </div>
            <div class="animate-pulse">
                <Scissors size={48} />
            </div>
        </div>

        <h1 class="text-9xl font-serif font-black text-stone-200 absolute left-1/2 -translate-x-1/2 -translate-y-24 z-0 select-none">
            404
        </h1>

        <div class="relative z-10">
            <h2 class="text-4xl font-serif text-stone-900 mb-6">Заблудились в мастерской?</h2>
            
            <div class="space-y-4 text-lg text-stone-600 mb-10 max-w-md mx-auto">
                <p>
                    Похоже, эта выкройка оказалась бракованной. Страница, которую вы ищете, была перенесена или никогда не существовала в нашем каталоге.
                </p>
                <p class="text-sm italic border-l-2 border-amber-700 pl-4 py-2 bg-white/50">
                    "Даже опытный мастер иногда сбивается с шага, но главное — вовремя вернуться к верному шву."
                </p>
            </div>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                    onclick={() => history.back()} 
                    class="flex items-center gap-2 px-8 py-3 border-2 border-stone-800 text-stone-800 font-bold rounded-lg hover:bg-stone-800 hover:text-white transition-all w-full sm:w-auto"
                >
                    <ArrowLeft size={20} /> Вернуться назад
                </button>
                
                <a 
                    href="/" 
                    class="flex items-center gap-2 px-8 py-3 bg-amber-900 text-white font-bold rounded-lg hover:bg-amber-800 transition-all w-full sm:w-auto shadow-lg shadow-amber-900/20"
                >
                    В начало каталога
                </a>
            </div>
        </div>

        <div class="mt-16 p-8 bg-white rounded-2xl shadow-sm border border-stone-100">
            <p class="text-sm font-bold text-stone-400 uppercase tracking-widest mb-4">Попробуйте найти изделие</p>
            <form action="/search" class="relative max-w-sm mx-auto">
                <input 
                    name="q" 
                    type="text" 
                    placeholder="Например: ремень или сумка" 
                    class="w-full pl-4 pr-12 py-3 bg-stone-100 border-none rounded-full text-sm focus:ring-2 focus:ring-amber-900 transition"
                />
                <button type="submit" class="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-stone-800 text-white rounded-full hover:bg-stone-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </button>
            </form>
        </div>
    </div>
</div>