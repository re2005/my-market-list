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
			minify: false,
			workbox: {
				mode: 'development',
				modifyURLPrefix: {},
				globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,webmanifest}'],
				globIgnores: ['prerendered/**/*']
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
