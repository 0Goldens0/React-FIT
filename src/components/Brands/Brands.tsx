import { useState, useEffect, useRef } from 'react'
import '../../assets/css/brand-journey.css'

interface Brand {
  id: string
  description: string
  logo: string
  primaryColor: string
  parallaxBgColor: string
  parallaxFgColor: string
}

// Интерфейс для продукта
interface BrandProduct {
  name: string;
  article: string;
  image: string;
  price: string;
  category: string;
}

// Типизация объекта brandProducts
interface BrandProductsMap {
  [key: string]: BrandProduct[];
}

// Данные по брендам
const brandsData: Brand[] = [
  {
    id: 'fit',
    description: 'Появление торговой марки в 2003 году дало мощный импульс развитию компании и обеспечило устойчивый рост продаж. FIT – это оптимальное сочетание качества и цены.',
    logo: '/logo/brands/FIT_logo.png',
    primaryColor: '#FDB913',
    parallaxBgColor: '#004A4E',
    parallaxFgColor: '#002F3A'
  },
  {
    id: 'kypc',
    description: 'Разработан для занятия ниши среднего ценового сегмента. Выбор правильного курса — важная задача. Наш «Курс» — правильный и сбалансированный выбор!',
    logo: '/logo/brands/Kurs-CMYK.svg',
    primaryColor: '#D81515',
    parallaxBgColor: '#D81515',
    parallaxFgColor: '#FFFFFF'
  },
  {
    id: 'mos',
    description: 'Бренд закрывает потребности бизнеса в удовлетворении спроса на продукцию в низком ценовом сегменте. MOS - доступный инструмент для решения базовых задач.',
    logo: '/logo/brands/MOS-CMYK.svg',
    primaryColor: '#00AEEF',
    parallaxBgColor: '#00AEEF',
    parallaxFgColor: '#FFFFFF'
  },
  {
    id: 'xbat',
    description: 'Бренд с говорящим названием! ХВАТ - специализированный бренд, который фокусируется на узком сегменте рынка и предлагает лучшие решения в своей категории.',
    logo: '/logo/brands/Xbat-CMYK.svg',
    primaryColor: '#1A1A1A',
    parallaxBgColor: '#1A1A1A',
    parallaxFgColor: '#FFFFFF'
  },
  {
    id: 'greatflex',
    description: 'GREATFLEX – это инновационные решения для вашего сада. Мы стремимся сделать садоводство и огородничество простым и эффективным.',
    logo: '/logo/brands/greatflex.png',
    primaryColor: '#E40C0C',
    parallaxBgColor: '#E40C0C',
    parallaxFgColor: '#FFFFFF'
  },
  {
    id: 'cutop',
    description: 'Продукция бренда — профессиональная и промышленная оснастка для электроинструментов. Внимание к инновациям гарантирует постоянное появление новой продукции.',
    logo: '/logo/brands/Cutop-CMYK.svg',
    primaryColor: '#2A4998',
    parallaxBgColor: '#2A4998',
    parallaxFgColor: '#FFFFFF'
  },
  {
    id: 'mastercolor',
    description: 'Бренд товарной категории «малярно-штукатурный инструмент». Master Color - это яркие краски вашего ремонта.',
    logo: '/logo/brands/Master_Color_logo-1.svg',
    primaryColor: '#0065A8',
    parallaxBgColor: '#0065A8',
    parallaxFgColor: '#FFFFFF'
  }
]

