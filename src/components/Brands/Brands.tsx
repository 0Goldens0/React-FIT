import { useState, useEffect, useRef } from 'react'
import { getAssetPath } from '../../utils/paths'
import { scrollController } from '../../utils/scrollController'
import '../../assets/css/brand-journey.css'

interface Brand {
  id: string
  displayName: string
  description: string
  logo: string
  primaryColor: string
  parallaxBgColor: string
  parallaxFgColor: string
}

// Интерфейс для продукта
interface BrandProduct {
  name: string;
  article: string;
  image: string;
  price: string;
  category: string;
}

// Типизация объекта brandProducts
interface BrandProductsMap {
  [key: string]: BrandProduct[];
}

// Данные по брендам
const brandsData: Brand[] = [
  {
    id: 'fit',
    displayName: 'FIT',
    description: 'Появление торговой марки в 2003 году дало мощный импульс развитию компании и обеспечило устойчивый рост продаж. FIT – это оптимальное сочетание цены и качества. Наш ассортимент — это единая экосистема решений: от ручного и электроинструмента до оснастки, крепежа и систем хранения. Такой подход позволяет решать любые задачи — от масштабного строительства до точечного ремонта.',
    logo: getAssetPath('logo/fit-logo-clean.svg'),
    primaryColor: '#FDB913',
    parallaxBgColor: '#004A4E',
    parallaxFgColor: '#002F3A'
  },
  {
    id: 'kypc',
    displayName: 'КУРС',
    description: 'Разработан для занятия ниши среднего ценового сегмента.КУРС — практичные решения для повседневных задач. Ручные инструменты, оснастка и хозяйственные товары сочетают доступность и надежность, помогая справляться с ремонтом и обслуживанием дома.',
    logo: getAssetPath('logo/brands/Kurs-CMYK.svg'),
    primaryColor: '#D81515',
    parallaxBgColor: '#D81515',
    parallaxFgColor: '#FFFFFF'
  },
  {
    id: 'mos',
    displayName: 'MOS',
    description: 'Бренд закрывает потребности бизнеса в удовлетворении спроса на продукцию в низком ценовом сегменте. MOS — разумный выбор для дома и мастерской. Доступные ручные инструменты и хозяйственные товары решают базовые задачи, сохраняя достойное качество без переплат.',
    logo: getAssetPath('logo/brands/MOS-CMYK.svg'),
    primaryColor: '#00AEEF',
    parallaxBgColor: '#00AEEF',
    parallaxFgColor: '#FFFFFF'
  },
  {
    id: 'xbat',
    displayName: 'ХВАТ',
    description: 'Бренд с говорящим названием! ХВАТ - специализированный бренд, который фокусируется на узком сегменте рынка - крепёж и сопутствующие товары для бытового и профессионального применения. Прочные, устойчивые к нагрузкам и долговечные решения для надежной фиксации, крепления и энергоснабжения.',
    logo: getAssetPath('logo/brands/Xbat-CMYK.svg'),
    primaryColor: '#1A1A1A',
    parallaxBgColor: '#1A1A1A',
    parallaxFgColor: '#FFFFFF'
  },
  {
    id: 'greatflex',
    displayName: 'GREATFLEX',
    description: 'GREATFLEX — доступная и надежная оснастка для электроинструмента. Бренд предлагает готовые решения для домашних мастеров и профессионалов, обеспечивая оптимальное соотношение цены и качества. Продукция GREATFLEX гарантирует стабильную работу и безупречный результат при ежедневном использовании.',
    logo: getAssetPath('logo/brands/GreatFlex_logo-1.svg'),
    primaryColor: '#E40C0C',
    parallaxBgColor: '#E40C0C',
    parallaxFgColor: '#FFFFFF'
  },
  {
    id: 'cutop',
    displayName: 'CUTOP',
    description: 'Продукция бренда — профессиональная и промышленная оснастка для электроинструмента. Бренд использует самые передовые технологии производства и  предлагает готовые решения для работы с высокими нагрузками и сверхтвердыми материалами. Продукция CUTOP обеспечивает максимальную точность, увеличенный ресурс и безопасность при выполнении ответственных задач.',
    logo: getAssetPath('logo/brands/Cutop-CMYK.svg'),
    primaryColor: '#2A4998',
    parallaxBgColor: '#2A4998',
    parallaxFgColor: '#FFFFFF'
  },
  {
    id: 'mastercolor',
    displayName: 'MASTER COLOR',
    description: 'Master Color - профессиональный бренд товарной категории «малярно-штукатурный инструмент». Предлагает комплексные решения для профессиональной и бытовой отделки: от подготовки поверхностей до нанесения покрытий и защиты рабочей зоны. Каждый инструмент Master Color обеспечивает безупречный результат на всех этапах работ.',
    logo: getAssetPath('logo/brands/Master_Color_logo-1.svg'),
    primaryColor: '#0065A8',
    parallaxBgColor: '#0065A8',
    parallaxFgColor: '#FFFFFF'
  }
]

