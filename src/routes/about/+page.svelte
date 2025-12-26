<script lang="ts">
    import img_about from '$lib/assets/img.png';
    import instrumenti_mastera from '$lib/assets/instrumenti_mastera.png';
    import { ShieldCheck, Truck, Leaf, Sparkles } from 'lucide-svelte';
</script>

<svelte:head>
    <title>О мастерской | Натуральная кожа ручной работы</title>
    <meta name="description" content="История нашей мастерской, философия бренда и процесс создания кожаных изделий." />
</svelte:head>

<div class="bg-white">
    <section class="relative h-[60vh] flex items-center justify-center overflow-hidden bg-stone-900">
        <div class="absolute inset-0 opacity-50">
            <img 
                src={img_about} 
                alt="Процесс обработки кожи" 
                class="w-full h-full object-cover"
            />
        </div>
        <div class="relative z-10 text-center px-4">
            <h1 class="text-5xl md:text-7xl font-serif text-white mb-4">Наследие и Качество</h1>
            <p class="text-amber-200 text-xl md:text-2xl font-light tracking-widest uppercase">Мастерская кожаных изделий</p>
        </div>
    </section>

    <section class="max-w-5xl mx-auto px-4 py-20">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
                <h2 class="text-3xl font-serif text-stone-900 mb-6">Наша история</h2>
                <div class="space-y-4 text-stone-600 leading-relaxed">
                    <p>
                        Все началось с одного куска кожи и желания создать идеальный кошелек, который прослужит десятилетия. Мы верим, что в эпоху массового производства настоящие вещи должны иметь душу.
                    </p>
                    <p>
                        Сегодня наша мастерская — это объединение мастеров, влюбленных в свое дело. Мы не просто шьем аксессуары, мы выбираем лучшие шкуры, используем традиционные методы седельного шва и уделяем внимание каждому миллиметру края.
                    </p>
                    <p>
                        Каждое изделие уникально: натуральная кожа имеет свой неповторимый рисунок, который со временем становится только благороднее, приобретая уникальную патину.
                    </p>
                </div>
            </div>
            <div class="relative">
                <img 
                    src={instrumenti_mastera} 
                    alt="Инструменты мастера" 
                    class="rounded-lg shadow-2xl"
                />
                <div class="absolute -bottom-6 -left-6 bg-amber-900 text-white p-8 hidden md:block rounded-lg">
                    <p class="text-4xl font-serif italic">10+</p>
                    <p class="text-sm uppercase tracking-widest">Лет опыта</p>
                </div>
            </div>
        </div>
    </section>

    <section class="bg-stone-50 py-20">
        <div class="max-w-7xl mx-auto px-4">
            <h2 class="text-center text-3xl font-serif text-stone-900 mb-16">Почему выбирают нас</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div class="text-center p-6">
                    <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-amber-900">
                        <ShieldCheck size={32} />
                    </div>
                    <h3 class="font-bold text-stone-800 mb-2">Гарантия качества</h3>
                    <p class="text-sm text-stone-500">Пожизненная гарантия на целостность швов во всех наших изделиях.</p>
                </div>

                <div class="text-center p-6">
                    <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-amber-900">
                        <Leaf size={32} />
                    </div>
                    <h3 class="font-bold text-stone-800 mb-2">Натуральность</h3>
                    <p class="text-sm text-stone-500">Используем только кожу растительного дубления и натуральные воски.</p>
                </div>

                <div class="text-center p-6">
                    <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-amber-900">
                        <Sparkles size={32} />
                    </div>
                    <h3 class="font-bold text-stone-800 mb-2">Уникальность</h3>
                    <p class="text-sm text-stone-500">Нет двух одинаковых изделий — кожа сохраняет свою природную фактуру.</p>
                </div>

                <div class="text-center p-6">
                    <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-amber-900">
                        <Truck size={32} />
                    </div>
                    <h3 class="font-bold text-stone-800 mb-2">Быстрая доставка</h3>
                    <p class="text-sm text-stone-500">Бережная упаковка и отправка в день заказа по всей стране.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="py-20 text-center">
        <h2 class="text-3xl font-serif mb-8 text-stone-900">Готовы выбрать свое идеальное изделие?</h2>
        <a href="/" class="inline-block bg-stone-800 text-white px-12 py-4 rounded-full hover:bg-amber-900 transition-colors shadow-lg">
            Перейти в каталог
        </a>
    </section>
</div>