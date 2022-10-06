import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		outDir: "build",
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'src/routes/search.html'),
				admin: resolve(__dirname, 'src/routes/settings.html')
			}
		},
		target: 'esnext',
		publicDir: 'public'
	},
	base: "./",
	plugins: [svelte()]
})
