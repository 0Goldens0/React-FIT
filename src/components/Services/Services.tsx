'use client'

import { useEffect, useMemo, useState } from 'react'
import { getAssetPath } from '../../utils/paths'
import { CmsBlocks } from '../CmsBlocks/CmsBlocks'
import {
  extractMediaUrl,
  fetchCmsHomePage,
  fetchCmsPartnerLogos,
  type CmsHomeClientServiceCard,
  type CmsHomePage,
  type CmsPartnerLogo,
} from '../../utils/cms'

const Services = () => {
  const [partners, setPartners] = useState<CmsPartnerLogo[]>([])
  const [home, setHome] = useState<CmsHomePage | null>(null)

  const normalizeLogoUrl = (value: unknown): string | null => {
    // Next.js may sometimes provide a "static import" object with { src }.
    if (typeof value === 'string') {
      const trimmed = value.trim()
      if (!trimmed) return null
      return encodeURI(trimmed)
    }
    if (value && typeof value === 'object' && 'src' in value) {
      const valueObj = value as Record<string, unknown>
      const src = valueObj.src
      if (typeof src === 'string' && src.trim()) return encodeURI(src.trim())
    }
    return null
  }

  useEffect(() => {
    // Создаем частицы для фона
    createServiceParticles()
    
    // Инициализируем spotlight эффект
    initSpotlight()
    
    // Добавляем обработчики для 3D карточек
    initServiceCards()

    // Загружаем логотипы партнеров из CMS
    const loadPartners = async () => {
      try {
        const data = await fetchCmsPartnerLogos()
        if (data && data.length > 0) {
          setPartners(data)
        }
      } catch (error) {
        console.error('Failed to fetch partner logos:', error)
      }
    }
    loadPartners()

    // Загружаем контент главной (клиентский сервис) из CMS
    const loadHome = async () => {
      try {
        const data = await fetchCmsHomePage()
        if (data) setHome(data)
      } catch {
        // keep fallback
      }
    }
    loadHome()
  }, [])

  const fallbackClientService = useMemo(
    () => ({
      title: 'КЛИЕНТСКИЙ СЕРВИС',
      subtitle:
        'Компания FIT предлагает полный спектр услуг для наших партнеров и клиентов. Мы стремимся сделать сотрудничество максимально выгодным и удобным для вас.',
      cards: [
        {
          order: 1,
          iconName: 'dashboard',
          title: 'Личный кабинет',
          frontText: 'Электронный личный кабинет с доступом 24/7',
          backText:
            'Компания FIT предоставляет клиентам доступ в электронный личный кабинет. В нем можно заказывать товар, делать возвраты, вести электронный документооборот. Сервис работает в режиме 24/7.',
        },
        {
          order: 2,
          iconName: 'monitor',
          title: 'Торговое оборудование',
          frontText: 'Готовые стенды для вашего бизнеса',
          backText:
            'Компания FIT поставляет готовые решения с торговым оборудованием. Вам не нужно тратиться на дорогостоящие стенды. Мы разрабатываем и изготавливаем торговое оборудование, которое наилучшим образом представит нашу продукцию.',
        },
        {
          order: 3,
          iconName: 'user',
          title: 'Персональный менеджер',
          frontText: 'Индивидуальный подход к клиенту',
          backText:
            'Персональный квалифицированный менеджер профессионально поможет вам выбрать необходимый ассортимент, расскажет о новинках и специальных предложениях, обеспечит оперативную связь между вами и компанией.',
        },
        {
          order: 4,
          iconName: 'zap',
          title: 'Рекламные предложения',
          frontText: 'Выгодные акции для партнеров',
          backText:
            'На системной основе компания FIT предлагает различные рекламные акции для своих партнеров. Мы разрабатываем эффективные маркетинговые инструменты, которые помогут увеличить продажи и привлечь новых клиентов.',
        },
        {
          order: 5,
          iconName: 'flag',
          title: 'Промоакции',
          frontText: 'Организация мероприятий под ключ',
          backText:
            'Компания FIT организует промоакции в ваших торговых точках. FIT берет на себя все этапы подготовки: от разработки сценария до полного сопровождения мероприятия. Выгоды: рост продаж, привлечение клиентов, лояльность покупателей.',
        },
        {
          order: 6,
          iconName: 'truck',
          title: 'Логистика',
          frontText: 'Бесплатная и своевременная доставка',
          backText:
            'Собственная доставка позволяет бесплатно на регулярной основе и в кратчайшие сроки доставлять товар до клиента. Мы гарантируем надежность и своевременность всех поставок благодаря собственному автопарку.',
        },
        {
          order: 7,
          iconName: 'settings',
          title: 'Сервисные центры',
          frontText: 'Гарантированное обслуживание',
          backText:
            'Авторизованные сервисные центры по гарантийному ремонту со 100% заменой на новый товар при гарантийном случае. Наша сеть сервисных центров охватывает все ключевые регионы страны и обеспечивает быстрое и качественное обслуживание.',
        },
        {
          order: 8,
          iconName: 'social',
          title: 'Онлайн-присутствие',
          frontText: 'Активность в социальных сетях',
          backText:
            'Присоединяйтесь к нашим социальным сетям, чтобы всегда быть в курсе последних новостей, новинок, видеообзоров инструмента и просто интересных постов про строительство, ремонт и DIY.',
        },
      ],
    }),
    []
  )

  const cmsCards = (home?.clientServiceCards || []) as CmsHomeClientServiceCard[]
  const displayClientService = useMemo(() => {
    const title = home?.clientServiceTitle?.trim() || fallbackClientService.title
    const subtitle = home?.clientServiceSubtitle ?? null
    const cards =
      cmsCards.length > 0
        ? cmsCards
            .slice()
            .sort((a, b) => (Number(a.order ?? 0) || 0) - (Number(b.order ?? 0) || 0))
            .map((c) => ({
              title: c.title,
              frontText: c.frontText ?? '',
              backText: c.backText ?? null,
              iconName: c.iconName ?? null,
              iconUrl: extractMediaUrl(c.icon),
            }))
        : fallbackClientService.cards.map((c) => ({
            title: c.title,
            frontText: c.frontText,
            backText: c.backText,
            iconName: c.iconName,
            iconUrl: undefined,
          }))

    return { title, subtitle, cards }
  }, [cmsCards, fallbackClientService, home])

  const renderBuiltInIcon = (iconName: string | null) => {
    switch (iconName) {
      case 'dashboard':
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="3" y1="9" x2="21" y2="9"></line>
            <line x1="9" y1="21" x2="9" y2="9"></line>
          </svg>
        )
      case 'monitor':
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
        )
      case 'user':
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        )
      case 'zap':
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
          </svg>
        )
      case 'flag':
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
            <line x1="4" y1="22" x2="4" y2="15"></line>
          </svg>
        )
      case 'truck':
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="15" height="13"></rect>
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
            <circle cx="5.5" cy="18.5" r="2.5"></circle>
            <circle cx="18.5" cy="18.5" r="2.5"></circle>
          </svg>
        )
      case 'settings':
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        )
      case 'social':
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
          </svg>
        )
      default:
        return null
    }
  }

  const fallbackPartners = [
    { name: "21 Век", logoUrl: getAssetPath("logo/partners/21vek (1).svg") },
    { name: "Aqualine", logoUrl: getAssetPath("logo/partners/AQUALINE-Photoroom.svg") },
    { name: "Бауцентр", logoUrl: getAssetPath("logo/partners/Бауцентр-Photoroom.svg") },
    { name: "Бигам", logoUrl: getAssetPath("logo/partners/Бигам-Photoroom.svg") },
    { name: "B2B", logoUrl: getAssetPath("logo/partners/В2B-Photoroom.svg") },
    { name: "Вимос", logoUrl: getAssetPath("logo/partners/Вимос-Photoroom.svg") },
    { name: "Вираж", logoUrl: getAssetPath("logo/partners/Вираж.svg") },
    { name: "Все Инструменты", logoUrl: getAssetPath("logo/partners/ВсеИнструменты.svg") },
    { name: "Гарвин Инструмент", logoUrl: getAssetPath("logo/partners/Гарвин Инструмент.svg") },
    { name: "Главторг24", logoUrl: getAssetPath("logo/partners/Главторг24-Photoroom.svg") },
    { name: "Добрострой", logoUrl: getAssetPath("logo/partners/Добрострой.svg") },
    { name: "Комус", logoUrl: getAssetPath("logo/partners/Комус-Photoroom.svg") },
    { name: "Кувалда.ру", logoUrl: getAssetPath("logo/partners/Кувалдару-Photoroom.svg") },
    { name: "Лемана Про", logoUrl: getAssetPath("logo/partners/лемана про.svg") },
    { name: "Материк", logoUrl: getAssetPath("logo/partners/Материк-Photoroom.svg") },
    { name: "Мегаполис", logoUrl: getAssetPath("logo/partners/Мегаполис.svg") },
    { name: "Метизы", logoUrl: getAssetPath("logo/partners/Метизы (1).svg") },
    { name: "Обойкин", logoUrl: getAssetPath("logo/partners/обойкин-Photoroom.svg") },
    { name: "Петрович", logoUrl: getAssetPath("logo/partners/Петович.svg") },
    { name: "Промметиз", logoUrl: getAssetPath("logo/partners/Промметиз.svg") },
    { name: "Русский Свет", logoUrl: getAssetPath("logo/partners/Русский свет (1).svg") },
    { name: "Строительный Двор", logoUrl: getAssetPath("logo/partners/строительный двор.svg") },
    { name: "Технониколь", logoUrl: getAssetPath("logo/partners/Технониколь.svg") },
    { name: "ТермоМакс", logoUrl: getAssetPath("logo/partners/ТермоМакс.svg") },
    { name: "Ситилинк", logoUrl: getAssetPath("logo/partners/citilink-logo.svg") },
    { name: "DNS", logoUrl: getAssetPath("logo/partners/dns-logo.svg") },
    { name: "ЭТМ", logoUrl: getAssetPath("logo/partners/etm.svg") },
    { name: "Exist", logoUrl: getAssetPath("logo/partners/exist.svg") },
    { name: "Кубань Инструмент", logoUrl: getAssetPath("logo/partners/kubaninstrument.svg") },
    { name: "Максидом", logoUrl: getAssetPath("logo/partners/maxidom.svg") },
    { name: "М.Видео", logoUrl: getAssetPath("logo/partners/mvideo-logo.svg") },
    { name: "OMA", logoUrl: getAssetPath("logo/partners/OMA.svg") },
    { name: "RDS", logoUrl: getAssetPath("logo/partners/RDS.svg") },
    { name: "Северсталь", logoUrl: getAssetPath("logo/partners/severstal-logo-rus.svg") },
    { name: "SOM", logoUrl: getAssetPath("logo/partners/Som.svg") },
    { name: "ТД Домовой", logoUrl: getAssetPath("logo/partners/tddomovoy.svg") },
  ]

  const displayPartners = (partners.length > 0
    ? partners.map((p) => ({
        name: p.name,
        logoUrl: normalizeLogoUrl(
          extractMediaUrl(p.logo) || fallbackPartners.find((f) => f.name === p.name)?.logoUrl || null
        ),
      }))
    : fallbackPartners.map((p) => ({ name: p.name, logoUrl: normalizeLogoUrl(p.logoUrl) })))
    .filter((p) => Boolean(p.logoUrl))

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
            <h2>{displayClientService.title}</h2>
            {displayClientService.subtitle ? (
              <CmsBlocks content={displayClientService.subtitle} />
            ) : (
              <p>{fallbackClientService.subtitle}</p>
            )}
          </div>
          
          <div className="services-grid-3d">
            {displayClientService.cards.map((card, idx) => {
              const delay = Math.min(idx + 1, 8)
              const delayClass = `delay-${delay}`
              const builtIn = renderBuiltInIcon(card.iconName)

              return (
                <div key={`${card.title}-${idx}`} className={`service-3d-card animate fadeInUp ${delayClass}`}>
                  <div className="service-card-inner">
                    <div className="service-card-front">
                      <div className="service-card-shine"></div>
                      <div className="service-icon">
                        {card.iconUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={card.iconUrl} alt="" width={40} height={40} loading="lazy" />
                        ) : (
                          builtIn
                        )}
                      </div>
                      <h3 className="service-title">{card.title}</h3>
                      <p className="service-description">{card.frontText}</p>
                    </div>
                    <div className="service-card-back">
                      <h3 className="service-title">{card.title}</h3>
                      {typeof card.backText === 'string' ? (
                        <p className="service-description">{card.backText}</p>
                      ) : card.backText ? (
                        <div className="service-description">
                          <CmsBlocks content={card.backText} />
                        </div>
                      ) : (
                        <p className="service-description"> </p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
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
              {displayPartners.map((partner, index) => (
                <div key={`partner-1-${index}`} className="partner-logo-item">
                  <img src={partner.logoUrl!} alt={partner.name} title={partner.name} loading="lazy" />
                </div>
              ))}
            </div>
            
            {/* Дублирующий набор для непрерывного движения */}
            <div className="partners-logo-group">
              {displayPartners.map((partner, index) => (
                <div key={`partner-2-${index}`} className="partner-logo-item">
                  <img src={partner.logoUrl!} alt={partner.name} title={partner.name} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Кнопка стать партнером */}
      <div className="services-cta-wrapper">
        <div className="services-cta">
          <a href="#contact" className="btn btn-primary btn-lg">Стать партнером</a>
        </div>
      </div>
    </>
  )
}

export default Services 