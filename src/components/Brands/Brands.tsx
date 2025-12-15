'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { getAssetPath } from '../../utils/paths'
import { scrollController } from '../../utils/scrollController'
import { performanceOptimizer } from '../../utils/performanceOptimizer'

interface Brand {
  id: string
  displayName: string
  description: string
  logo: string
  primaryColor: string
  parallaxBgColor: string
  parallaxFgColor: string
}

interface BrandProduct {
  name: string
  article: string
  image: string
  price: string
  category: string
}

type BrandProductsMap = Record<string, BrandProduct[]>

/* ===== ДАННЫЕ БРЕНДОВ ===== */
const brandsData: Brand[] = [
  {
    id: 'fit',
    displayName: 'FIT',
    description:
      'Появление торговой марки в 2003 году дало мощный импульс развитию компании и обеспечило устойчивый рост продаж. FIT – это оптимальное сочетание цены и качества. Наш ассортимент — это единая экосистема решений: от ручного и электроинструмента до оснастки, крепежа и систем хранения. Такой подход позволяет решать любые задачи — от масштабного строительства до точечного ремонта.',
    logo: getAssetPath('logo/fit-logo-clean.svg'),
    primaryColor: '#FDB913',
    parallaxBgColor: '#004A4E',
    parallaxFgColor: '#002F3A',
  },
  {
    id: 'cutop',
    displayName: 'CUTOP',
    description:
      'Продукция бренда — профессиональная и промышленная оснастка для электроинструмента. Бренд использует самые передовые технологии производства и  предлагает готовые решения для работы с высокими нагрузками и сверхтвердыми материалами. Продукция CUTOP обеспечивает максимальную точность, увеличенный ресурс и безопасность при выполнении ответственных задач.',
    logo: getAssetPath('logo/brands/Cutop-CMYK.svg'),
    primaryColor: '#2A4998',
    parallaxBgColor: '#2A4998',
    parallaxFgColor: '#FFFFFF',
  },
  {
    id: 'mos',
    displayName: 'MOS',
    description:
      'Бренд закрывает потребности бизнеса в удовлетворении спроса на продукцию в низком ценовом сегменте. MOS — разумный выбор для дома и мастерской. Доступные ручные инструменты и хозяйственные товары решают базовые задачи, сохраняя достойное качество без переплат.',
    logo: getAssetPath('logo/brands/MOS-CMYK.svg'),
    primaryColor: '#00AEEF',
    parallaxBgColor: '#00AEEF',
    parallaxFgColor: '#FFFFFF',
  },
  {
    id: 'mastercolor',
    displayName: 'MASTER COLOR',
    description:
      'Master Color - профессиональный бренд товарной категории «малярно-штукатурный инструмент». Предлагает комплексные решения для профессиональной и бытовой отделки: от подготовки поверхностей до нанесения покрытий и защиты рабочей зоны. Каждый инструмент Master Color обеспечивает безупречный результат на всех этапах работ.',
    logo: getAssetPath('logo/brands/Master_Color_logo-1.svg'),
    primaryColor: '#0065A8',
    parallaxBgColor: '#0065A8',
    parallaxFgColor: '#FFFFFF',
  },
  {
    id: 'kypc',
    displayName: 'КУРС',
    description:
      'Разработан для занятия ниши среднего ценового сегмента.КУРС — практичные решения для повседневных задач. Ручные инструменты, оснастка и хозяйственные товары сочетают доступность и надежность, помогая справляться с ремонтом и обслуживанием дома.',
    logo: getAssetPath('logo/brands/Kurs-CMYK.svg'),
    primaryColor: '#D81515',
    parallaxBgColor: '#D81515',
    parallaxFgColor: '#FFFFFF',
  },
  {
    id: 'xbat',
    displayName: 'ХВАТ',
    description:
      'Бренд с говорящим названием! ХВАТ - специализированный бренд, который фокусируется на узком сегменте рынка - крепёж и сопутствующие товары для бытового и профессионального применения. Прочные, устойчивые к нагрузкам и долговечные решения для надежной фиксации, крепления и энергоснабжения.',
    logo: getAssetPath('logo/brands/Xbat-CMYK.svg'),
    primaryColor: '#1A1A1A',
    parallaxBgColor: '#1A1A1A',
    parallaxFgColor: '#FFFFFF',
  },
]

