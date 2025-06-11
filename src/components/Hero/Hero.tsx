import { useEffect } from 'react'
import './Hero.css'

const Hero = () => {
  useEffect(() => {
    // Инициализация частиц
    createHeroParticles()
  }, [])

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
      <div className="hero-background" style={{ backgroundImage: "url('img/hero-background.jpg')" }}></div>
      <div className="hero-particles" id="hero-particles"></div>
      
      <div className="container">
        <div className="hero-wrapper">
          <div className="hero-content">
            <div className="hero-subtitle">Профессиональный инструмент</div>
            <h1 className="hero-title">Инструмент для профессионалов и домашних мастеров</h1>
            <p className="hero-description">
              Компания FIT предлагает широкий ассортимент качественных инструментов для любых задач — от простых домашних работ до сложных промышленных проектов.
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
            <img src="img/c98be543-3cca-4e81-b5be-98b263057ff3.png" alt="Инструменты FIT" className="hero-img" loading="eager" />
            <div className="hero-glow-overlay"></div>
          </div>
        </div>
      </div>
      <div className="lava-blobs"></div>
    </section>
  )
}

export default Hero 