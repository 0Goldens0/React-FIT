'use client'

import { useEffect, useMemo, useState } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { getAssetPath } from '../utils/paths'
import { CmsBlocks } from '../components/CmsBlocks/CmsBlocks'
import { extractMediaUrl, fetchCmsLogisticsPage, type CmsLogisticsPage } from '../utils/cms'

const LogisticsPage = () => {
  const fallbackWarehouses = useMemo(
    () => [
      {
        city: 'Москва (ПНК Белый Раст)',
        address: 'Рогачёвское шоссе, 27 км от МКАД',
        status: 'Работает',
        imageUrl: getAssetPath('img/timeline/placeholder-warehouse.svg'),
      },
      {
        city: 'Санкт-Петербург',
        address: 'пр. Обуховской Обороны, 120',
        status: 'Работает',
        imageUrl: getAssetPath('img/timeline/placeholder-warehouse.svg'),
      },
      {
        city: 'Екатеринбург',
        address: 'Сибирский тракт, 12',
        status: 'Работает',
        imageUrl: getAssetPath('img/timeline/placeholder-warehouse.svg'),
      },
      {
        city: 'Казань',
        address: 'ул. Тихорецкая, 7',
        status: 'Работает',
        imageUrl: getAssetPath('img/timeline/placeholder-warehouse.svg'),
      },
      {
        city: 'Воронеж',
        address: 'ул. Димитрова, 148',
        status: 'Работает',
        imageUrl: getAssetPath('img/timeline/placeholder-warehouse.svg'),
      },
      {
        city: 'Краснодар',
        address: 'Уральская улица, 126',
        status: 'Работает',
        imageUrl: getAssetPath('img/timeline/placeholder-warehouse.svg'),
      },
      {
        city: 'Пятигорск',
        address: 'Черкесское шоссе, 25',
        status: 'Работает',
        imageUrl: getAssetPath('img/timeline/placeholder-warehouse.svg'),
      },
    ],
    []
  )

  const [cms, setCms] = useState<CmsLogisticsPage | null>(null)

  useEffect(() => {
    let cancelled = false
    fetchCmsLogisticsPage()
      .then((res) => {
        if (!cancelled && res) setCms(res)
      })
      .catch(() => {
        // keep fallback
      })
    return () => {
      cancelled = true
    }
  }, [])

  const warehouseImageUrl =
    extractMediaUrl(cms?.warehouseSectionImage) || getAssetPath('img/timeline/placeholder-port.svg')
  const distributionImageUrl =
    extractMediaUrl(cms?.distributionImage) || getAssetPath('img/timeline/placeholder-warehouse-interior.svg')

  const cmsWarehouses =
    (cms?.warehouses || [])
      .filter((w) => w && w.city && w.address)
      .map((w) => ({
        city: w.city,
        address: w.address,
        status: w.status || 'Работает',
        imageUrl: extractMediaUrl(w.image) || getAssetPath('img/timeline/placeholder-warehouse.svg'),
      })) || []

  const warehousesToRender = cmsWarehouses.length > 0 ? cmsWarehouses : fallbackWarehouses

  const ctaHref = (() => {
    const url = cms?.ctaButtonUrl || '/contacts'
    if (/^https?:\/\//.test(url)) return url
    return getAssetPath(url)
  })()

  return (
    <div className="logistics-page">
      <Header />
      
      <main className="logistics-content">
        {/* Hero Section */}
        <section className="logistics-hero">
          <div className="logistics-badge">{cms?.heroBadge || 'ЛОГИСТИКА FIT'}</div>
          <h1 className="logistics-title">
            {cms?.heroTitle || 'Система, которая'}
            <br />
            <span className="gradient-text">{cms?.heroTitleHighlight || 'работает для вас'}</span>
          </h1>
          <p className="logistics-subtitle">
            {cms?.heroSubtitle ||
              'Логистика FIT — это отлаженная система поставок, которую мы совершенствуем много лет. Мы доставляем инструмент быстро, надежно и предсказуемо, обеспечивая партнёрам бесперебойную работу.'}
          </p>

          <div className="stats-grid">
            {(cms?.heroStats && cms.heroStats.length > 0
              ? cms.heroStats
              : [
                  { value: '2', label: 'Распределительных центра', variant: 'default' },
                  { value: '7', label: 'Складов класса А', variant: 'highlight' },
                  { value: '12k+', label: 'SKU в наличии', variant: 'highlightAlt' },
                  { value: '60+', label: 'Единиц транспорта', variant: 'default' },
                ]
            ).map((s, idx) => (
              <div
                key={idx}
                className={`stat-card ${
                  s.variant === 'highlight' ? 'highlight' : s.variant === 'highlightAlt' ? 'highlight-alt' : ''
                }`}
              >
                <div className="stat-number">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Warehouse Network */}
        <section className="warehouse-section">
          <div className="section-content">
            <div className="section-text">
              <h2>{cms?.warehouseSectionTitle || 'Складская сеть федерального масштаба'}</h2>
              {Array.isArray(cms?.warehouseSectionContent) &&
              (cms.warehouseSectionContent as unknown[]).length > 0 ? (
                <CmsBlocks content={cms.warehouseSectionContent} />
              ) : (
                <>
                  <p>
                    Склады класса А с полным запасом ассортимента расположены в ключевых городах России:
                    <strong> Москва, Санкт-Петербург, Казань, Воронеж, Екатеринбург, Краснодар, Пятигорск.</strong>
                  </p>
                  <p>
                    Общая площадь складских помещений компании превышает <span className="highlight-text">26 000 м²</span>,
                    а товарная матрица включает более 12 000 SKU. Благодаря этому мы поддерживаем высокую доступность
                    продукции и оперативно выполняем отгрузки в любой регион.
                  </p>
                  <p>
                    FIT использует собственный парк автотранспорта, что позволяет контролировать сроки и качество доставки
                    на каждом этапе.
                  </p>
                </>
              )}
            </div>
            <div className="section-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={warehouseImageUrl} alt="Логистика FIT" />
            </div>
          </div>
        </section>

        {/* New Distribution Center */}
        <section className="distribution-center">
          <div className="dc-badge">
            <span className="badge-new">{cms?.distributionBadgeNew || 'NEW'}</span>
            <span className="badge-text">{cms?.distributionBadgeText || 'Флагманский проект'}</span>
          </div>
          <h2>
            {cms?.distributionTitle || 'Новый распределительный центр'}
            <br />
            <span className="gradient-text">{cms?.distributionTitleHighlight || '«ПНК Белый Раст»'}</span>
          </h2>
          <p className="dc-description">
            {cms?.distributionDescription ||
              'В рамках развития компании FIT открыла новый современный складской комплекс класса А на базе ПНК «Белый Раст» (Рогачёвское шоссе, 27 км от МКАД). Запуск этой площадки позволил увеличить доступность ассортимента в Центральном регионе и значительно повысить скорость доставки.'}
          </p>

          <div className="dc-specs">
            {(cms?.distributionSpecs && cms.distributionSpecs.length > 0
              ? cms.distributionSpecs
              : [
                  { value: '23 061 м²', label: 'Площадь участка' },
                  { value: '11 391 м²', label: 'Площадь корпуса' },
                  { value: '12 м', label: 'Высота (6 уровней)' },
                  { value: '10 т/м²', label: 'Нагрузка на пол' },
                ]
            ).map((sp, idx) => (
              <div key={idx} className="spec-card">
                <div className="spec-value">{sp.value}</div>
                <div className="spec-label">{sp.label}</div>
              </div>
            ))}
          </div>

          <div className="dc-features">
            {(cms?.distributionFeatures && cms.distributionFeatures.length > 0
              ? cms.distributionFeatures.map((t) => t.text)
              : ['Пожаротушение ESFR 25', 'Энергоэффективный контур', 'Немецкие стандарты']
            ).map((t, idx) => (
              <div key={idx} className="feature-tag">
                {t}
              </div>
            ))}
          </div>

          <div className="dc-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={distributionImageUrl} alt="ПНК Белый Раст" />
          </div>
        </section>

        {/* WMS Section */}
        <section className="wms-section">
          <div className="wms-cards">
            {(cms?.wmsCards && cms.wmsCards.length > 0
              ? cms.wmsCards
              : [
                  {
                    icon: '📦',
                    iconVariant: 'green',
                    title: 'Новый логистический центр в Краснодаре',
                    text:
                      'Южный регион — один из самых динамичных рынков FIT. В 2025 году мы открыли новый крупный склад в Краснодаре, усилив логистическую инфраструктуру на юге России.',
                    tags: [{ text: 'Стратегическое развитие ЮФО' }],
                  },
                  {
                    icon: '⚙️',
                    iconVariant: 'yellow',
                    title: 'Технологичность и автоматизация (WMS)',
                    text:
                      'Все распределительные центры FIT работают на современной системе управления складом, что обеспечивает точность сборки, оперативность и минимизацию ошибок.',
                    tags: [{ text: 'Точность сборки' }, { text: 'Прозрачный контроль' }],
                  },
                ]
            ).map((c, idx) => (
              <div key={idx} className="wms-card">
                <div className={`wms-icon ${c.iconVariant === 'yellow' ? 'yellow' : 'green'}`}>{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                {(c.tags || []).length <= 1 ? (
                  c.tags && c.tags[0] ? <div className="tag">{c.tags[0].text}</div> : null
                ) : (
                  <div className="tags-row">
                    {(c.tags || []).map((t, i) => (
                      <div key={i} className="tag">
                        {t.text}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Speed Section */}
        <section className="speed-section">
          <h2>{cms?.speedTitle || 'Скорость, на которую можно опираться'}</h2>
          <p className="speed-description">
            {cms?.speedDescription ||
              'FIT доставляет товар быстро, регулярно и бесплатно. Для большинства партнёров поставки выполняются на следующий день.'}
          </p>

          <div className="warehouses-grid">
            {warehousesToRender.map((warehouse, index) => (
              <div key={index} className="warehouse-card">
                <div className="warehouse-image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={warehouse.imageUrl} alt={warehouse.city} />
                  <div className="warehouse-city-badge">{warehouse.city}</div>
                </div>
                <div className="warehouse-info">
                  <div className="warehouse-address">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    {warehouse.address}
                  </div>
                  <div className="warehouse-status">
                    <span className="status-dot"></span>
                    {warehouse.status || 'Работает'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="logistics-cta">
          <h2>{cms?.ctaTitle || '«Мы делаем всё, чтобы ваш бизнес работал без остановок»'}</h2>
          <p>
            {cms?.ctaText ||
              'Логистика FIT — это не просто транспортировка. Это комплексная система, которая объединяет мощности, технологии и людей.'}
          </p>
          <a href={ctaHref} className="cta-button">
            {cms?.ctaButtonText || 'Стать партнёром'}
          </a>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default LogisticsPage