/* ===== ДАННЫЕ ТОВАРОВ ===== */
const brandProducts: BrandProductsMap = {
  fit: [
    { name: 'Дрель-Шуруповерт аккумуляторная', article: '79905', image: getAssetPath('img/fit/79905.webp'), price: '3 828.00 ₽', category: 'Электроинструмент' },
    { name: 'Перфоратор монтажный аккумуляторный', article: '79910', image: getAssetPath('img/fit/79910.webp'), price: '11 880.00 ₽', category: 'Электроинструмент' },
    { name: 'Шлифмашина угловая аккумуляторная', article: '79912', image: getAssetPath('img/fit/79912.webp'), price: '6 220.00 ₽', category: 'Электроинструмент' },
    { name: 'Пила дисковая циркулярная', article: '79920', image: getAssetPath('img/fit/79920.webp'), price: '7 425.00 ₽', category: 'Электроинструмент' },
  ],
  kypc: [
    { name: 'Тачка строительная КУРС', article: '77607', image: getAssetPath('img/kurs/77607.webp'), price: '3 590 ₽', category: 'Садовый инструмент' },
    { name: 'Кисть ОПТИМА', article: '00811', image: getAssetPath('img/kurs/00811.webp'), price: '2 790 ₽', category: 'Отделочный инструмент' },
    { name: 'Гвоздодер с изолированной ручкоЙ КУРС', article: '46913', image: getAssetPath('img/kurs/46913.webp'), price: '4 190 ₽', category: 'Столярный инструмент' },
    { name: 'Киянка резиновая КУРС', article: '45390', image: getAssetPath('img/kurs/45390.webp'), price: '3 290 ₽', category: 'Столярный инструмент' },
  ],
  mos: [
    { name: 'КИСТЬ ФЛЕЙЦЕВАЯ MOS', article: '00701', image: getAssetPath('img/mos/00701.webp'), price: '1 990 ₽', category: 'Отделочный инструмент' },
    { name: 'РУЛЕТКА MOS ', article: '16983', image: getAssetPath('img/mos/16983.webp'), price: '499 ₽', category: 'Измерительный инструмент' },
    { name: 'ДИСК ОТРЕЗНОЙ АЛМАЗНЫЙ MOS', article: '37201', image: getAssetPath('img/mos/37201.webp'), price: '690 ₽', category: 'Абразивно-шлифовальный инструмент' },
    { name: 'КЛЮЧ РАЗВОДНОЙ MOS', article: '70091', image: getAssetPath('img/mos/70091.webp'), price: '890 ₽', category: 'Сантехнический инструмент' },
  ],
  xbat: [
    { name: 'РЕМЕНЬ БАГАЖНЫЙ ХВАТ', article: '77-253', image: getAssetPath('img/xbat/77-253.webp'), price: '149 ₽', category: 'Инструмент автомобильный' },
    { name: 'НАБОР КРЕПЕЖА УНИВЕРСАЛЬНЫЙ ХВАТ', article: '20000', image: getAssetPath('img/xbat/20000.webp'), price: '189 ₽', category: 'Крепеж и крепежный инструмент' },
    { name: 'АНКЕРНЫЙ БОЛТ С ПОЛНЫМ КРЮКОМ ХВАТ', article: '26654', image: getAssetPath('img/xbat/26654.webp'), price: '590 ₽', category: 'Крепёж' },
    { name: 'ГЕНЕРАТОР ДИЗЕЛЬНЫЙ ХВАТ', article: 'KM7500DE', image: getAssetPath('img/xbat/KM7500DE.webp'), price: '249 ₽', category: 'Генератор' },
  ],
  cutop: [
    { name: 'ШУРУПОВЕРТ CUTOP e-profi', article: '01-884', image: getAssetPath('img/cutop/01-884.webp'), price: '190 ₽', category: 'Электроинструмент' },
    { name: 'РОФЕССИОНАЛЬНЫЙ ОТРЕЗНОЙ АЛМАЗНЫЙ ДИСК CUTOP', article: '73-419', image: getAssetPath('img/cutop/73-419-02 (2).webp'), price: '210 ₽', category: 'Абразивно-шлифовальный инструмент' },
    { name: 'КОРЩЕТКИ РУЧНЫЕ CUTOP profi', article: '82-547', image: getAssetPath('img/cutop/82-547.webp'), price: '990 ₽', category: 'Абразивно-шлифовальный инструмент' },
    { name: 'НАБОР БИТ В ПЛАСТИКОВОМ БОКСЕ CUTOP profi', article: '83-869', image: getAssetPath('img/cutop/83-869.webp'), price: '1 590 ₽', category: 'Слесарный инструмент' },
  ],
  mastercolor: [
    { name: 'КИСТЬ ФЛЕЙЦЕВАЯ Master Color 25 мм', article: '30-0011', image: getAssetPath('img/mc/30-0011.webp'), price: '250 ₽', category: 'Отделочный инструмент' },
    { name: 'РОЛИК Master Color 180мм', article: '30-0844', image: getAssetPath('img/mc/30-0844.webp'), price: '390 ₽', category: 'Отделочный инструмент' },
    { name: 'МАЛЯРНАЯ ЛЕНТА Master Color', article: '30-6412', image: getAssetPath('img/mc/30-6412.webp'), price: '290 ₽', category: 'Отделочный инструмент' },
    { name: 'ПРОФЕССИОНАЛЬНАЯ РАБОЧАЯ ОДЕЖДА Master Color', article: '30-8042', image: getAssetPath('img/mc/30-8042.webp'), price: '990 ₽', category: 'Отделочный инструмент' },
  ],
}

