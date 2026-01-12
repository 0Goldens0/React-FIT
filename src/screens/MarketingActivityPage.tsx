'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { CmsBlocks } from '../components/CmsBlocks/CmsBlocks'
import { extractMediaUrl, fetchCmsMarketingActivityPage, type CmsMarketingActivityPage } from '../utils/cms'

const PdfMagazine = dynamic(
  () => import('../components/PdfMagazine/PdfMagazine').then((m) => m.PdfMagazine),
  {
    ssr: false,
    loading: () => <div style={{ padding: 16, color: 'rgba(255,255,255,0.75)' }}>Загрузка журнала…</div>,
  },
)

type FallbackSection = {
  title: string
  content: any
  layout: 'textLeft' | 'textRight'
}

export default function MarketingActivityPage() {
  const [page, setPage] = useState<CmsMarketingActivityPage | null>(null)
  const mainRef = useRef<HTMLElement | null>(null)

  const [activeTab, setActiveTab] = useState<'activity' | 'magazine'>('activity')

  const fallback = useMemo(() => {
    const makeP = (text: string) => ({ type: 'paragraph', children: [{ type: 'text', text }] })
    const makeUl = (items: string[]) => ({
      type: 'list',
      format: 'unordered',
      children: items.map((t) => ({ type: 'list-item', children: [{ type: 'text', text: t }] })),
    })

    const sections: FallbackSection[] = [
      {
        title: 'Материалы для продаж',
        layout: 'textLeft',
        content: [
          makeP('Готовим материалы, которые помогают партнёрам продавать быстрее: POSM, баннеры, карточки товара, презентации и инструкции.'),
          makeUl(['POS-материалы для торгового зала', 'Шаблоны для e-commerce', 'Презентации и гайды для менеджеров']),
        ],
      },
      {
        title: 'Промо и акции',
        layout: 'textRight',
        content: [
          makeP('Планируем и поддерживаем промо-активности: сезонные предложения, новинки, спецусловия и механики для роста продаж.'),
          makeUl(['Сезонные кампании', 'Акции под товарные категории', 'Поддержка запуска новинок']),
        ],
      },
      {
        title: 'Мерчандайзинг и выкладка',
        layout: 'textLeft',
        content: [
          makeP('Помогаем с оформлением и выкладкой: стенды, навигация, рекомендации по полке и визуальные стандарты.'),
          makeUl(['Рекомендации по выкладке', 'Готовые стенды/оборудование', 'Единые стандарты визуала']),
        ],
      },
    ]

    return {
      heroTitle: 'Маркетинговая активность',
      heroSubtitle: [
        makeP(
          'FIT помогает партнёрам усиливать продажи: мы делаем маркетинговые материалы, запускаем промо и поддерживаем представленность брендов в офлайне и онлайне.'
        ),
      ],
      sections,
      ctaTitle: 'Нужна поддержка по маркетингу?',
      ctaText: [makeP('Напишите нам — предложим инструменты продвижения и материалы под вашу задачу.')],
      ctaButtonText: 'Связаться с нами',
      ctaButtonUrl: '/contacts',
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    fetchCmsMarketingActivityPage()
      .then((res) => {
        if (!cancelled) setPage(res)
      })
      .catch(() => {
        // keep fallback
      })
    return () => {
      cancelled = true
    }
  }, [])

  // Tabs: support deep-linking via ?tab=magazine
  useEffect(() => {
    try {
      const sp = new URLSearchParams(window.location.search)
      const tab = sp.get('tab')
      if (tab === 'magazine') setActiveTab('magazine')
    } catch {
      // ignore
    }
  }, [])

  const setTab = (tab: 'activity' | 'magazine') => {
    setActiveTab(tab)
    try {
      const url = new URL(window.location.href)
      if (tab === 'magazine') url.searchParams.set('tab', 'magazine')
      else url.searchParams.delete('tab')
      window.history.replaceState({}, '', url.toString())
      // keep UX tight: bring content into view after tab switch
      mainRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } catch {
      // ignore
    }
  }

  // Use `title` as primary because it's the required field editors naturally change first.
  // `heroTitle` can be used as an optional override.
  const title = page?.title || page?.heroTitle || fallback.heroTitle
  const subtitle = page?.heroSubtitle || fallback.heroSubtitle

  const sections = useMemo(() => {
    const cmsSections = Array.isArray(page?.sections) ? page!.sections : []
    if (cmsSections.length > 0) {
      return cmsSections
        .slice()
        .sort((a: any, b: any) => (Number(a.order ?? 0) || 0) - (Number(b.order ?? 0) || 0))
        .map((s: any) => ({
          title: s.title,
          content: s.content,
          layout: (s.layout === 'textRight' ? 'textRight' : 'textLeft') as 'textLeft' | 'textRight',
          imageUrl: extractMediaUrl(s.image) || null,
        }))
    }
          return fallback.sections.map((s) => ({
      title: s.title,
      content: s.content,
      layout: s.layout,
      imageUrl: null,
    }))
  }, [fallback.sections, page])

  const ctaTitle = page?.ctaTitle || fallback.ctaTitle
  const ctaText = page?.ctaText || fallback.ctaText
  const ctaButtonText = page?.ctaButtonText || fallback.ctaButtonText
  const ctaButtonUrl = page?.ctaButtonUrl || fallback.ctaButtonUrl

  const magazineTitle = page?.magazineTitle || 'Журнал новинок'
  const magazinePdfUrl = extractMediaUrl(page?.magazinePdf) || '/pdfs/new-products/latest.pdf'

  return (
    <div className="info-page ma-page">
      <Header />
      <main ref={mainRef} className="info-content">
        <div className="info-header">
          <h1>{title}</h1>
          <div className="ma-hero-subtitle">
            <CmsBlocks content={subtitle} />
          </div>
        </div>

        <div className="ma-tabs" role="tablist" aria-label="Разделы страницы">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'activity'}
            className={`ma-tab ${activeTab === 'activity' ? 'is-active' : ''}`}
            onClick={() => setTab('activity')}
          >
            Маркетинговая активность
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'magazine'}
            className={`ma-tab ${activeTab === 'magazine' ? 'is-active' : ''}`}
            onClick={() => setTab('magazine')}
          >
            Журнал новинок
          </button>
        </div>

        {activeTab === 'activity' && (
          <>
            <div className="ma-sections">
              {sections.map((s, idx) => {
                const isRight = s.layout === 'textRight'
                return (
                  <section key={`${s.title}-${idx}`} className={`ma-section ${isRight ? 'right' : 'left'}`}>
                    <div className="ma-section-text">
                      <h2 className="ma-section-title">{s.title}</h2>
                      <CmsBlocks content={s.content} />
                    </div>
                    <div className="ma-section-media" aria-hidden="true">
                      {s.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={s.imageUrl} alt="" className="ma-section-image" loading="lazy" />
                      ) : (
                        <div className="ma-image-placeholder">Изображение</div>
                      )}
                    </div>
                  </section>
                )
              })}
            </div>

            <section className="ma-cta">
              <div className="ma-cta-card">
                <h2 className="ma-cta-title">{ctaTitle}</h2>
                <div className="ma-cta-text">
                  <CmsBlocks content={ctaText} />
                </div>
                <a href={ctaButtonUrl} className="ma-cta-button">
                  {ctaButtonText}
                </a>
              </div>
            </section>
          </>
        )}

        {activeTab === 'magazine' && (
          <section className="ma-magazine" role="tabpanel">
            <div className="ma-magazine-header">
              <h2 className="ma-magazine-title">Журнал новинок</h2>
              <p className="ma-magazine-subtitle">Ежемесячный выпуск. Листай прямо на сайте или скачай PDF.</p>
            </div>
            <PdfMagazine src={magazinePdfUrl} title={magazineTitle} initialPage={1} />
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}


