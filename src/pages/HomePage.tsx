import { useEffect } from 'react'
import Header from '../components/Header/Header'
import Hero from '../components/Hero/Hero'
import Stats from '../components/Stats/Stats'
import About from '../components/About/About'
import Brands from '../components/Brands/Brands'
import Timeline from '../components/Timeline/Timeline'
import Services from '../components/Services/Services'
import RussiaMap from '../components/RussiaMap/RussiaMap'
import Contact from '../components/Contact/Contact'
import Footer from '../components/Footer/Footer'
import './HomePage.css'

const HomePage = () => {
  // Включаем плавную прокрутку при загрузке страницы
  useEffect(() => {
    // Восстанавливаем положение страницы на верх при загрузке
    window.scrollTo(0, 0)
    
    // Обработка навигации по хэшу в URL
    const handleHashChange = () => {
      if (window.location.hash) {
        const element = document.querySelector(window.location.hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
    
    // Обработка изначального хэша при загрузке
    if (window.location.hash) {
      setTimeout(() => {
        handleHashChange()
      }, 100)
    }
    
    window.addEventListener('hashchange', handleHashChange)
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  return (
    <div className="homepage">
      <Header />
      <Hero />
      <Stats />
      <About />
      <Brands />
      <Timeline />
      <RussiaMap />
      <Services />
      <Contact />
      <Footer />
    </div>
  )
}

export default HomePage 