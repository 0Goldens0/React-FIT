import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config: any = {
    plugins: [react()],
    css: {
      postcss: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: [
              '>0.2%',
              'not dead',
              'not op_mini all',
              'iOS >= 10',
              'Safari >= 10',
              'Chrome >= 60',
              'Firefox >= 60',
              'Edge >= 79',
              'Samsung >= 8'
            ],
            grid: 'autoplace',
            flexbox: 'no-2009'
          })
        ]
      }
    },
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