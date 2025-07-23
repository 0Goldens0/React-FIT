import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config: any = {
    plugins: [react()],
    server: {
      port: 3000,
      host: true
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
      // Оптимизации для GitHub Pages
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            animations: ['framer-motion'],
            icons: ['lucide-react']
          }
        }
      }
    }
  }

  // Настройка base URL для GitHub Pages
  if (command !== 'serve') {
    config.base = '/React-FIT/'
  }

  return config
}) 