import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		createSvgIconsPlugin({
			// Specify the icon folder to be cached
			iconDirs: [resolve(process.cwd(), "public/icons")],
			// Specify symbolId format
			symbolId: "icon-[dir]-[name]",
			svgoOptions: {
				plugins: [{
					name: "removeAttrs",
					params: {
						attrs: "fill"
					}
				}]
			}
		})
	],
	// Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
	// prevent vite from obscuring rust errors
	clearScreen: false,
	// tauri expects a fixed port, fail if that port is not available
	server: {
		port: 1420,
		strictPort: true,
	},
	// to make use of `TAURI_DEBUG` and other env variables
	// https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
	envPrefix: ["VITE_", "TAURI_"],
	build: {
		// Tauri supports es2021
		target: process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
		// don't minify for debug builds
		minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
		// produce sourcemaps for debug builds
		sourcemap: !!process.env.TAURI_DEBUG,
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "src")
		}
	}
});
