'use client'

import { useEffect, useRef } from 'react'
import Header from '../components/Header/Header'
import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
import Brands from '../components/Brands/Brands'
import Timeline from '../components/Timeline/Timeline'
import Services from '../components/Services/Services'
import Contact from '../components/Contact/Contact'
import Footer from '../components/Footer/Footer'
import { scrollController } from '../utils/scrollController'

const HomePage = () => {
  const isInitialized = useRef(false)

  useEffect(() => {
    // Предотвращаем повторную инициализацию
    if (isInitialized.current) return
    isInitialized.current = true

    // Восстанавливаем положение страницы на верх при загрузке
    window.scrollTo(0, 0)

    // Небольшая задержка для загрузки DOM
    const initTimeout = setTimeout(() => {
      // Инициализируем ScrollController только для первых секций (до Timeline включительно)
      // После Timeline - обычный плавный скролл
      const sections = ['home', 'about', 'brands', 'timeline']
      scrollController.init(sections)

      // Колбэк для отслеживания смены секций
      scrollController.onSectionChangeCallback((index, section) => {
        console.log(`Переход к секции: ${section.id}, индекс: ${index}`)
      })

      // Колбэк для прогресса горизонтального скролла
      scrollController.onHorizontalProgressCallback((progress, max) => {
        console.log(`Горизонтальный скролл: ${progress}/${max}`)
      })
    }, 300)

    // Обработка навигации по хэшу в URL
    const handleHashChange = () => {
      if (window.location.hash) {
        const sectionId = window.location.hash.substring(1)
        const element = document.getElementById(sectionId)
        if (element) {
          const controlledSections = ['home', 'about', 'brands', 'timeline']
          const index = controlledSections.indexOf(sectionId)
          if (index >= 0) {
            // Используем ScrollController для контролируемых секций
            scrollController.scrollToSection(index, true)
          } else {
            // Для остальных секций - обычный smooth scroll с центрированием
            element.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }
      }
    }

    // Обработка изначального хэша при загрузке
    if (window.location.hash) {
      setTimeout(() => {
        handleHashChange()
      }, 500)
    }

    window.addEventListener('hashchange', handleHashChange)

    // Cleanup
    return () => {
      clearTimeout(initTimeout)
      window.removeEventListener('hashchange', handleHashChange)
      scrollController.destroy()
      isInitialized.current = false
    }
  }, [])

  return (
    <div className="homepage">
      <Header />
      <Hero />
      <About />
      <Brands />
      <Timeline />
      <Services />
      <Contact />
      <Footer />
    </div>
  )
}

export default HomePage 