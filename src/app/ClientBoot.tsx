'use client'

import { useEffect } from 'react'

import { performanceOptimizer } from '../utils/performanceOptimizer'
import '../utils/lazyLoad'
import { initViewportHeight } from '../utils/viewportHeight'

export function ClientBoot() {
  useEffect(() => {
    performanceOptimizer.applyOptimizations()
    initViewportHeight()
  }, [])

  useEffect(() => {
    const runOnLoad = () => {
      // Измеряем FPS после загрузки
      setTimeout(() => {
        performanceOptimizer.measureFPS((fps) => {
          console.log(`📊 Average FPS: ${fps}`)
          if (fps < 30) {
            console.warn('⚠️ Low FPS detected, performance optimizations applied')
          }
        })
      }, 1000)

      // Скрываем экран загрузки ТОЛЬКО после полной загрузки страницы
      setTimeout(() => {
        performanceOptimizer.hideLoadingScreen()
      }, 1000)
    }

    if (document.readyState === 'complete') {
      runOnLoad()
      return
    }

    window.addEventListener('load', runOnLoad)
    return () => window.removeEventListener('load', runOnLoad)
  }, [])

  return null
}




