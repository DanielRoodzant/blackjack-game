import { defineConfig, configDefaults } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';

export default defineConfig({
	plugins: [sveltekit(), svelteTesting()],

	resolve: process.env.VITEST
		? {
				conditions: ['browser']
			}
		: undefined,

	test: {
		environment: 'jsdom',
		setupFiles: ['src/lib/test/vitest-setup.ts'],
		coverage: {
			include: ['**/src'],
			exclude: [...configDefaults.exclude, '**/types', '**/routes'],
			reporter: ['text', 'text-summary', 'cobertura']
		}
	}
});