// Данные о продуктах брендов
const brandProducts: BrandProductsMap = {
  fit: [
    { name: "Дрель-Шуруповерт аккумуляторная", article: "79905", image: getAssetPath("img/fit/79905.png"), price: "3 828.00 ₽", category: "Электроинструмент" },
    { name: "Перфоратор монтажный аккумуляторный", article: "79910", image: getAssetPath("img/fit/79910.png"), price: "11 880.00 ₽", category: "Электроинструмент" },
    { name: "Шлифмашина угловая аккумуляторная", article: "79912", image: getAssetPath("img/fit/79912.png"), price: "6 220.00 ₽", category: "Электроинструмент" },
    { name: "Пила дисковая циркулярная", article: "79920", image: getAssetPath("img/fit/79920.png"), price: "7 425.00 ₽", category: "Электроинструмент" }
  ],
  kypc: [
    { name: "Тачка строительная КУРС", article: "77607", image: getAssetPath("img/kurs/77607.png"), price: "3 590 ₽", category: "Садовый инструмент" },
    { name: "Кисть ОПТИМА", article: "00811", image: getAssetPath("img/kurs/00811.png"), price: "2 790 ₽", category: "Отделочный инструмент" },
    { name: "Гвоздодер с изолированной ручкоЙ КУРС", article: "46913", image: getAssetPath("img/kurs/46913.png"), price: "4 190 ₽", category: "Столярный инструмент" },
    { name: "Киянка резиновая КУРС", article: "45390", image: getAssetPath("img/kurs/45390.png"), price: "3 290 ₽", category: "Столярный инструмент" }
  ],
  mos: [
    { name: "КИСТЬ ФЛЕЙЦЕВАЯ MOS", article: "00701", image: getAssetPath("img/mos/00701.png"), price: "1 990 ₽", category: "Отделочный инструмент" },
    { name: "РУЛЕТКА MOS ", article: "16983", image: getAssetPath("img/mos/16983.png"), price: "499 ₽", category: "Измерительный инструмент" },
    { name: "ДИСК ОТРЕЗНОЙ АЛМАЗНЫЙ MOS", article: "37201", image: getAssetPath("img/mos/37201.png"), price: "690 ₽", category: "Абразивно-шлифовальный инструмент" },
    { name: "КЛЮЧ РАЗВОДНОЙ MOS", article: "70091", image: getAssetPath("img/mos/70091.png"), price: "890 ₽", category: "Сантехнический инструмент" }
  ],
  xbat: [
    { name: "РЕМЕНЬ БАГАЖНЫЙ ХВАТ", article: "77-253", image: getAssetPath("img/xbat/77-253.png"), price: "149 ₽", category: "Инструмент автомобильный" },
    { name: "НАБОР КРЕПЕЖА УНИВЕРСАЛЬНЫЙ ХВАТ", article: "20000", image: getAssetPath("img/xbat/20000.png"), price: "189 ₽", category: "Крепеж и крепежный инструмент" },
    { name: "АНКЕРНЫЙ БОЛТ С ПОЛНЫМ КРЮКОМ ХВАТ", article: "26654", image: getAssetPath("img/xbat/26654.png"), price: "590 ₽", category: "Крепёж" },
    { name: "ГЕНЕРАТОР ДИЗЕЛЬНЫЙ ХВАТ", article: "KM7500DE", image: getAssetPath("img/xbat/KM7500DE.png"), price: "249 ₽", category: "Генератор" }
  ],
  greatflex: [
    { name: "ДИСКИ АЛМАЗНЫЕ GREATFLEX light", article: "55-771", image: getAssetPath("img/gf/55-771.png"), price: "1 290 ₽", category: "Абразивно-шлифовальный инструмент" },
    { name: "ДИСКИ АЛМАЗНЫЕ GREATFLEX light", article: "55-776", image: getAssetPath("img/gf/55-776.png"), price: "590 ₽", category: "Абразивно-шлифовальный инструмент" },
    { name: "ПРОФЕССИОНАЛЬНЫЙ ШЛИФОВАЛЬНЫЙ АЛМАЗНЫЙ ДИСК «СЕГМЕНТИРОВАННЫЙ ТУРБО»", article: "55-781", image: getAssetPath("img/gf/55-781.png"), price: "290 ₽", category: "Абразивно-шлифовальный инструмент" },
    { name: "КРУГ НАЖДАЧНЫЙ ЛЕПЕСТКОВЫЙ GREATFLEX light", article: "71-837", image: getAssetPath("img/gf/71-837.png"), price: "1 490 ₽", category: "Абразивно-шлифовальный инструмент" }
  ],
  cutop: [
    { name: "ШУРУПОВЕРТ CUTOP e-profi", article: "01-884", image: getAssetPath("img/cutop/01-884.png"), price: "190 ₽", category: "Электроинструмент" },
    { name: "РОФЕССИОНАЛЬНЫЙ ОТРЕЗНОЙ АЛМАЗНЫЙ ДИСК CUTOP", article: "73-419", image: getAssetPath("img/cutop/73-419-02 (2).png"), price: "210 ₽", category: "Абразивно-шлифовальный инструмент" },
    { name: "КОРЩЕТКИ РУЧНЫЕ CUTOP profi", article: "82-547", image: getAssetPath("img/cutop/82-547.png"), price: "990 ₽", category: "Абразивно-шлифовальный инструмент" },
    { name: "НАБОР БИТ В ПЛАСТИКОВОМ БОКСЕ CUTOP profi", article: "83-869", image: getAssetPath("img/cutop/83-869.png"), price: "1 590 ₽", category: "Слесарный инструмент" }
  ],
  mastercolor: [
    { name: "КИСТЬ ФЛЕЙЦЕВАЯ Master Color 25 мм", article: "30-0011", image: getAssetPath("img/mc/30-0011.png"), price: "250 ₽", category: "Отделочный инструмент" },
    { name: "РОЛИК Master Color 180мм", article: "30-0844", image: getAssetPath("img/mc/30-0844.png"), price: "390 ₽", category: "Отделочный инструмент" },
    { name: "МАЛЯРНАЯ ЛЕНТА Master Color", article: "30-6412", image: getAssetPath("img/mc/30-6412.png"), price: "290 ₽", category: "Отделочный инструмент" },
    { name: "ПРОФЕССИОНАЛЬНАЯ РАБОЧАЯ ОДЕЖДА Master Color", article: "30-8042", image: getAssetPath("img/mc/30-8042.png"), price: "990 ₽", category: "Отделочный инструмент" }
  ]
};

