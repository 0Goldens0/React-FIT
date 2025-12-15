'use client'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

const LogisticsPage = () => {
  const warehouses = [
    {
      city: 'Москва (ПНК Белый Раст)',
      address: 'Рогачёвское шоссе, 27 км от МКАД',
      status: 'Работает',
      image: '/img/timeline/placeholder-warehouse.svg'
    },
    {
      city: 'Санкт-Петербург',
      address: 'пр. Обуховской Обороны, 120',
      status: 'Работает',
      image: '/img/timeline/placeholder-warehouse.svg'
    },
    {
      city: 'Екатеринбург',
      address: 'Сибирский тракт, 12',
      status: 'Работает',
      image: '/img/timeline/placeholder-warehouse.svg'
    },
    {
      city: 'Казань',
      address: 'ул. Тихорецкая, 7',
      status: 'Работает',
      image: '/img/timeline/placeholder-warehouse.svg'
    },
    {
      city: 'Воронеж',
      address: 'ул. Димитрова, 148',
      status: 'Работает',
      image: '/img/timeline/placeholder-warehouse.svg'
    },
    {
      city: 'Краснодар',
      address: 'Уральская улица, 126',
      status: 'Работает',
      image: '/img/timeline/placeholder-warehouse.svg'
    },
    {
      city: 'Пятигорск',
      address: 'Черкесское шоссе, 25',
      status: 'Работает',
      image: '/img/timeline/placeholder-warehouse.svg'
    }
  ]

  return (
    <div className="logistics-page">
      <Header />
      
      <main className="logistics-content">
        {/* Hero Section */}
        <section className="logistics-hero">
          <div className="logistics-badge">ЛОГИСТИКА FIT</div>
          <h1 className="logistics-title">
            Система, которая<br />
            <span className="gradient-text">работает для вас</span>
          </h1>
          <p className="logistics-subtitle">
            Логистика FIT — это отлаженная система поставок, которую мы совершенствуем много лет. 
            Мы доставляем инструмент быстро, надежно и предсказуемо, обеспечивая партнёрам бесперебойную работу.
          </p>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">2</div>
              <div className="stat-label">Распределительных центра</div>
            </div>
            <div className="stat-card highlight">
              <div className="stat-number">7</div>
              <div className="stat-label">Складов класса А</div>
            </div>
            <div className="stat-card highlight-alt">
              <div className="stat-number">12k+</div>
              <div className="stat-label">SKU в наличии</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">60+</div>
              <div className="stat-label">Единиц транспорта</div>
            </div>
          </div>
        </section>

        {/* Warehouse Network */}
        <section className="warehouse-section">
          <div className="section-content">
            <div className="section-text">
              <h2>Складская сеть федерального масштаба</h2>
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
                FIT использует собственный парк автотранспорта, что позволяет контролировать сроки и качество 
                доставки на каждом этапе.
              </p>
            </div>
            <div className="section-image">
              <img src="/img/timeline/placeholder-port.svg" alt="Логистика FIT" />
            </div>
          </div>
        </section>

        {/* New Distribution Center */}
        <section className="distribution-center">
          <div className="dc-badge">
            <span className="badge-new">NEW</span>
            <span className="badge-text">Флагманский проект</span>
          </div>
          <h2>
            Новый распределительный центр<br />
            <span className="gradient-text">«ПНК Белый Раст»</span>
          </h2>
          <p className="dc-description">
            В рамках развития компании FIT открыла новый современный складской комплекс класса А на базе 
            ПНК «Белый Раст» (Рогачёвское шоссе, 27 км от МКАД). Запуск этой площадки позволил увеличить 
            доступность ассортимента в Центральном регионе и значительно повысить скорость доставки.
          </p>

          <div className="dc-specs">
            <div className="spec-card">
              <div className="spec-value">23 061 м²</div>
              <div className="spec-label">Площадь участка</div>
            </div>
            <div className="spec-card">
              <div className="spec-value">11 391 м²</div>
              <div className="spec-label">Площадь корпуса</div>
            </div>
            <div className="spec-card">
              <div className="spec-value">12 м</div>
              <div className="spec-label">Высота (6 уровней)</div>
            </div>
            <div className="spec-card">
              <div className="spec-value">10 т/м²</div>
              <div className="spec-label">Нагрузка на пол</div>
            </div>
          </div>

          <div className="dc-features">
            <div className="feature-tag">Пожаротушение ESFR 25</div>
            <div className="feature-tag">Энергоэффективный контур</div>
            <div className="feature-tag">Немецкие стандарты</div>
          </div>

          <div className="dc-image">
            <img
              src="/img/timeline/placeholder-warehouse-interior.svg"
              alt="ПНК Белый Раст"
            />
          </div>
        </section>

        {/* WMS Section */}
        <section className="wms-section">
          <div className="wms-cards">
            <div className="wms-card">
              <div className="wms-icon green">📦</div>
              <h3>Новый логистический центр в Краснодаре</h3>
              <p>
                Южный регион — один из самых динамичных рынков FIT. В 2025 году мы открыли новый крупный 
                склад в Краснодаре, усилив логистическую инфраструктуру на юге России.
              </p>
              <div className="tag">Стратегическое развитие ЮФО</div>
            </div>

            <div className="wms-card">
              <div className="wms-icon yellow">⚙️</div>
              <h3>Технологичность и автоматизация (WMS)</h3>
              <p>
                Все распределительные центры FIT работают на современной системе управления складом, 
                что обеспечивает точность сборки, оперативность и минимизацию ошибок.
              </p>
              <div className="tags-row">
                <div className="tag">Точность сборки</div>
                <div className="tag">Прозрачный контроль</div>
              </div>
            </div>
          </div>
        </section>

        {/* Speed Section */}
        <section className="speed-section">
          <h2>Скорость, на которую можно опираться</h2>
          <p className="speed-description">
            FIT доставляет товар быстро, регулярно и бесплатно. Для большинства партнёров 
            поставки выполняются на следующий день.
          </p>

          <div className="warehouses-grid">
            {warehouses.map((warehouse, index) => (
              <div key={index} className="warehouse-card">
                <div className="warehouse-image">
                  <img src={warehouse.image} alt={warehouse.city} />
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
                    {warehouse.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="logistics-cta">
          <h2>«Мы делаем всё, чтобы ваш бизнес работал без остановок»</h2>
          <p>
            Логистика FIT — это не просто транспортировка. Это комплексная система, которая объединяет 
            мощности, технологии и людей.
          </p>
          <a href="/contacts" className="cta-button">
            Стать партнёром
          </a>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default LogisticsPage