// Данные о продуктах брендов
const brandProducts: BrandProductsMap = {
  fit: [
    { name: "Дрель-Шуруповерт аккумуляторная", article: "79905", image: "/img/fit/79905.png", price: "3 828.00 ₽", category: "Электроинструмент" },
    { name: "Перфоратор монтажный аккумуляторный", article: "79910", image: "/img/fit/79910.png", price: "11 880.00 ₽", category: "Электроинструмент" },
    { name: "Шлифмашина угловая аккумуляторная", article: "79912", image: "/img/fit/79912.png", price: "6 220.00 ₽", category: "Электроинструмент" },
    { name: "Пила дисковая циркулярная", article: "79920", image: "/img/fit/79920.png", price: "7 425.00 ₽", category: "Электроинструмент" }
  ],
  kypc: [
    { name: "Тачка строительная КУРС", article: "77607", image: "/img/kurs/77607.png", price: "3 590 ₽", category: "Садовый инструмент" },
    { name: "Кисть ОПТИМА", article: "00811", image: "/img/kurs/00811.png", price: "2 790 ₽", category: "Отделочный инструмент" },
    { name: "Гвоздодер с изолированной ручкоЙ КУРС", article: "46913", image: "/img/kurs/46913.png", price: "4 190 ₽", category: "Столярный инструмент" },
    { name: "Киянка резиновая КУРС", article: "45390", image: "/img/kurs/45390.png", price: "3 290 ₽", category: "Столярный инструмент" }
  ],
  mos: [
    { name: "КИСТЬ ФЛЕЙЦЕВАЯ MOS", article: "00701", image: "/img/mos/00701.png", price: "1 990 ₽", category: "Отделочный инструмент" },
    { name: "РУЛЕТКА MOS ", article: "16983", image: "/img/mos/16983.png", price: "499 ₽", category: "Измерительный инструмент" },
    { name: "ДИСК ОТРЕЗНОЙ АЛМАЗНЫЙ MOS", article: "37201", image: "/img/mos/37201.png", price: "690 ₽", category: "Абразивно-шлифовальный инструмент" },
    { name: "КЛЮЧ РАЗВОДНОЙ MOS", article: "70091", image: "/img/mos/70091.png", price: "890 ₽", category: "Сантехнический инструмент" }
  ],
  xbat: [
    { name: "РЕМЕНЬ БАГАЖНЫЙ ХВАТ", article: "77-253", image: "/img/xbat/77-253.png", price: "149 ₽", category: "Инструмент автомобильный" },
    { name: "НАБОР КРЕПЕЖА УНИВЕРСАЛЬНЫЙ ХВАТ", article: "20000", image: "/img/xbat/20000.png", price: "189 ₽", category: "Крепеж и крепежный инструмент" },
    { name: "АНКЕРНЫЙ БОЛТ С ПОЛНЫМ КРЮКОМ ХВАТ", article: "26654", image: "/img/xbat/26654.png", price: "590 ₽", category: "Крепёж" },
    { name: "ГЕНЕРАТОР ДИЗЕЛЬНЫЙ ХВАТ", article: "KM7500DE", image: "/img/xbat/KM7500DE.png", price: "249 ₽", category: "Генератор" }
  ],
  greatflex: [
    { name: "ДИСКИ АЛМАЗНЫЕ GREATFLEX light", article: "55-771", image: "/img/gf/55-771.png", price: "1 290 ₽", category: "Абразивно-шлифовальный инструмент" },
    { name: "ДИСКИ АЛМАЗНЫЕ GREATFLEX light", article: "55-776", image: "/img/gf/55-776.png", price: "590 ₽", category: "Абразивно-шлифовальный инструмент" },
    { name: "ПРОФЕССИОНАЛЬНЫЙ ШЛИФОВАЛЬНЫЙ АЛМАЗНЫЙ ДИСК «СЕГМЕНТИРОВАННЫЙ ТУРБО»", article: "55-781", image: "/img/gf/55-781.png", price: "290 ₽", category: "Абразивно-шлифовальный инструмент" },
    { name: "КРУГ НАЖДАЧНЫЙ ЛЕПЕСТКОВЫЙ GREATFLEX light", article: "71-837", image: "/img/gf/71-837.png", price: "1 490 ₽", category: "Абразивно-шлифовальный инструмент" }
  ],
  cutop: [
    { name: "ШУРУПОВЕРТ CUTOP e-profi", article: "01-884", image: "/img/cutop/01-884.png", price: "190 ₽", category: "Электроинструмент" },
    { name: "РОФЕССИОНАЛЬНЫЙ ОТРЕЗНОЙ АЛМАЗНЫЙ ДИСК CUTOP", article: "73-419", image: "/img/cutop/73-419-02 (2).png", price: "210 ₽", category: "Абразивно-шлифовальный инструмент" },
    { name: "КОРЩЕТКИ РУЧНЫЕ CUTOP profi", article: "82-547", image: "/img/cutop/82-547.png", price: "990 ₽", category: "Абразивно-шлифовальный инструмент" },
    { name: "НАБОР БИТ В ПЛАСТИКОВОМ БОКСЕ CUTOP profi", article: "83-869", image: "/img/cutop/83-869.png", price: "1 590 ₽", category: "Слесарный инструмент" }
  ],
  mastercolor: [
    { name: "КИСТЬ ФЛЕЙЦЕВАЯ Master Color 25 мм", article: "30-0011", image: "/img/mc/30-0011.png", price: "250 ₽", category: "Отделочный инструмент" },
    { name: "РОЛИК Master Color 180мм", article: "30-0844", image: "/img/mc/30-0844.png", price: "390 ₽", category: "Отделочный инструмент" },
    { name: "МАЛЯРНАЯ ЛЕНТА Master Color", article: "30-6412", image: "/img/mc/30-6412.png", price: "290 ₽", category: "Отделочный инструмент" },
    { name: "ПРОФЕССИОНАЛЬНАЯ РАБОЧАЯ ОДЕЖДА Master Color", article: "30-8042", image: "/img/mc/30-8042.png", price: "990 ₽", category: "Отделочный инструмент" }
  ]
};

