'use client'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

const brandData: Record<string, { 
  name: string
  color: string
  description: string
  features: string[]
}> = {
  fit: {
    name: 'FIT',
    color: '#FDB913',
    description: 'Появление торговой марки в 2003 году дало мощный импульс развитию компании и обеспечило устойчивый рост продаж. FIT – это оптимальное сочетание цены и качества.',
    features: ['Ручной инструмент', 'Электроинструмент', 'Оснастка', 'Системы хранения']
  },
  cutop: {
    name: 'CUTOP',
    color: '#2A4998',
    description: 'Продукция бренда — профессиональная и промышленная оснастка для электроинструмента.',
    features: ['Высокие нагрузки', 'Сверхтвердые материалы', 'Максимальная точность', 'Безопасность']
  },
  mos: {
    name: 'MOS',
    color: '#00AEEF',
    description: 'MOS — разумный выбор для дома и мастерской. Доступные ручные инструменты и хозяйственные товары.',
    features: ['Низкий ценовой сегмент', 'Базовый функционал', 'Достойное качество', 'Без переплат']
  },
  mastercolor: {
    name: 'Master Color',
    color: '#0065A8',
    description: 'Профессиональный бренд товарной категории «малярно-штукатурный инструмент».',
    features: ['Подготовка поверхностей', 'Нанесение покрытий', 'Защита рабочей зоны', 'Профессиональные решения']
  },
  kypc: {
    name: 'КУРС',
    color: '#D81515',
    description: 'КУРС — практичные решения для повседневных задач. Средний ценовой сегмент.',
    features: ['Ручные инструменты', 'Оснастка', 'Хозяйственные товары', 'Доступность и надежность']
  },
  xbat: {
    name: 'ХВАТ',
    color: '#1A1A1A',
    description: 'Специализированный бренд крепежа и сопутствующих товаров для бытового и профессионального применения.',
    features: ['Крепеж', 'Прочность', 'Устойчивость к нагрузкам', 'Долговечность']
  }
}

type BrandPageProps = {
  brandId: string
}

export default function BrandPage({ brandId }: BrandPageProps) {
  const brand = brandData[brandId] ?? null

  if (!brand) {
    return (
      <div className="brand-page">
        <Header />
        <div className="brand-not-found">
          <h1>Бренд не найден</h1>
          <p>Запрашиваемый бренд не существует</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="brand-page">
      <Header />
      
      <main className="brand-content">
        <div 
          className="brand-hero"
          style={{ 
            background: `linear-gradient(135deg, ${brand.color}15 0%, ${brand.color}05 100%)`,
            borderColor: brand.color
          }}
        >
          <h1 
            className="brand-title"
            style={{ color: brand.color }}
          >
            {brand.name}
          </h1>
          <p className="brand-description">{brand.description}</p>
        </div>

        <section className="brand-features">
          <h2>Особенности бренда</h2>
          <div className="features-grid">
            {brand.features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-card"
                style={{ borderColor: `${brand.color}40` }}
              >
                <div 
                  className="feature-icon"
                  style={{ background: `${brand.color}20` }}
                >
                  ✓
                </div>
                <h3>{feature}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="brand-cta">
          <h2>Узнать больше о продукции {brand.name}</h2>
          <div className="cta-buttons">
            <a 
              href="https://fit-emarket.ru" 
              target="_blank" 
              rel="noopener noreferrer"
              className="cta-button"
              style={{ background: brand.color }}
            >
              Каталог для физ. лиц
            </a>
            <a 
              href="https://fit24.ru" 
              target="_blank" 
              rel="noopener noreferrer"
              className="cta-button"
              style={{ background: brand.color }}
            >
              Каталог для юр. лиц
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

