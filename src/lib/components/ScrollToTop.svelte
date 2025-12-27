<script lang="ts">
    import { ArrowUp } from 'lucide-svelte';
    import { fade, scale } from 'svelte/transition';
    import { onMount } from 'svelte';

    let isVisible = $state(false);

    // Функция плавной прокрутки
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Следим за прокруткой
    onMount(() => {
        const handleScroll = () => {
            isVisible = window.scrollY > 400;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });
</script>

{#if isVisible}
    <button
        onclick={scrollToTop}
        transition:scale={{ duration: 200, start: 0.8 }}
        class="fixed bottom-8 right-8 z-50 p-4 bg-amber-900 text-white rounded-full shadow-2xl hover:bg-stone-800 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
        aria-label="Вернуться наверх"
    >
        <ArrowUp size={24} />
    </button>
{/if}

<style>
    /* Добавляем небольшую тень для глубины */
    button {
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
    }
</style>