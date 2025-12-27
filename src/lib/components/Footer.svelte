<script lang="ts">
    import { Instagram, Facebook, Twitter, Mail } from 'lucide-svelte';
    import ScrollToTop from '$lib/components/ScrollToTop.svelte';
</script>

<footer class="bg-stone-900 text-stone-400 py-12 border-t-4 border-amber-900 mt-auto">
    <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div>
            <h3 class="text-white text-lg font-serif mb-4">Leather Shop</h3>
            <p class="text-sm leading-relaxed mb-4">
                Мы создаем вещи, которые стареют красиво. Натуральная кожа, ручная работа и внимание к деталям.
            </p>
        </div>

        <div>
            <h3 class="text-white text-lg font-serif mb-4">Покупателям</h3>
            <ul class="space-y-2 text-sm">
                <li><a href="/faq" class="hover:text-amber-500 transition">Доставка и оплата</a></li>
                <li><a href="/faq" class="hover:text-amber-500 transition">Возврат товара</a></li>
                <li><a href="/about" class="hover:text-amber-500 transition">О мастерской</a></li>
                <li><a href="/sitemap.xml" class="hover:text-amber-500 transition">Карта сайта</a></li>
            </ul>
        </div>

        <div>
            <h3 class="text-white text-lg font-serif mb-4">Мы в соцсетях</h3>
            <div class="flex gap-4">
                <a href="#" class="p-2 bg-stone-800 rounded-full hover:bg-amber-800 transition text-white">
                    <Instagram size={20} />
                </a>
                <a href="#" class="p-2 bg-stone-800 rounded-full hover:bg-amber-800 transition text-white">
                    <Facebook size={20} />
                </a>
                <a href="https://x.com/ntSportPit" class="p-2 bg-stone-800 rounded-full hover:bg-amber-800 transition text-white">
                    <Twitter size={20} />
                </a>
            </div>
            <a href="mailto:info@kojashop.ru" class="flex items-center gap-2 mt-6 hover:text-white transition">
                <Mail size={16} /> info@kojashop.ru
            </a>
        </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-stone-800 text-sm text-center">
        &copy; {new Date().getFullYear()} Leather Shop. Все права защищены.
    </div>
    <ScrollToTop />
</footer>