'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, Phone } from 'lucide-react'
import { getAssetPath } from '../../utils/paths'
import { scrollController } from '../../utils/scrollController'
import { fetchCmsBrandsList } from '../../utils/cms'

type BrandNavItem = {
  id: string
  name: string
  color: string
  subtitle?: string | null
}

const Header = () => {
  const headerRef = useRef<HTMLElement | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [cmsBrands, setCmsBrands] = useState<BrandNavItem[] | null>(null)
  
  const pathname = usePathname()

  useEffect(() => {
    const applyHeaderHeight = () => {
      const height = headerRef.current?.offsetHeight ?? 80
      document.documentElement.style.setProperty('--header-height', `${height}px`)
    }

    applyHeaderHeight()
    window.addEventListener('resize', applyHeaderHeight)
    return () => window.removeEventListener('resize', applyHeaderHeight)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  useEffect(() => {
    const handleClickOutside = () => setOpenDropdown(null)
    if (openDropdown) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [openDropdown])

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true
    if (path !== '/' && pathname.startsWith(path)) return true
    return false
  }

  const fallbackBrands: BrandNavItem[] = [
    { id: 'fit', name: 'FIT', subtitle: 'Основной бренд', color: '#FDB913' },
    { id: 'cutop', name: 'CUTOP', subtitle: 'Режущий инструмент', color: '#2A4998' },
    { id: 'mos', name: 'MOS', subtitle: 'Строительные материалы', color: '#00AEEF' },
    { id: 'mastercolor', name: 'Master Color', subtitle: 'ЛКМ', color: '#0065A8' },
    { id: 'kypc', name: 'КУРС', subtitle: 'Инструмент', color: '#D81515' },
    { id: 'xbat', name: 'ХВАТ', subtitle: 'Крепеж и метизы', color: '#1A1A1A' },
  ]

  useEffect(() => {
    let cancelled = false
    // Pull brand list from CMS (published by default, draft when preview=1&status=draft is present in URL).
    fetchCmsBrandsList()
      .then((list) => {
        if (cancelled) return

        // If CMS items are missing navSubtitle (e.g. Strapi not restarted/migrated yet),
        // fall back to the old hardcoded short labels so the menu stays consistent.
        const fallbackById = new Map(fallbackBrands.map((b) => [b.id, b]))

        const mapped = list
          .map((b) => {
            const brandObj = b && typeof b === 'object' ? (b as Record<string, unknown>) : {}
            const id = String(brandObj.brandId || '').trim()
            if (!id) return null
            const name = String(brandObj.displayName || id).trim()
            const cmsSubtitle = String(brandObj.navSubtitle || '').trim()
            const fallbackSubtitle = fallbackById.get(id)?.subtitle || null
            const subtitle = cmsSubtitle || fallbackSubtitle

            const cmsColor = String(brandObj.primaryColor || '').trim()
            const fallbackColor = fallbackById.get(id)?.color || '#FFFFFF'
            const color = cmsColor || fallbackColor

            return { id, name, subtitle, color }
          })
          .filter(Boolean) as BrandNavItem[]
        setCmsBrands(mapped.length > 0 ? mapped : [])
      })
      .catch(() => {
        if (cancelled) return
        setCmsBrands([])
      })
    return () => {
      cancelled = true
    }
  }, [])

  const brands = useMemo<BrandNavItem[]>(() => {
    // null = not loaded yet → keep fallback to avoid menu flicker
    if (cmsBrands === null) return fallbackBrands
    // [] = loaded but empty/failed → fallback
    if (cmsBrands.length === 0) return fallbackBrands
    return cmsBrands
  }, [cmsBrands])

  return (
    <header ref={headerRef} className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          {/* Логотип */}
          <Link href="/" className="logo">
            <img src={getAssetPath("logo/fit-logo-clean.svg")} alt="FIT" className="logo-img" />
          </Link>

          {/* Навигация для десктопа */}
          <nav className="nav-desktop">
            <Link 
              href="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={(e) => {
                if (pathname === '/') {
                  e.preventDefault()
                  const homeSection = document.getElementById('home')
                  if (homeSection) {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                }
              }}
            >
              Главная
            </Link>

            <Link
              href="/#about"
              className="nav-link"
              onClick={(e) => {
                if (pathname === '/') {
                  e.preventDefault()
                  // Используем scrollController для согласованности с обычным скроллом
                  const aboutIndex = scrollController.getCurrentSectionIndex()
                  const sections = ['home', 'about', 'brands', 'timeline']
                  const targetIndex = sections.indexOf('about')
                  if (targetIndex >= 0) {
                    scrollController.scrollToSection(targetIndex, true)
                  }
                }
              }}
            >
              О компании
            </Link>

            {/* Бренды с мега-меню */}
            <div
              className="nav-item-dropdown"
              onMouseEnter={() => setOpenDropdown('brands')}
              onMouseLeave={() => setOpenDropdown(null)}
              onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === 'brands' ? null : 'brands') }}
            >
              <Link
                href="/#brands"
                className={`nav-link has-dropdown ${isActive('/brands') ? 'active' : ''}`}
                onClick={(e) => {
                  if (pathname === '/') {
                    e.preventDefault()
                    // Используем scrollController для согласованности с обычным скроллом
                    const sections = ['home', 'about', 'brands', 'timeline']
                    const targetIndex = sections.indexOf('brands')
                    if (targetIndex >= 0) {
                      scrollController.scrollToSection(targetIndex, true)
                    }
                  }
                }}
              >
                Бренды
                <ChevronDown size={14} className="dropdown-icon" />
              </Link>
              {openDropdown === 'brands' && (
                <div className="mega-menu mega-menu-brands">
                  <div className="brands-grid">
                    {brands.map((brand) => (
                      <Link 
                        key={brand.id} 
                        href={`/brands/${brand.id}`} 
                        className="brand-card-colored"
                        aria-label={brand.name}
                        style={{
                          borderColor: brand.color,
                          '--brand-color': brand.color
                        } as React.CSSProperties}
                      >
                        <div className="brand-name">{brand.name}</div>
                        {brand.subtitle ? <div className="brand-desc">{brand.subtitle}</div> : null}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Услуги с dropdown */}
            <div
              className="nav-item-dropdown"
              onMouseEnter={() => setOpenDropdown('services')}
              onMouseLeave={() => setOpenDropdown(null)}
              onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === 'services' ? null : 'services') }}
            >
              <Link 
                href="/#services"
                className={`nav-link has-dropdown ${isActive('/services') ? 'active' : ''}`}
                onClick={(e) => {
                  if (pathname === '/') {
                    e.preventDefault()
                    const servicesSection = document.getElementById('services')
                    if (servicesSection) {
                      scrollController.leaveControlledArea()
                      servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                  }
                }}
              >
                Услуги
                <ChevronDown size={14} className="dropdown-icon" />
              </Link>
              {openDropdown === 'services' && (
                <div className="dropdown-menu">
                  <Link href="/services/logistics" className="dropdown-item">
                    Логистика
                  </Link>
                  <Link href="/services/honest-sign" className="dropdown-item">
                    Честный знак
                  </Link>
                </div>
              )}
            </div>

            <Link href="/geography" className={`nav-link ${isActive('/geography') ? 'active' : ''}`}>
              География
            </Link>

            {/* Информация с mega-menu */}
            <div
              className="nav-item-dropdown"
              onMouseEnter={() => setOpenDropdown('info')}
              onMouseLeave={() => setOpenDropdown(null)}
              onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === 'info' ? null : 'info') }}
            >
              <span className={`nav-link has-dropdown ${isActive('/info') || isActive('/news') || isActive('/articles') || isActive('/faq') || isActive('/privacy') || isActive('/terms') || isActive('/certificates') || isActive('/marketing-activity') ? 'active' : ''}`}>
                Информация
                <ChevronDown size={14} className="dropdown-icon" />
              </span>
              {openDropdown === 'info' && (
                <div className="mega-menu mega-menu-info">
                  <div className="info-menu-grid">
                    <div className="info-menu-column">
                      <h3 className="info-menu-title">Новости и статьи</h3>
                      <Link href="/news" className="info-menu-item">Новости компании</Link>
                      <Link href="/articles" className="info-menu-item">Товарные статьи</Link>
                      <Link href="/marketing-activity/" prefetch={false} className="info-menu-item">Маркетинговая активность</Link>
                    </div>
                    <div className="info-menu-column">
                      <h3 className="info-menu-title">Поддержка</h3>
                      <Link href="/faq" className="info-menu-item">Частые вопросы</Link>
                    </div>
                    <div className="info-menu-column">
                      <h3 className="info-menu-title">Документы</h3>
                      <Link href="/privacy" className="info-menu-item">Политика конфиденциальности</Link>
                      <Link href="/terms" className="info-menu-item">Условия использования</Link>
                      <Link href="/certificates" className="info-menu-item">Сертификаты</Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/contacts" className={`nav-link ${isActive('/contacts') ? 'active' : ''}`}>
              Контакты
            </Link>
          </nav>

          {/* Правая часть */}
          <div className="header-right">
            <a href="tel:88005553535" className="phone-link">
              <Phone size={18} />
              <span>8 (800) 555-35-35</span>
            </a>

            {/* Dropdown каталога */}
            <div 
              className="catalog-dropdown"
              onMouseEnter={() => setOpenDropdown('catalog')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="catalog-button">
                Каталог
                <ChevronDown size={14} className="dropdown-icon" />
              </button>
              {openDropdown === 'catalog' && (
                <div className="catalog-menu">
                  <a 
                    href="https://fit-emarket.ru" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="catalog-menu-item"
                  >
                    <strong>Для физических лиц</strong>
                    <span className="catalog-menu-label">fit-emarket</span>
                  </a>
                  <a 
                    href="https://fit24.ru" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="catalog-menu-item"
                  >
                    <strong>Для юридических лиц</strong>
                    <span className="catalog-menu-label">fit24</span>
                  </a>
                </div>
              )}
            </div>
          </div>

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
            <Link 
              href="/" 
              className={`nav-link-mobile ${isActive('/') ? 'active' : ''}`}
              onClick={(e) => {
                if (pathname === '/') {
                  e.preventDefault()
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }
                setIsMenuOpen(false)
              }}
            >
              Главная
            </Link>

            <Link
              href="/#about"
              className="nav-link-mobile"
              onClick={(e) => {
                if (pathname === '/') {
                  e.preventDefault()
                  // Используем scrollController для согласованности с обычным скроллом
                  const sections = ['home', 'about', 'brands', 'timeline']
                  const targetIndex = sections.indexOf('about')
                  if (targetIndex >= 0) {
                    scrollController.scrollToSection(targetIndex, true)
                  }
                }
                setIsMenuOpen(false)
              }}
            >
              О компании
            </Link>
            
            <div className="mobile-submenu-section">
              <Link
                href="/#brands"
                className="mobile-submenu-title clickable"
                onClick={(e) => {
                  if (pathname === '/') {
                    e.preventDefault()
                    // Используем scrollController для согласованности с обычным скроллом
                    const sections = ['home', 'about', 'brands', 'timeline']
                    const targetIndex = sections.indexOf('brands')
                    if (targetIndex >= 0) {
                      scrollController.scrollToSection(targetIndex, true)
                    }
                  }
                  setIsMenuOpen(false)
                }}
              >
                Бренды
              </Link>
              {brands.map((brand) => (
                <Link 
                  key={brand.id}
                  href={`/brands/${brand.id}`} 
                  className={`nav-link-mobile submenu-item ${isActive(`/brands/${brand.id}`) ? 'active' : ''}`}
                  aria-label={brand.name}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {brand.name}
                </Link>
              ))}
            </div>
            
            <div className="mobile-submenu-section">
              <Link 
                href="/#services" 
                className="mobile-submenu-title clickable"
                onClick={(e) => {
                  if (pathname === '/') {
                    e.preventDefault()
                    const servicesSection = document.getElementById('services')
                    if (servicesSection) {
                      scrollController.leaveControlledArea()
                      servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                  }
                  setIsMenuOpen(false)
                }}
              >
                Услуги
              </Link>
              <Link 
                href="/services/logistics" 
                className={`nav-link-mobile submenu-item ${isActive('/services/logistics') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Логистика
              </Link>
              <Link 
                href="/services/honest-sign" 
                className={`nav-link-mobile submenu-item ${isActive('/services/honest-sign') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Честный знак
              </Link>
              {/* packaging service removed */}
            </div>
            
            <Link href="/geography" className={`nav-link-mobile ${isActive('/geography') ? 'active' : ''}`}>
              География
            </Link>
            
            <div className="mobile-submenu-section">
              <div className="mobile-submenu-title">Информация</div>
              <Link 
                href="/news" 
                className={`nav-link-mobile submenu-item ${isActive('/news') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Новости
              </Link>
              <Link 
                href="/articles" 
                className={`nav-link-mobile submenu-item ${isActive('/articles') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Статьи
              </Link>
              <Link 
                href="/faq" 
                className={`nav-link-mobile submenu-item ${isActive('/faq') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/marketing-activity/"
                prefetch={false}
                className={`nav-link-mobile submenu-item ${isActive('/marketing-activity') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Маркетинговая активность
              </Link>
              <Link 
                href="/privacy" 
                className={`nav-link-mobile submenu-item ${isActive('/privacy') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Политика
              </Link>
              <Link 
                href="/terms" 
                className={`nav-link-mobile submenu-item ${isActive('/terms') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Условия
              </Link>
              <Link 
                href="/certificates" 
                className={`nav-link-mobile submenu-item ${isActive('/certificates') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Сертификаты
              </Link>
            </div>
            
            <Link href="/contacts" className={`nav-link-mobile ${isActive('/contacts') ? 'active' : ''}`}>
              Контакты
            </Link>
            
            <div className="catalog-links-mobile">
              <a 
                href="https://fit-emarket.ru" 
                target="_blank" 
                rel="noopener noreferrer"
                className="catalog-button-mobile"
              >
                Каталог (физ. лица)
              </a>
              <a 
                href="https://fit24.ru" 
                target="_blank" 
                rel="noopener noreferrer"
                className="catalog-button-mobile"
              >
                Каталог (юр. лица)
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header 