const Brands = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentIndexRef = useRef(currentIndex)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useRef(false)
  const firstEnter = useRef(true)
  const lastScrollTime = useRef(Date.now())
  const scrollThrottleTime = 300 // ms

  // Проверка, находится ли секция брендов в поле зрения
  useEffect(() => {
    const currentSectionEl = sectionRef.current; 
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        const wasInView = isInView.current
        isInView.current = entry.isIntersecting
        
        if (entry.isIntersecting) {
          if (firstEnter.current) {
            currentSectionEl?.scrollIntoView({ behavior: 'auto', block: 'center' })
            firstEnter.current = false
          } else if (!wasInView) {
            currentSectionEl?.scrollIntoView({ behavior: 'auto', block: 'center' })
          }
        }
      },
      {
        threshold: 0.5 
      }
    )

    if (currentSectionEl) { 
      observer.observe(currentSectionEl)
    }

    return () => {
      if (currentSectionEl) { 
        observer.unobserve(currentSectionEl)
      }
    }
  }, [])

  // Keep a ref updated with the latest currentIndex for wheel handler
  useEffect(() => {
    currentIndexRef.current = currentIndex
  }, [currentIndex])

  // Управление колесиком мыши для прокрутки брендов
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      console.log('[Brands.tsx] handleWheel triggered', { deltaY: e.deltaY });

      e.preventDefault()

      const sectionEl = sectionRef.current
      if (!sectionEl) return

      const now = Date.now()
      if (now - lastScrollTime.current < scrollThrottleTime) return
      lastScrollTime.current = now

      const scrollDown = e.deltaY > 0

      if (scrollDown) {
        if (currentIndexRef.current < brandsData.length - 1) {
          setCurrentIndex(prev => prev + 1)
        } else {
          const nextSection = sectionEl.nextElementSibling
          if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        if (currentIndexRef.current > 0) {
          setCurrentIndex(prev => prev - 1)
        } else {
          const prevSection = sectionEl.previousElementSibling
          if (prevSection) prevSection.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }

    const sectionEl = sectionRef.current
    if (sectionEl) {
      sectionEl.addEventListener('wheel', handleWheel, { passive: false })
    }
    return () => {
      if (sectionEl) {
        sectionEl.removeEventListener('wheel', handleWheel)
      }
    }
  }, []) // run once on mount

  const handleDotClick = (index: number) => {
    if (index === currentIndex) return
    setCurrentIndex(index)
    lastScrollTime.current = Date.now();
  }

  const handleKeyDownGlobal = (e: KeyboardEvent) => {
    if (!isInView.current) return
    
    const currentTime = Date.now();
    if (currentTime - lastScrollTime.current < scrollThrottleTime) {
      return;
    }

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      if (currentIndex < brandsData.length - 1) {
        setCurrentIndex(prev => prev + 1);
        lastScrollTime.current = Date.now();
      } else {
        const nextSection = sectionRef.current?.nextElementSibling;
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth' });
          lastScrollTime.current = Date.now();
        }
      }
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      if (currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
        lastScrollTime.current = Date.now();
      } else {
        const prevSection = sectionRef.current?.previousElementSibling;
        if (prevSection) {
          prevSection.scrollIntoView({ behavior: 'smooth' });
          lastScrollTime.current = Date.now();
        }
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDownGlobal)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDownGlobal)
    }
  }, [currentIndex, brandsData.length, isInView, scrollThrottleTime])

  return (
    <section 
      className="brands" 
      id="brands" 
      tabIndex={-1}
      ref={sectionRef}
      style={{ outline: 'none' }}
    >
      <div 
        className="brand-journey-container" 
        ref={containerRef}
        style={{ transform: `translateX(-${currentIndex * 100}vw)` }}
      >
        {brandsData.map((brand, index) => (
          <section 
            key={brand.id} 
            className={`brand-section ${index === currentIndex ? 'active' : ''}`}
            id={`brand-${brand.id}`}
          >
            <div className="parallax-bg" style={{ 
              backgroundImage: `url('https://placehold.co/1920x1080/${brand.parallaxBgColor.substring(1)}/${brand.parallaxFgColor.substring(1)}?text=${brand.id.toUpperCase()}&font=Inter')` 
            }}></div>
            
            <div className="brand-content">
              <div 
                className="brand-logo-journey"
                style={{ 
                  boxShadow: `0 0 20px ${brand.primaryColor}40, 0 0 40px ${brand.primaryColor}20`,
                  background: brand.id === 'xbat' || brand.id === 'greatflex' || brand.id === 'cutop' || brand.id === 'mastercolor' 
                    ? `radial-gradient(circle at center, rgba(10, 10, 15, 0.4) 0%, rgba(10, 10, 15, 0.7) 70%)`
                    : `rgba(10, 10, 15, 0.7)`,
                  border: `1px solid ${brand.primaryColor}30`
                }}
              >
                <img src={brand.logo} alt={`Логотип ${brand.id}`} />
              </div>
              <p className="brand-description">{brand.description}</p>
            </div>
            
            <div className="journey-brand-products">
              {brandProducts[brand.id]?.slice(0, 4).map((product: BrandProduct) => (
                <div key={product.article} className="journey-product-card product-card-slider-item">
                  <div className="journey-product-card-image-container">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-info-container">
                    <div className="product-category">{product.category}</div>
                    <h4 className="product-name" style={{ textTransform: 'none' }}>{product.name}</h4>
                    <div className="product-article">Артикул: {product.article}</div>
                    <button className="product-detail-btn" style={{ backgroundColor: brand.primaryColor }}>Подробнее</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
      
      <div className="navigation-dots">
        {brandsData.map((brand, index) => (
          <button
            key={brand.id}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Перейти к бренду ${brand.id}`}
            style={{ 
              borderColor: index === currentIndex ? brand.primaryColor : 'rgba(255, 255, 255, 0.3)',
              background: index === currentIndex ? brand.primaryColor : 'rgba(255, 255, 255, 0.2)'
            }}
          />
        ))}
      </div>
      
      <div className="scroll-indicator">
        <span>Прокручивайте</span>
        <svg viewBox="0 0 24 24">
          <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
          <path d="M0 0h24v24H0z" fill="none"></path>
        </svg>
        <span>или используйте навигацию</span>
      </div>
    </section>
  )
}

export default Brands