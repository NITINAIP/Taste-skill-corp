import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import tsconfigPaths from "vite-tsconfig-paths"

/**
 * GitHub Pages serves a project site from /<repo>/, so the base path is injected
 * by the deploy workflow as VITE_BASE_PATH. Locally it stays "/".
 */
export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? "/",
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  build: {
    outDir: "dist",
    sourcemap: false,
    // Route-level lazy imports already split the bundle along the lines that
    // matter here, so there is no manual chunk map to keep in sync.
    chunkSizeWarningLimit: 700,
  },
  server: { port: 5173 },
})
