import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path, { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		outDir: "build",
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'src/pages/search.html'),
				admin: resolve(__dirname, 'src/pages/settings.html')
			}
		},
		target: 'esnext',
		publicDir: 'public'
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, './src'),
		},
	},
	base: "./",
	plugins: [svelte()]
})
