import { useEffect } from 'react'
import './About.css'

const About = () => {
  useEffect(() => {
    // Инициализация частиц
    createAboutParticles()
  }, [])

  const createAboutParticles = () => {
    const particlesContainer = document.getElementById('about-particles')
    if (!particlesContainer) return

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle'
      particle.style.left = Math.random() * 100 + '%'
      particle.style.top = Math.random() * 100 + '%'
      particle.style.animationDelay = Math.random() * 3 + 's'
      particle.style.animationDuration = (Math.random() * 3 + 3) + 's'
      particlesContainer.appendChild(particle)
    }
  }

  const scrollToBrands = () => {
    document.getElementById('brands')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="about" id="about">
      <div className="particles" id="about-particles"></div>

      <div className="container">
        <div className="content-container">
          <div className="section-header">
            <h2 className="section-title">О КОМПАНИИ FIT</h2>
            <p className="section-subtitle">Ваш надежный партнер в мире профессионального инструмента</p>
          </div>

          <div className="content-grid">
            <div className="image-section">
              <div className="holographic-container">
                <div className="hexagon-3d">
                  <div className="hexagon-face">
                    <div className="hexagon-content">
                      <div className="energy-rings">
                        <div className="energy-ring"></div>
                        <div className="energy-ring"></div>
                        <div className="energy-ring"></div>
                      </div>
                      <div className="logo-glow"></div>
                      <div className="logo-3d">
                        <img 
                          src="/logo/fit-logo-clean.svg" 
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
                Компания FIT занимается производством и продажей ручного и электроинструмента промышленного и бытового назначения на территории Российской Федерации и стран таможенного союза.
              </p>

              <div className="mission-block">
                <div className="mission-title">Наша миссия</div>
                <div className="mission-text">
                  Обеспечивать профессионалов и домашних мастеров качественным инструментом по доступной цене. Мы ценим качество, инновации и выстраиваем долгосрочные отношения с партнерами.
                </div>
              </div>

              <p className="company-description">
                С 1996 года мы привозим и реализуем на Российском рынке канадский инструмент FIT. За это время мы прошли долгий путь от маленького представительства до компании, работающей почти во всех регионах РФ.
              </p>

              <button className="cta-button" onClick={scrollToBrands}>
                <span>Наши бренды</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About 