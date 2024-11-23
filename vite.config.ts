import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'@components': path.resolve('./src/components'),
			$lib: path.resolve('./src/lib')
		}
	}
});
