import { defineConfig } from "vite"
import path from "path"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@Layout": path.resolve(__dirname, "./src/Layouts"),
			"@Pages": path.resolve(__dirname, "./src/Pages"),
			"@Sections": path.resolve(__dirname, "./src/Sections"),
			"@UI": path.resolve(__dirname, "./src/UI"),
			"@Assets": path.resolve(__dirname, "./src/assets")
		},
	},
	plugins: [react()],
})
