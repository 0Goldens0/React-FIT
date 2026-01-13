'use client'

import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { CmsBlocks } from '../components/CmsBlocks/CmsBlocks'
import { cmsAssetUrl, extractMediaUrl, fetchCmsHonestSignPage, CmsHonestSignPage } from '../utils/cms'

const HonestSignPage = () => {
  const [page, setPage] = useState<CmsHonestSignPage | null>(null)

  useEffect(() => {
    let cancelled = false
    fetchCmsHonestSignPage()
      .then((res) => {
        if (!res) return
        if (!cancelled) setPage(res)
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])

  const extractUrl = (media: unknown) => {
    return extractMediaUrl(media)
  }

  // --- FALLBACKS ---
  const title = page?.title || 'Честный знак, упаковка, визуальный контроль качества'
  const subtitle = page?.subtitle || 'В FIT мы уделяем особое внимание тому, как выглядит наш продукт и как он представлен покупателю. Визуальная составляющая — не просто элемент узнаваемости, а важная часть доверия к бренду, инструменту и компании. Каждый товар проходит единый цикл визуального контроля: от разработки упаковки до маркировки и финальной проверки на складе.'
  const heroBadge = page?.heroBadge || 'КАЧЕСТВО И КОНТРОЛЬ'
  const heroUrl = extractUrl(page?.heroImage)

  const identityTitle = page?.identityTitle || 'Единая фирменная айдентика'
  const identityContent = page?.identityContent
  const identityUrl = extractUrl(page?.identityImage)

  const packagingTitle = page?.packagingTitle || 'Продуманная фирменная упаковка'
  const packagingIntro = page?.packagingIntro || 'Упаковка — часть продукта. Мы разрабатываем ее так, чтобы она одновременно решала три задачи:'
  const packagingCards = page?.packagingCards || [
    {
      title: 'Информирование',
      text: 'На упаковке размещены фотографии товара, основные характеристики, область применения и преимущества. Это помогает покупателю быстро ориентироваться и принимать решение.',
      icon: '1',
      iconVariant: 'yellow',
    },
    {
      title: 'Защита товара',
      text: 'Коробки и блистеры разработаны с учетом особенностей хранения и транспортировки. Упаковочные материалы выдерживают повышенные нагрузки, чтобы инструмент сохранял внешний вид и геометрию до момента продажи.',
      icon: '2',
      iconVariant: 'yellow',
    },
    {
      title: 'Презентация на полке',
      text: 'Упаковка создается с учетом поведения покупателей в ритейле и e-com: контрастная цветовая система, удобная навигация по сериям, понятное позиционирование товара в линейке.',
      icon: '3',
      iconVariant: 'yellow',
    }
  ]
  const packagingBrandsNote = page?.packagingBrandsNote || 'Каждый бренд — FIT, CUTOP, GREATFLEX, КУРС, MOS, Master Color и др. — имеет свою визуальную идентичность, но подчиняется общим принципам качества и понятности.'
  const packagingUrl = extractUrl(page?.packagingImage)

  const honestSignTitle = page?.honestSignTitle || 'Маркировка «Честный ЗНАК»'
  const honestSignContent = page?.honestSignContent || 'Все товары, подлежащие обязательной маркировке, проходят процесс идентификации в системе «Честный ЗНАК».'
  const honestSignListIntro = page?.honestSignListIntro || 'Маркировка обеспечивает:'
  const honestSignBenefits = page?.honestSignBenefits || [
    { text: 'прозрачность движения товара от производства до розницы;' },
    { text: 'защиту покупателя от подделок;' },
    { text: 'уверенность партнера в легальности и корректности оборота товара.' },
  ]
  const honestSignClosing = page?.honestSignClosing || 'Каждая единица продукции получает уникальный DataMatrix-код — он наносится на упаковку в соответствии с нормами закона и требованиями системы. Контроль маркировки проводится на этапе отгрузки со склада.'
  const honestSignUrl = extractUrl(page?.honestSignImage)

  const visualMaterialsTitle = page?.visualMaterialsTitle || 'Достоверные визуальные материалы'
  const visualMaterialsIntro = page?.visualMaterialsIntro || 'Для сайта, маркетплейсов и партнёров мы создаём полный набор визуальных материалов:'
  const visualMaterialsItems = page?.visualMaterialsItems || [
    { text: 'предметные фото, сделанные по единому техническому заданию;' },
    { text: '360-градусные обзоры для e-commerce;' },
    { text: 'рендеры и инфографику для сложных товаров;' },
    { text: 'изображения упаковки;' },
    { text: 'фотографии ассортимента и серийного исполнения.' },
  ]
  const visualMaterialsClosing = page?.visualMaterialsClosing || 'Все изображения проходят постобработку, цветокоррекцию и визуальное сравнение с физическим образцом — чтобы клиент видел именно то, что получит.'
  const gallery = page?.visualMaterialsGallery?.data || []

  const finalTitle = page?.finalTitle || 'Прозрачность и доверие'
  const finalText = page?.finalText || 'Визуальная часть — важный элемент нашего принципа открытости. Покупатель получает полную и достоверную информацию о товаре, а партнер — уверенность в том, что продукт выглядит профессионально и соответствует единым стандартам бренда.'

  return (
    <div className="info-page hs-page">
      <Header />
      <main className="info-content">
        {/* --- HERO SECTION --- */}
        <section className="hs-hero">
          <div className="hs-hero-content">
            <span className="hs-badge">{heroBadge}</span>
            <h1>{title}</h1>
            <p className="hs-hero-subtitle">{subtitle}</p>
          </div>
          {heroUrl ? (
            <div className="hs-image hero-image">
              <img src={heroUrl} alt={title} />
            </div>
          ) : (
            <div className="hs-image-placeholder hero-image">
              <span>ФОТО: ВИТРИНА С ИНСТРУМЕНТОМ В МАГАЗИНЕ</span>
            </div>
          )}
        </section>

        {/* --- IDENTITY SECTION --- */}
        <section className="hs-section hs-split">
          <div className="hs-split-text">
            <h2 className="hs-section-title">{identityTitle}</h2>
            {identityContent ? (
              <CmsBlocks content={identityContent} />
            ) : (
              <>
                <p>Вся продукция FIT и брендов портфеля компании оформляется в соответствии с корпоративным стилем, описанным в маркетинговом руководстве: узнаваемая цветовая палитра, строгая система композиции, четкие правила использования логотипов и шрифтов.</p>
                <p>Благодаря этому покупатель легко находит нужный товар на полке, а партнеры получают продукцию с единым визуальным стандартом.</p>
              </>
            )}
          </div>
          {identityUrl ? (
            <div className="hs-image split-image">
              <img src={identityUrl} alt={identityTitle} />
            </div>
          ) : (
            <div className="hs-image-placeholder split-image">
              <span>ПРИМЕРЫ АЙДЕНТИКИ (БРЕНДБУК)</span>
            </div>
          )}
        </section>

        {/* --- PACKAGING GRID --- */}
        <section className="hs-section">
          <h2 className="hs-section-title centered">{packagingTitle}</h2>
          <p className="centered-text mb-40">{packagingIntro}</p>
          <div className="hs-grid hs-packaging-grid">
            {packagingCards.map((card, idx) => (
              <div key={idx} className="hs-card">
                <div className={`hs-card-icon ${card.iconVariant || ''}`}>{card.icon || (idx + 1)}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            ))}
          </div>
          <p className="centered-text mt-40 hs-brands-text">{packagingBrandsNote}</p>
          {packagingUrl ? (
            <div className="hs-image wide-image mt-40">
              <img src={packagingUrl} alt={packagingTitle} />
            </div>
          ) : (
            <div className="hs-image-placeholder wide-image mt-40">
              <span>РЕНДЕР: РАЗВЕРТКА УПАКОВКИ И ГОТОВАЯ КОРОБКА</span>
            </div>
          )}
        </section>

        {/* --- HONEST SIGN ROW --- */}
        <section className="hs-section hs-dark-block">
          <div className="hs-dark-content">
            <h2 className="hs-section-title">{honestSignTitle}</h2>
            <p>{honestSignContent}</p>
            <p className="hs-list-intro mt-20">{honestSignListIntro}</p>
            <div className="hs-benefits">
              {honestSignBenefits.map((b, idx) => (
                <div key={idx} className="hs-benefit-item">
                  <div className="hs-dot"></div>
                  <span>{b.text}</span>
                </div>
              ))}
            </div>
            <p className="mt-40">{honestSignClosing}</p>
          </div>
          {honestSignUrl ? (
            <div className="hs-image qr-image">
              <img src={honestSignUrl} alt={honestSignTitle} />
            </div>
          ) : (
            <div className="hs-image-placeholder qr-image">
              <span>ФОТО: СКАНЕР И DATAMATRIX НА УПАКОВКЕ</span>
            </div>
          )}
        </section>

        {/* --- VISUAL MATERIALS --- */}
        <section className="hs-section">
          <h2 className="hs-section-title">{visualMaterialsTitle}</h2>
          <p className="mb-20">{visualMaterialsIntro}</p>
          <div className="hs-materials-list mb-40">
            {visualMaterialsItems.map((item, idx) => (
              <div key={idx} className="hs-benefit-item">
                <div className="hs-dot"></div>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
          <p>{visualMaterialsClosing}</p>
          
          <div className="hs-gallery mt-40">
            {gallery.length > 0 ? (
              gallery.map((img, idx) => (
                <div key={idx} className="hs-image gallery-item">
                  <img src={cmsAssetUrl(img.attributes.url)} alt="" />
                </div>
              ))
            ) : (
              <>
                <div className="hs-image-placeholder gallery-item"><span>ПРЕДМЕТНОЕ ФОТО</span></div>
                <div className="hs-image-placeholder gallery-item"><span>360° ОБЗОР</span></div>
                <div className="hs-image-placeholder gallery-item"><span>ИНФОГРАФИКА</span></div>
                <div className="hs-image-placeholder gallery-item"><span>ФОТО СЕРИИ</span></div>
              </>
            )}
          </div>
        </section>

        {/* --- FINAL SECTION --- */}
        <section className="hs-section hs-final">
          <div className="hs-final-card">
            <h2 className="hs-section-title">{finalTitle}</h2>
            <p>{finalText}</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default HonestSignPage
