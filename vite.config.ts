import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import compression from 'vite-plugin-compression'

export default defineConfig({
  base: '/makieta-specteam/',
  plugins: [
    react(),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: undefined,
      },
    },
    outDir: 'dist/client',
    emptyOutDir: true,
    sourcemap: true,
  },
  ssr: {
    // format: 'esm',
    target: 'node',
    noExternal: ['lucide-react', 'framer-motion', 'react-router-dom', /\.css$/],
  },
  server: {
    host: true,
    port: 5173,
  },
  define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@ui': resolve(__dirname, './src/components/ui'),
    },
  },
})