const Brands = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  // Слушаем события от ScrollController
  useEffect(() => {
    const handleBrandScrollUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ index: number }>;
      setCurrentIndex(customEvent.detail.index);
    };

    window.addEventListener('brandScrollUpdate', handleBrandScrollUpdate);

    return () => {
      window.removeEventListener('brandScrollUpdate', handleBrandScrollUpdate);
    };
  }, [])

  const handleDotClick = (index: number) => {
    if (index === currentIndex) return
    setCurrentIndex(index)
    
    // Отправляем событие для синхронизации с ScrollController
    const event = new CustomEvent('brandScrollUpdate', {
      detail: { index }
    });
    window.dispatchEvent(event);
  }

  // Навигация к секции "О компании"
  const navigateToAbout = () => {
    scrollController.scrollToSection(1, true) // About - индекс 1
  }

  // Навигация к секции "История"
  const navigateToTimeline = () => {
    scrollController.scrollToSection(3, true) // Timeline - индекс 3
  }

  return (
    <section 
      className="brands" 
      id="brands"
      ref={sectionRef}
    >
      <div 
        className="brand-journey-container" 
        ref={containerRef}
        style={{ transform: `translateX(-${currentIndex * 100}vw)` }}
      >
        {brandsData.map((brand, index) => (
          <section 
            key={brand.id} 
            className={`brand-section ${index === currentIndex ? 'active' : ''}`}
            id={`brand-${brand.id}`}
          >
            <div className="parallax-bg" style={{ 
              backgroundImage: `url('https://placehold.co/1920x1080/${brand.parallaxBgColor.substring(1)}/${brand.parallaxFgColor.substring(1)}?text=${brand.displayName}&font=Inter')` 
            }}></div>
            
            <div className="brand-content">
              <div className="brand-logo-journey">
                <img src={brand.logo} alt={`Логотип ${brand.id}`} />
              </div>
              <p className="brand-description">{brand.description}</p>
            </div>
            
            <div className="journey-brand-products">
              {brandProducts[brand.id]?.slice(0, 4).map((product: BrandProduct) => (
                <div key={product.article} className="journey-product-card product-card-slider-item">
                  <div className="journey-product-card-image-container">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-info-container">
                    <div className="product-category">{product.category}</div>
                    <h4 className="product-name" style={{ textTransform: 'none' }}>{product.name}</h4>
                    <div className="product-article">Артикул: {product.article}</div>
                    <button className="product-detail-btn" style={{ backgroundColor: brand.primaryColor }}>Подробнее</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
      
      <div className="navigation-dots">
        {brandsData.map((brand, index) => (
          <button
            key={brand.id}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Перейти к бренду ${brand.id}`}
            style={{ 
              borderColor: index === currentIndex ? brand.primaryColor : 'rgba(255, 255, 255, 0.3)',
              background: index === currentIndex ? brand.primaryColor : 'rgba(255, 255, 255, 0.2)'
            }}
          />
        ))}
      </div>
      
      <div className="scroll-indicator">
        <span>Прокручивайте</span>
        <svg viewBox="0 0 24 24">
          <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
          <path d="M0 0h24v24H0z" fill="none"></path>
        </svg>
        <span>или используйте навигацию</span>
      </div>

      {/* Стрелки навигации между секциями */}
      <button 
        className="section-nav-arrow arrow-up"
        onClick={navigateToAbout}
        aria-label="К разделу О компании"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 15l7-7 7 7" />
        </svg>
      </button>
      
      <button 
        className="section-nav-arrow arrow-down"
        onClick={navigateToTimeline}
        aria-label="К разделу История"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 9l7 7 7-7" />
        </svg>
      </button>
    </section>
  )
}

export default Brands