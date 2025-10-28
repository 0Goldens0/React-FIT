import { useState, useEffect, useCallback } from 'react'
import { Menu, X } from 'lucide-react'
import { getAssetPath } from '../../utils/paths'
import { scrollController } from '../../utils/scrollController'
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  // Отслеживание скролла для изменения стилей хедера
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Функция для определения активной секции с улучшенной логикой
  const updateActiveSection = useCallback(() => {
    const sections = ['home', 'stats', 'about', 'brands', 'timeline', 'map', 'services', 'contact']
    const scrollPosition = window.scrollY
    const windowHeight = window.innerHeight
    
    // Находим секцию которая больше всего видна на экране
    let currentSection = 'home'
    let maxVisibility = 0
    
    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId)
      if (!element) return
      
      const rect = element.getBoundingClientRect()
      const headerHeight = 80
      
      // Корректируем позицию с учетом хедера
      const top = rect.top + scrollPosition - headerHeight
      const bottom = rect.bottom + scrollPosition - headerHeight
      
      // Определяем видимость секции
      let visibility = 0
      if (top <= scrollPosition + headerHeight && bottom >= scrollPosition + headerHeight) {
        const visibleTop = Math.max(scrollPosition + headerHeight, top)
        const visibleBottom = Math.min(scrollPosition + windowHeight, bottom)
        visibility = (visibleBottom - visibleTop) / windowHeight
      }
      
      if (visibility > maxVisibility) {
        maxVisibility = visibility
        currentSection = sectionId
      }
    })
    
    setActiveSection(currentSection)
  }, [])

  // Отслеживание активной секции с debounce
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    
    const handleScroll = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(updateActiveSection, 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateActiveSection() // Вызываем сразу для установки начального состояния
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timeoutId)
    }
  }, [updateActiveSection])

  // Улучшенная плавная прокрутка к секции с использованием scrollController
  const handleNavClick = useCallback((href: string) => {
    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)
    
    if (!targetElement) {
      console.warn(`Element with id "${targetId}" not found`)
      return
    }
    
    // Закрываем мобильное меню сразу
    setIsMenuOpen(false)
    
    // Контролируемые секции (управляются через scrollController)
    const controlledSections = ['home', 'about', 'brands', 'timeline']
    const sectionIndex = controlledSections.indexOf(targetId)
    
    if (sectionIndex >= 0) {
      // Используем scrollController для контролируемых секций
      scrollController.scrollToSection(sectionIndex, true)
    } else {
      // Для остальных секций используем стандартный scrollIntoView с центрированием
      // И отключаем scrollController
      scrollController.leaveControlledArea()
      
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      })
    }
    
    // После завершания анимации обновляем активную секцию
    setTimeout(updateActiveSection, 1000)
  }, [updateActiveSection])

  const menuItems = [
    { href: '#home', label: 'Главная', id: 'home' },
    { href: '#about', label: 'О компании', id: 'about' },
    { href: '#brands', label: 'Бренды', id: 'brands' },
    { href: '#timeline', label: 'История', id: 'timeline' },
    { href: '#map', label: 'География', id: 'map' },
    { href: '#services', label: 'Услуги', id: 'services' },
    { href: '#contact', label: 'Контакты', id: 'contact' }
  ]

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          {/* Логотип */}
          <div className="logo">
            <img src={getAssetPath("logo/fit-logo-clean.svg")} alt="FIT" className="logo-img" />
          </div>

          {/* Навигация для десктопа */}
          <nav className="nav-desktop">
            {menuItems.map((item) => (
              <a 
                key={item.href}
                href={item.href} 
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleNavClick(item.href)
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Кнопка каталога для десктопа */}
          <a 
            href="https://fit24.ru/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="catalog-button"
          >
            Каталог
          </a>

          {/* Кнопка мобильного меню */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Открыть меню"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Мобильная навигация */}
        {isMenuOpen && (
          <nav className="nav-mobile">
            {menuItems.map((item) => (
              <a 
                key={item.href}
                href={item.href} 
                className={`nav-link-mobile ${activeSection === item.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleNavClick(item.href)
                }}
              >
                {item.label}
              </a>
            ))}
            
            {/* Кнопка каталога в мобильном меню */}
            <a 
              href="https://fit24.ru/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="catalog-button-mobile"
              onClick={() => setIsMenuOpen(false)}
            >
              Каталог
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header 