import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { performanceOptimizer } from './utils/performanceOptimizer'
import './utils/lazyLoad' // Автоматически инициализируется

// Инициализируем оптимизацию производительности
performanceOptimizer.applyOptimizations()

// Измеряем FPS после загрузки
window.addEventListener('load', () => {
  setTimeout(() => {
    performanceOptimizer.measureFPS((fps) => {
      console.log(`📊 Average FPS: ${fps}`)
      if (fps < 30) {
        console.warn('⚠️ Low FPS detected, performance optimizations applied')
      }
    })
  }, 1000)
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
) 

// Скрываем экран загрузки ТОЛЬКО после полной загрузки страницы
window.addEventListener('load', () => {
  // Ждем еще немного, чтобы все компоненты точно отрендерились
  setTimeout(() => {
    performanceOptimizer.hideLoadingScreen()
  }, 1000)
}) 