const Brands = () => {
  const lowEnd = useMemo(() => performanceOptimizer.isLowEnd(), [])
  const cardGap = 15

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [cardWidth, setCardWidth] = useState<number>(140)
  const [productCarouselIndices, setProductCarouselIndices] = useState<Record<string, number>>({})

  const containerRef = useRef<HTMLDivElement | null>(null)
  const sectionRef = useRef<HTMLElement | null>(null)

  const productCarouselRefs = useRef<Record<string, HTMLDivElement | null>>({})

  // ВАЖНО: без window. чтобы TS сам выбрал правильный тип (DOM или Node)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const snapTimeoutsRef = useRef<Record<string, ReturnType<typeof setTimeout> | null>>({})

  // Берём ровно те товары, которые реально показываем (4)
  const visibleProductsByBrand = useMemo(() => {
    const map: Record<string, BrandProduct[]> = {}
    for (const brand of brandsData) {
      map[brand.id] = (brandProducts[brand.id] ?? []).slice(0, 4)
    }
    return map
  }, [])

  /* ===== MOBILED DETECT ===== */
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 992)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  /* ===== CARD WIDTH (MOBILE) ===== */
  useEffect(() => {
    if (!isMobile) return

    const updateCardWidth = () => {
      const active = sectionRef.current?.querySelector('.brand-section.active .journey-brand-products') as HTMLElement | null
      const fallback = sectionRef.current?.querySelector('.journey-brand-products') as HTMLElement | null
      const el = active ?? fallback
      if (!el) return

      const containerWidth = el.offsetWidth
      const calculatedWidth = ((containerWidth - cardGap) / 2) * 0.6
      setCardWidth(Math.max(calculatedWidth, 140))
    }

    updateCardWidth()
    window.addEventListener('resize', updateCardWidth)
    return () => window.removeEventListener('resize', updateCardWidth)
  }, [isMobile])

  /* ===== SYNC EVENT (если надо) ===== */
  useEffect(() => {
    const handleBrandScrollUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ index: number }>
      setCurrentIndex(customEvent.detail.index)
    }
    window.addEventListener('brandScrollUpdate', handleBrandScrollUpdate)
    return () => window.removeEventListener('brandScrollUpdate', handleBrandScrollUpdate)
  }, [])

  const handleDotClick = useCallback(
    (index: number) => {
      if (index === currentIndex) return
      setCurrentIndex(index)
      window.dispatchEvent(new CustomEvent('brandScrollUpdate', { detail: { index } }))
    },
    [currentIndex]
  )

  const goToPrevBrand = useCallback(() => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : brandsData.length - 1
    handleDotClick(newIndex)
  }, [currentIndex, handleDotClick])

  const goToNextBrand = useCallback(() => {
    const newIndex = currentIndex < brandsData.length - 1 ? currentIndex + 1 : 0
    handleDotClick(newIndex)
  }, [currentIndex, handleDotClick])

  const navigateToAbout = useCallback(() => {
    scrollController.scrollToSection(1, true)
  }, [])

  const navigateToTimeline = useCallback(() => {
    scrollController.scrollToSection(3, true)
  }, [])

  /* ===== MOBILE AUTO SLIDE (ONE INTERVAL) ===== */
  useEffect(() => {
    // чистим snap-таймауты
    Object.values(snapTimeoutsRef.current).forEach((t) => t && clearTimeout(t))
    snapTimeoutsRef.current = {}

    if (!isMobile) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      intervalRef.current = null
      setProductCarouselIndices({})
      return
    }

    // init indices
    const initial: Record<string, number> = {}
    for (const brand of brandsData) initial[brand.id] = 0
    setProductCarouselIndices(initial)

    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      setProductCarouselIndices((prev) => {
        const next = { ...prev }
        for (const brand of brandsData) {
          const visibleCount = visibleProductsByBrand[brand.id]?.length ?? 0
          if (visibleCount === 0) continue

          // идём 0..visibleCount (visibleCount = первый дубль), дальше snap в 0
          const cur = prev[brand.id] ?? 0
          const cap = visibleCount
          next[brand.id] = cur >= cap ? cap : cur + 1
        }
        return next
      })
    }, 3000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      intervalRef.current = null

      Object.values(snapTimeoutsRef.current).forEach((t) => t && clearTimeout(t))
      snapTimeoutsRef.current = {}
    }
  }, [isMobile, visibleProductsByBrand])

  /* ===== SNAP BACK WHEN REACHED “DUPLICATE FIRST” ===== */
  useEffect(() => {
    if (!isMobile) return

    for (const brand of brandsData) {
      const visibleCount = visibleProductsByBrand[brand.id]?.length ?? 0
      if (!visibleCount) continue

      const idx = productCarouselIndices[brand.id] ?? 0
      if (idx !== visibleCount) continue

      const carousel = productCarouselRefs.current[brand.id]
      if (!carousel) continue

      const old = snapTimeoutsRef.current[brand.id]
      if (old) clearTimeout(old)

      snapTimeoutsRef.current[brand.id] = setTimeout(() => {
        carousel.style.transition = 'none'
        setProductCarouselIndices((prev) => ({ ...prev, [brand.id]: 0 }))

        setTimeout(() => {
          carousel.style.transition = lowEnd ? 'none' : 'transform 0.5s ease-in-out'
        }, 50)
      }, lowEnd ? 0 : 520)
    }
  }, [productCarouselIndices, isMobile, lowEnd, visibleProductsByBrand, cardWidth])

  return (
    <section className="brands" id="brands" ref={sectionRef}>
      <div
        className="brand-journey-container"
        ref={containerRef}
        style={{
          transform: `translate3d(-${currentIndex * 100}vw, 0, 0)`,
          WebkitTransform: `translate3d(-${currentIndex * 100}vw, 0, 0)`,
        }}
      >
        {brandsData.map((brand, index) => {
          const visible = visibleProductsByBrand[brand.id] ?? []
          const duplicated = [...visible, ...visible]
          const shift = (productCarouselIndices[brand.id] ?? 0) * (cardWidth + cardGap)
          const bgText = encodeURIComponent(brand.displayName)

          return (
            <section
              key={brand.id}
              className={`brand-section ${index === currentIndex ? 'active' : ''}`}
              id={`brand-${brand.id}`}
            >
              <div
                className="parallax-bg"
                style={{
                  backgroundImage: `url('https://placehold.co/1920x1080/${brand.parallaxBgColor.substring(1)}/${brand.parallaxFgColor.substring(1)}?text=${bgText}&font=Inter')`,
                }}
              />

              <div className="brand-content">
                <div className="brand-logo-journey">
                  <img src={brand.logo} alt={`Логотип ${brand.id}`} />
                </div>
                <p className="brand-description">{brand.description}</p>
              </div>

              <div className="journey-brand-products">
                {isMobile ? (
                  <div
                    className="product-carousel-track"
                    ref={(el) => {
                      productCarouselRefs.current[brand.id] = el
                    }}
                    style={{
                      transform: `translateX(-${shift}px)`,
                      transition: lowEnd ? 'none' : 'transform 0.5s ease-in-out',
                    }}
                  >
                    {duplicated.map((product, idx2) => (
                      <div
                        key={`${product.article}-${idx2}`}
                        className="journey-product-card product-card-slider-item"
                        style={{ width: `${cardWidth}px`, minWidth: `${cardWidth}px` }}
                      >
                        <div className="journey-product-card-image-container">
                          <img src={product.image} alt={product.name} />
                        </div>
                        <div className="product-info-container">
                          <div className="product-category">{product.category}</div>
                          <h4 className="product-name" style={{ textTransform: 'none' }}>
                            {product.name}
                          </h4>
                          <div className="product-article">Артикул: {product.article}</div>
                          <button className="product-detail-btn" style={{ backgroundColor: brand.primaryColor }}>
                            Подробнее
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  visible.map((product) => (
                    <div key={product.article} className="journey-product-card product-card-slider-item">
                      <div className="journey-product-card-image-container">
                        <img src={product.image} alt={product.name} />
                      </div>
                      <div className="product-info-container">
                        <div className="product-category">{product.category}</div>
                        <h4 className="product-name" style={{ textTransform: 'none' }}>
                          {product.name}
                        </h4>
                        <div className="product-article">Артикул: {product.article}</div>
                        <button className="product-detail-btn" style={{ backgroundColor: brand.primaryColor }}>
                          Подробнее
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          )
        })}
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
              background: index === currentIndex ? brand.primaryColor : 'rgba(255, 255, 255, 0.2)',
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

      <button
        className={`section-nav-arrow ${isMobile ? 'arrow-left' : 'arrow-up'}`}
        onClick={isMobile ? goToPrevBrand : navigateToAbout}
        aria-label={isMobile ? 'Предыдущий бренд' : 'К разделу О компании'}
      >
        {isMobile ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 15l7-7 7 7" />
          </svg>
        )}
      </button>

      <button
        className={`section-nav-arrow ${isMobile ? 'arrow-right' : 'arrow-down'}`}
        onClick={isMobile ? goToNextBrand : navigateToTimeline}
        aria-label={isMobile ? 'Следующий бренд' : 'К разделу История'}
      >
        {isMobile ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 5l7 7-7 7" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 9l7 7 7-7" />
          </svg>
        )}
      </button>
    </section>
  )
}

export default Brands
