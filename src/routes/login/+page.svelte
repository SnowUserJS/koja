<script lang="ts">
    import { enhance } from '$app/forms';
    let { form } = $props();
</script>

<div class="flex items-center justify-center min-h-screen bg-stone-100">
    <div class="p-8 bg-white shadow-lg rounded-lg w-96">
        <h1 class="text-2xl font-bold mb-6 text-center text-stone-800">Вход в Админку</h1>
        
        <form method="POST" use:enhance class="space-y-4">
            <div>
                <label for="username" class="block text-sm font-medium text-stone-700">Логин
                    <input name="username" type="text" required class="mt-1 block w-full border border-stone-300 rounded-md p-2" />
                </label>
            </div>
            <div>
                <label for="password" class="block text-sm font-medium text-stone-700">Пароль
                    <input name="password" type="password" required class="mt-1 block w-full border border-stone-300 rounded-md p-2" />
                </label>
            </div>
            
            {#if form?.message}
                <p class="text-red-600 text-sm text-center">{form.message}</p>
            {/if}

            <button type="submit" class="w-full bg-stone-800 text-white py-2 rounded-md hover:bg-stone-700">
                Войти
            </button>
        </form>
    </div>
</div>