import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto только пробует угадать среду, 
		// а этот адаптер гарантирует работу функций Netlify
		adapter: adapter()
	}
};

export default config;
