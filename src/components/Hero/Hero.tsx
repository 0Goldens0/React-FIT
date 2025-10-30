import { useEffect, useRef } from 'react'
import { getAssetPath } from '../../utils/paths'
import './Hero.css'

const Hero = () => {
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Инициализация частиц
    createHeroParticles()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number')
            counters.forEach((counter) => {
              animateCounter(counter as HTMLElement)
            })
          }
        })
      },
      { threshold: 0.5 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const animateCounter = (element: HTMLElement) => {
    const target = parseInt(element.getAttribute('data-count') || '0')
    const duration = 2000
    const start = 0
    const startTime = performance.now()

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const current = Math.floor(start + (target - start) * easeOutQuart)
      
      element.textContent = current.toString()
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter)
      } else {
        element.textContent = target.toString()
      }
    }

    requestAnimationFrame(updateCounter)
  }

  const createHeroParticles = () => {
    const particlesContainer = document.getElementById('hero-particles')
    if (!particlesContainer) return

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle'
      particle.style.left = Math.random() * 100 + '%'
      particle.style.animationDelay = Math.random() * 3 + 's'
      particle.style.animationDuration = (Math.random() * 2 + 2) + 's'
      particlesContainer.appendChild(particle)
    }
  }

  const scrollToBrands = () => {
    document.getElementById('brands')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="home">
      <div className="hero-background" style={{ backgroundImage: `url('${getAssetPath("img/hero-background.jpg")}')` }}></div>
      <div className="hero-particles" id="hero-particles"></div>
      
      <div className="container">
        <div className="hero-wrapper">
          <div className="hero-content">
            <h1 className="hero-title">Технологичный инструмент для профессионалов и домашних мастеров. <br /> <br /> Готовые решения для эффективной работы. Надежный результат  с первого подхода!</h1>
            <p className="hero-description">
            <strong>Более 25 лет</strong> мы создаем решения, которым <strong>доверяют</strong>.
            Компания FIT предлагает <strong>комплексные решения</strong> для любых задач — от домашнего ремонта до сложных промышленных проектов. Мы обеспечиваем надежность и результат, на которые можно положиться.
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
            <img src={getAssetPath("img/c98be543-3cca-4e81-b5be-98b263057ff3.webp")} alt="Инструменты FIT" className="hero-img" loading="eager" />
            <div className="hero-glow-overlay"></div>
          </div>
        </div>

        {/* Integrated Stats Section */}
        <div className="hero-stats" ref={statsRef}>
          <div className="stats-grid">
            <div className="stat-item animate fadeInUp delay-1">
              <div className="stat-number" data-count="12000">0</div>
              <div className="stat-label">позиций в каталоге</div>
            </div>
            <div className="stat-item animate fadeInUp delay-2">
              <div className="stat-number" data-count="10">0</div>
              <div className="stat-label">филиалов по всей России</div>
            </div>
            <div className="stat-item animate fadeInUp delay-3">
              <div className="stat-number" data-count="1000">0</div>
              <div className="stat-label">сотрудников в штате</div>
            </div>
            <div className="stat-item animate fadeInUp delay-4">
              <div className="stat-number" data-count="40">0</div>
              <div className="stat-label">единиц собственного транспорта</div>
            </div>
          </div>
        </div>
      </div>
      <div className="lava-blobs"></div>
    </section>
  )
}

export default Hero 