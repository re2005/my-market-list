import path from 'path';
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import type { ManifestOptions } from 'vite-plugin-pwa';
import manifest from './manifest.json';

const pwaManifest: Partial<ManifestOptions> = manifest as Partial<ManifestOptions>;

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			manifest: pwaManifest,
			registerType: 'autoUpdate',
			devOptions: {
				enabled: true
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
				clientsClaim: true,
				skipWaiting: true
			},
			kit: {
				includeVersionFile: true
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
