'use client'

import { useCallback, useEffect, useRef } from 'react'
import { getAssetPath } from '../../utils/paths'
import { performanceOptimizer } from '../../utils/performanceOptimizer'

const Hero = () => {
  const statsRef = useRef<HTMLDivElement | null>(null)
  const particlesRef = useRef<HTMLDivElement | null>(null)

  const isLowEndRef = useRef(false)
  const hasAnimatedRef = useRef(false)
  const rafIdsRef = useRef<number[]>([])

  useEffect(() => {
    // вычисляем 1 раз, чтобы не дергать лишний раз
    isLowEndRef.current = performanceOptimizer.isLowEnd()
  }, [])

  const animateCounter = useCallback((element: HTMLElement) => {
    const rawTarget = element.getAttribute('data-count')
    const target = Number.parseInt(rawTarget ?? '0', 10)
    const suffix = element.getAttribute('data-suffix') ?? ''

    if (!Number.isFinite(target)) {
      element.textContent = `0${suffix}`
      return
    }

    // На слабых устройствах показываем число сразу без анимации
    if (isLowEndRef.current) {
      element.textContent = `${target}${suffix}`
      return
    }

    // защита от повторного запуска на одном и том же элементе
    if (element.dataset.animated === '1') return
    element.dataset.animated = '1'

    const duration = 2000
    const start = 0
    const startTime = performance.now()

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const current = Math.floor(start + (target - start) * easeOutQuart)

      element.textContent = `${current}${suffix}`

      if (progress < 1) {
        const id = requestAnimationFrame(updateCounter)
        rafIdsRef.current.push(id)
      } else {
        element.textContent = `${target}${suffix}`
      }
    }

    const id = requestAnimationFrame(updateCounter)
    rafIdsRef.current.push(id)
  }, [])

  const createHeroParticles = useCallback(() => {
    if (isLowEndRef.current) return

    const container = particlesRef.current
    if (!container) return

    // важно для StrictMode и повторных маунтов
    container.textContent = ''

    const isMobile = window.innerWidth < 768
    const cores = navigator.hardwareConcurrency ?? 8
    const isLowPerf = cores <= 4
    const count = isMobile || isLowPerf ? 18 : 30

    const frag = document.createDocumentFragment()

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle'
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
      particle.style.animationDelay = `${Math.random() * 3}s`
      particle.style.animationDuration = `${Math.random() * 2 + 2}s`
      frag.appendChild(particle)
    }

    container.appendChild(frag)
  }, [])

  useEffect(() => {
    createHeroParticles()
    return () => {
      // очищаем частицы при размонтировании
      particlesRef.current && (particlesRef.current.textContent = '')
    }
  }, [createHeroParticles])

  useEffect(() => {
    const node = statsRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          if (hasAnimatedRef.current) return

          hasAnimatedRef.current = true

          const counters = entry.target.querySelectorAll<HTMLElement>('.stat-number')
          counters.forEach((counter) => animateCounter(counter))

          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
      // если ушли со страницы во время анимации, прибьём rAF
      rafIdsRef.current.forEach((id) => cancelAnimationFrame(id))
      rafIdsRef.current = []
    }
  }, [animateCounter])

  const scrollToBrands = useCallback(() => {
    document.getElementById('brands')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  const scrollToContact = useCallback(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section className="hero" id="home">
      <div className="hero-background" />
      <div ref={particlesRef} className="hero-particles" id="hero-particles" aria-hidden="true" />

      <div className="container">
        <div className="hero-wrapper">
          <div className="hero-content">
            <h1 className="hero-title">
              Технологичный инструмент для профессионалов и домашних мастеров.
              <br />
              <br />
              Готовые решения для эффективной работы. Надежный результат с первого подхода!
            </h1>

            <p className="hero-description">
              <strong>Более 25 лет</strong> мы создаем решения, которым <strong>доверяют</strong>. Компания FIT предлагает{' '}
              <strong>комплексные решения</strong> для любых задач — от домашнего ремонта до сложных промышленных проектов.
              Мы обеспечиваем надежность и результат, на которые можно положиться.
            </p>

            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={scrollToBrands}>
                Наши бренды
              </button>
              <button className="btn btn-outline" onClick={scrollToContact}>
                Связаться с нами
              </button>
            </div>
          </div>

          <div className="hero-image animate fadeInRight">
            <img
              src={getAssetPath('img/c98be543-3cca-4e81-b5be-98b263057ff3.webp')}
              alt="Инструменты FIT"
              className="hero-img"
              loading="eager"
            />
            <div className="hero-glow-overlay" />
          </div>
        </div>

        {/* Integrated Stats Section */}
        <div className="hero-stats" ref={statsRef}>
          <div className="stats-grid">
            <a
              href="https://fit24.ru/catalog/"
              target="_blank"
              rel="noopener noreferrer"
              className="stat-item animate fadeInUp delay-1"
            >
              <div className="stat-number" data-count="12000">
                0
              </div>
              <div className="stat-label">позиций в каталоге</div>
            </a>

            <a href="#map" className="stat-item animate fadeInUp delay-2">
              <div className="stat-number" data-count="10">
                0
              </div>
              <div className="stat-label">филиалов по всей России</div>
            </a>

            <div className="stat-item animate fadeInUp delay-3">
              <div className="stat-number" data-count="1000" data-suffix="+">
                0
              </div>
              <div className="stat-label">сотрудников в штате</div>
            </div>

            <div className="stat-item animate fadeInUp delay-4">
              <div className="stat-number" data-count="60" data-suffix="+">
                0
              </div>
              <div className="stat-label">единиц собственного транспорта</div>
            </div>
          </div>
        </div>
      </div>

      <div className="lava-blobs" />
    </section>
  )
}

export default Hero
