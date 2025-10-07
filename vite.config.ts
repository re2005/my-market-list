import path from 'path';
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import manifest from './manifest.json';

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			manifest,
			registerType: 'autoUpdate',
			minify: false,
			workbox: {
				mode: 'development'
			},
			devOptions: {
				enabled: false
			}
		})
	],
	resolve: {
		alias: {
			'@components': path.resolve('./src/components'),
			$lib: path.resolve('./src/lib')
		}
	}
});
