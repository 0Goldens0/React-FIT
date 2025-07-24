import { useEffect } from 'react'
import { getAssetPath } from '../../utils/paths'
import './Services.css'
import '../../assets/css/services.css'

const Services = () => {
  useEffect(() => {
    // Создаем частицы для фона
    createServiceParticles()
    
    // Инициализируем spotlight эффект
    initSpotlight()
    
    // Добавляем обработчики для 3D карточек
    initServiceCards()
  }, [])

  const createServiceParticles = () => {
    const container = document.querySelector('.services-particles')
    if (!container) return

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div')
      particle.className = 'service-particle'
      particle.style.left = Math.random() * 100 + '%'
      particle.style.top = Math.random() * 100 + '%'
      particle.style.width = Math.random() * 6 + 2 + 'px'
      particle.style.height = particle.style.width
      particle.style.animationDelay = Math.random() * 10 + 's'
      particle.style.animationDuration = Math.random() * 10 + 10 + 's'
      container.appendChild(particle)
    }
  }

  const initSpotlight = () => {
    const spotlight = document.querySelector('.services-spotlight') as HTMLElement
    if (!spotlight) return

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      spotlight.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255, 184, 0, 0.1), transparent 40%)`
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }

  const initServiceCards = () => {
    const cards = document.querySelectorAll('.service-3d-card')
    
    cards.forEach((card) => {
      const cardElement = card as HTMLElement
      
      cardElement.addEventListener('mouseenter', () => {
        cardElement.style.transform = 'rotateY(180deg)'
      })
      
      cardElement.addEventListener('mouseleave', () => {
        cardElement.style.transform = 'rotateY(0deg)'
      })
    })
  }

  return (
    <>
      <section className="services-new" id="services">
        {/* Фон со спецэффектами */}
        <div className="services-spotlight"></div>
        <div className="services-particles"></div>
        <div className="services-bg-gradient"></div>
        
        {/* Элементы 3D фона */}
        <div className="services-3d-elements">
          <div className="hex-3d hex-3d-1"></div>
          <div className="hex-3d hex-3d-2"></div>
          <div className="hex-3d hex-3d-3"></div>
          <div className="hex-3d hex-3d-4"></div>
          <div className="hex-3d hex-3d-5"></div>
        </div>
        
        <div className="container">
          <div className="section-title animate fadeInUp">
            <h2>КЛИЕНТСКИЙ СЕРВИС</h2>
            <p>Компания FIT предлагает полный спектр услуг для наших партнеров и клиентов. Мы стремимся сделать сотрудничество максимально выгодным и удобным для вас.</p>
          </div>
          
          <div className="services-grid-3d">
            {/* Личный кабинет */}
            <div className="service-3d-card animate fadeInUp delay-1">
              <div className="service-card-inner">
                <div className="service-card-front">
                  <div className="service-card-shine"></div>
                  <div className="service-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="3" y1="9" x2="21" y2="9"></line>
                      <line x1="9" y1="21" x2="9" y2="9"></line>
                    </svg>
                  </div>
                  <h3 className="service-title">Личный кабинет</h3>
                  <p className="service-description">Электронный личный кабинет с доступом 24/7</p>
                </div>
                <div className="service-card-back">
                  <h3 className="service-title">Личный кабинет</h3>
                  <p className="service-description">Компания FIT предоставляет клиентам доступ в электронный личный кабинет. В нем можно заказывать товар, делать возвраты, вести электронный документооборот. Сервис работает в режиме 24/7.</p>
                </div>
              </div>
            </div>

            {/* Торговое оборудование */}
            <div className="service-3d-card animate fadeInUp delay-2">
              <div className="service-card-inner">
                <div className="service-card-front">
                  <div className="service-card-shine"></div>
                  <div className="service-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                      <line x1="8" y1="21" x2="16" y2="21"></line>
                      <line x1="12" y1="17" x2="12" y2="21"></line>
                    </svg>
                  </div>
                  <h3 className="service-title">Торговое оборудование</h3>
                  <p className="service-description">Готовые стенды для вашего бизнеса</p>
                </div>
                <div className="service-card-back">
                  <h3 className="service-title">Торговое оборудование</h3>
                  <p className="service-description">Компания FIT поставляет готовые решения с торговым оборудованием. Вам не нужно тратиться на дорогостоящие стенды. Мы разрабатываем и изготавливаем торговое оборудование, которое наилучшим образом представит нашу продукцию.</p>
                </div>
              </div>
            </div>

            {/* Личный менеджер */}
            <div className="service-3d-card animate fadeInUp delay-3">
              <div className="service-card-inner">
                <div className="service-card-front">
                  <div className="service-card-shine"></div>
                  <div className="service-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <h3 className="service-title">Персональный менеджер</h3>
                  <p className="service-description">Индивидуальный подход к клиенту</p>
                </div>
                <div className="service-card-back">
                  <h3 className="service-title">Персональный менеджер</h3>
                  <p className="service-description">Персональный квалифицированный менеджер профессионально поможет вам выбрать необходимый ассортимент, расскажет о новинках и специальных предложениях, обеспечит оперативную связь между вами и компанией.</p>
                </div>
              </div>
            </div>

            {/* Логистика */}
            <div className="service-3d-card animate fadeInUp delay-4">
              <div className="service-card-inner">
                <div className="service-card-front">
                  <div className="service-card-shine"></div>
                  <div className="service-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="3" width="15" height="13"></rect>
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                      <circle cx="5.5" cy="18.5" r="2.5"></circle>
                      <circle cx="18.5" cy="18.5" r="2.5"></circle>
                    </svg>
                  </div>
                  <h3 className="service-title">Логистика</h3>
                  <p className="service-description">Бесплатная и своевременная доставка</p>
                </div>
                <div className="service-card-back">
                  <h3 className="service-title">Логистика</h3>
                  <p className="service-description">Собственная доставка позволяет бесплатно на регулярной основе и в кратчайшие сроки доставлять товар до клиента. Мы гарантируем надежность и своевременность всех поставок благодаря собственному автопарку.</p>
                </div>
              </div>
            </div>

            {/* Рекламные предложения */}
            <div className="service-3d-card animate fadeInUp delay-5">
              <div className="service-card-inner">
                <div className="service-card-front">
                  <div className="service-card-shine"></div>
                  <div className="service-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                  </div>
                  <h3 className="service-title">Рекламные предложения</h3>
                  <p className="service-description">Выгодные акции для партнеров</p>
                </div>
                <div className="service-card-back">
                  <h3 className="service-title">Рекламные предложения</h3>
                  <p className="service-description">На системной основе компания FIT предлагает различные рекламные акции для своих партнеров. Мы разрабатываем эффективные маркетинговые инструменты, которые помогут увеличить продажи и привлечь новых клиентов.</p>
                </div>
              </div>
            </div>

            {/* Промоакции */}
            <div className="service-3d-card animate fadeInUp delay-6">
              <div className="service-card-inner">
                <div className="service-card-front">
                  <div className="service-card-shine"></div>
                  <div className="service-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                      <line x1="4" y1="22" x2="4" y2="15"></line>
                    </svg>
                  </div>
                  <h3 className="service-title">Промоакции</h3>
                  <p className="service-description">Организация мероприятий под ключ</p>
                </div>
                <div className="service-card-back">
                  <h3 className="service-title">Промоакции</h3>
                  <p className="service-description">Компания FIT организует промоакции в ваших торговых точках. FIT берет на себя все этапы подготовки: от разработки сценария до полного сопровождения мероприятия. Выгоды: рост продаж, привлечение клиентов, лояльность покупателей.</p>
                </div>
              </div>
            </div>

            {/* Сервисные центры */}
            <div className="service-3d-card animate fadeInUp delay-7">
              <div className="service-card-inner">
                <div className="service-card-front">
                  <div className="service-card-shine"></div>
                  <div className="service-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                  </div>
                  <h3 className="service-title">Сервисные центры</h3>
                  <p className="service-description">Гарантированное обслуживание</p>
                </div>
                <div className="service-card-back">
                  <h3 className="service-title">Сервисные центры</h3>
                  <p className="service-description">Авторизованные сервисные центры по гарантийному ремонту со 100% заменой на новый товар при гарантийном случае. Наша сеть сервисных центров охватывает все ключевые регионы страны и обеспечивает быстрое и качественное обслуживание.</p>
                </div>
              </div>
            </div>

            {/* Онлайн-присутствие */}
            <div className="service-3d-card animate fadeInUp delay-8">
              <div className="service-card-inner">
                <div className="service-card-front">
                  <div className="service-card-shine"></div>
                  <div className="service-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                    </svg>
                  </div>
                  <h3 className="service-title">Онлайн-присутствие</h3>
                  <p className="service-description">Активность в социальных сетях</p>
                </div>
                <div className="service-card-back">
                  <h3 className="service-title">Онлайн-присутствие</h3>
                  <p className="service-description">Присоединяйтесь к нашим социальным сетям, чтобы всегда быть в курсе последних новостей, новинок, видеообзоров инструмента и просто интересных постов про строительство, ремонт и DIY.</p>
                  <a href="https://instrument-fit.ru" className="btn btn-primary" style={{marginTop: '15px'}}>Посетить сайт</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="services-cta animate fadeInUp">
            <a href="#contact" className="btn btn-primary btn-lg">Стать партнером</a>
            <span className="services-arrow">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </div>
        </div>
        
        {/* Анимированные фоновые элементы */}
        <div className="services-floating-shapes">
          <div className="float-shape shape1"></div>
          <div className="float-shape shape2"></div>
          <div className="float-shape shape3"></div>
        </div>
      </section>

      {/* Бегущая строка с логотипами партнеров */}
      <section className="partners-marquee">
        <div className="partners-marquee-container">
          <div className="partners-marquee-track">
            {/* Первый набор логотипов */}
            <div className="partners-logo-group">
              <div className="partner-logo-item">
                <img src={getAssetPath("logo/partners/Технониколь.svg")} alt="Технониколь" />
              </div>
              <div className="partner-logo-item">
                <img src={getAssetPath("logo/partners/строительный двор.svg")} alt="Строительный двор" />
              </div>
              <div className="partner-logo-item">
                <img src={getAssetPath("logo/partners/ИнфраКом.svg")} alt="ИнфраКом" />
              </div>
              <div className="partner-logo-item">
                <img src={getAssetPath("logo/partners/Все инструменты.ру.svg")} alt="Все инструменты.ру" />
              </div>
              <div className="partner-logo-item">
                <img src={getAssetPath("logo/partners/вш ремстройснаб.svg")} alt="ВШ Ремстройснаб" />
              </div>
              <div className="partner-logo-item">
                <img src={getAssetPath("logo/partners/Саморезик.svg")} alt="Саморезик" />
              </div>
              <div className="partner-logo-item">
                <img src={getAssetPath("logo/partners/Русский свет.svg")} alt="Русский свет" />
              </div>
              <div className="partner-logo-item">
                <img src={getAssetPath("logo/partners/ozon png.svg")} alt="Ozon" />
              </div>
              <div className="partner-logo-item">
                <img src={getAssetPath("logo/partners/ЭТМ.svg")} alt="ЭТМ" />
              </div>
              <div className="partner-logo-item">
                <img src={getAssetPath("logo/partners/autodoc.svg")} alt="Autodoc" />
              </div>
            </div>
            
            {/* Дублирующий набор для непрерывного движения */}
            <div className="partners-logo-group">
              <div className="partner-logo-item">
                <img src={getAssetPath("logo/partners/Технониколь.svg")} alt="Технониколь" />
              </div>
              <div className="partner-logo-item">
                <img src={getAssetPath("logo/partners/строительный двор.svg")} alt="Строительный двор" />
              </div>
              <div className="partner-logo-item">
                <img src={getAssetPath("logo/partners/ИнфраКом.svg")} alt="ИнфраКом" />
              </div>
              <div className="partner-logo-item">
                <img src={getAssetPath("logo/partners/Все инструменты.ру.svg")} alt="Все инструменты.ру" />
              </div>
              <div className="partner-logo-item">
                <img src={getAssetPath("logo/partners/вш ремстройснаб.svg")} alt="ВШ Ремстройснаб" />
              </div>
              <div className="partner-logo-item">
                <img src={getAssetPath("logo/partners/Саморезик.svg")} alt="Саморезик" />
              </div>
              <div className="partner-logo-item">
                <img src={getAssetPath("logo/partners/Русский свет.svg")} alt="Русский свет" />
              </div>
              <div className="partner-logo-item">
                <img src={getAssetPath("logo/partners/ozon png.svg")} alt="Ozon" />
              </div>
              <div className="partner-logo-item">
                <img src={getAssetPath("logo/partners/ЭТМ.svg")} alt="ЭТМ" />
              </div>
              <div className="partner-logo-item">
                <img src={getAssetPath("logo/partners/autodoc.svg")} alt="Autodoc" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Services 