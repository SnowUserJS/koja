<script lang="ts">
    import { enhance } from '$app/forms';
    let { form } = $props(); // Svelte 5 runes
    let loading = $state(false);
</script>

<div class="flex justify-between items-center mb-6">
    <h1 class="text-2xl font-bold">Админ панель</h1>
    <form action="/logout" method="POST">
        <button class="text-sm text-red-600 hover:underline">Выйти</button>
    </form>
</div>

<div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-stone-200">
    <h1 class="text-2xl font-bold mb-4 text-stone-800">Загрузка товаров (YML/XML)</h1>

    <form 
        method="POST" 
        enctype="multipart/form-data" 
        use:enhance={() => {
            loading = true;
            return async ({ update }) => {
                loading = false;
                await update();
            };
        }}
        class="space-y-4"
    >
        <div>
            <label class="block mb-2 text-sm font-medium text-stone-700">Файл импорта</label>
            <input 
                name="xml_file" 
                type="file" 
                accept=".xml,.yml"
                class="block w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                required
            />
        </div>

        <button 
            type="submit" 
            disabled={loading}
            class="w-full px-4 py-2 bg-stone-800 text-white rounded-md hover:bg-stone-900 disabled:opacity-50"
        >
            {loading ? 'Обработка...' : 'Загрузить в базу'}
        </button>
    </form>

    {#if form?.success}
        <div class="mt-4 p-3 bg-green-100 text-green-800 rounded">
            ✅ Успешно загружено товаров: {form.processedCount}
        </div>
    {/if}

    {#if form?.error}
        <div class="mt-4 p-3 bg-red-100 text-red-800 rounded">
            ❌ Ошибка: {form.error}
        </div>
    {/if}
</div>