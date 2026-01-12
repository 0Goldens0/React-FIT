'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { scrollController } from '../../utils/scrollController'
import { performanceOptimizer } from '../../utils/performanceOptimizer'

import { brandsData, brandProducts } from './brandsData'

type BrandProduct = (typeof brandProducts)[string][number]

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
