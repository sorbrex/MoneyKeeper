import { defineConfig } from "vite"
import path from "path"
import react from "@vitejs/plugin-react"
import mkcert from "vite-plugin-mkcert"


// https://vitejs.dev/config/
export default defineConfig({
	server: {
		https: true
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@Layout": path.resolve(__dirname, "./src/Layouts"),
			"@Pages": path.resolve(__dirname, "./src/Pages"),
			"@UI": path.resolve(__dirname, "./src/UI"),
			"@Assets": path.resolve(__dirname, "./src/Assets")
		},
	},
	plugins: [react(), mkcert()],
})
