import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig((_config) => ({
  base: process.env.NODE_ENV === "production" ? "/makieta-specteam/" : "/",
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
      output: {
        manualChunks: undefined,
      },
    },
    outDir: "dist/client",
    emptyOutDir: true,
    sourcemap: true,
  },
  ssr: {
    format: "esm",
    target: "node",
    noExternal: ["lucide-react", "framer-motion", "react-router-dom"],
  },
}));
