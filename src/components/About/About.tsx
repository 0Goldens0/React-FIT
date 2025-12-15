'use client'

import { useEffect, memo, useRef, useCallback } from 'react'
import { getAssetPath } from '../../utils/paths'
import { performanceOptimizer } from '../../utils/performanceOptimizer'

const About = memo(function About() {
  const particlesRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // SSR safety (если вдруг когда-нибудь)
    if (typeof window === 'undefined') return

    // На слабых устройствах не создаем частицы
    if (performanceOptimizer.isLowEnd()) return

    const container = particlesRef.current
    if (!container) return

    // важно для StrictMode и повторных маунтов
    container.textContent = ''

    const isMobile = window.innerWidth < 768
    const cores = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency ?? 8 : 8
    const isLowPerformance = cores <= 4
    const particleCount = isMobile || isLowPerformance ? 15 : 25

    const frag = document.createDocumentFragment()

    for (let i = 0; i < particleCount; i++) {
      const hexagon = document.createElement('div')
      hexagon.className = 'hexagon-particle'

      hexagon.style.left = `${Math.random() * 100}%`
      hexagon.style.top = `${Math.random() * 100}%`
      hexagon.style.animationDelay = `${Math.random() * 5}s`
      hexagon.style.animationDuration = `${Math.random() * 10 + 15}s`

      const size = Math.random() * 25 + 15
      hexagon.style.width = `${size}px`
      hexagon.style.height = `${size}px`

      hexagon.style.opacity = (Math.random() * 0.4 + 0.1).toString()

      frag.appendChild(hexagon)
    }

    container.appendChild(frag)

    return () => {
      container.textContent = ''
    }
  }, [])

  const scrollToBrands = useCallback(() => {
    document.getElementById('brands')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section className="about" id="about">
      <div
        ref={particlesRef}
        className="particles"
        id="about-particles"
        aria-hidden="true"
      />

      <div className="container">
        <div className="content-container">
          <div className="section-header">
            <h2 className="section-title">О КОМПАНИИ FIT</h2>
            <p className="section-subtitle">
              Ваш надежный партнер в мире <strong>технологичных решений</strong> в России и странах СНГ.
            </p>
          </div>

          <div className="content-grid">
            <div className="image-section">
              <div className="holographic-container">
                <div className="hexagon-3d">
                  <div className="hexagon-face">
                    <div className="hexagon-content">
                      <div className="energy-rings">
                        <div className="energy-ring" />
                        <div className="energy-ring" />
                        <div className="energy-ring" />
                      </div>
                      <div className="logo-glow" />
                      <div className="logo-3d">
                        <img
                          src={getAssetPath('logo/fit-logo-clean.svg')}
                          alt="FIT Logo"
                          className="fit-logo-svg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-section">
              <p className="company-description">
                Мы обеспечиваем эффективность и безупречное качество работ на строительной площадке, на производстве или в домашней мастерской. Наша продукция доступна по всей территории РФ и стран Таможенного союза.
              </p>

              <div className="mission-block">
                <div className="mission-title">Наша миссия</div>
                <div className="mission-text">
                  Наша миссия — создавать технологичные решения, которые <strong>экономят время и ресурсы</strong>.
                  <br />
                  <br />
                  Мы <strong>ценим качество, инновации</strong> и выстраиваем долгосрочные отношения с партнерами.
                  <br />
                  <br />
                  Наша цель — гарантировать <strong>уверенность в результате</strong> для любых профессиональных и бытовых задач.
                </div>
              </div>

              <button className="cta-button" onClick={scrollToBrands}>
                <span>Наши бренды</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

About.displayName = 'About'
export default About
