import { useEffect, useMemo, useState } from 'react'

type BrandCategoriesApiResponse = {
  brandId: string
  brandKey: string | null
  catalogCategories?: Array<{
    title: string
    subcategories: Array<{
      title: string
      url?: string | null
      types: Array<{ title: string; url?: string | null }>
    }>
  }>
}

export type BrandCategoriesCatalogProps = {
  brandId: string
  brandDisplayName: string
  brandPrimaryColor: string
  /** Compact inline mode for brand page hero (small windows + internal scroll). */
  compact?: boolean
}

function hexToRgbTriplet(hex: string): string | null {
  const raw = hex.trim().replace(/^#/, '')
  const full =
    raw.length === 3 ? raw.split('').map((c) => c + c).join('') : raw.length === 6 ? raw : null
  if (!full) return null
  const r = parseInt(full.slice(0, 2), 16)
  const g = parseInt(full.slice(2, 4), 16)
  const b = parseInt(full.slice(4, 6), 16)
  if ([r, g, b].some((n) => Number.isNaN(n))) return null
  return `${r} ${g} ${b}`
}

function pluralRu(n: number, one: string, few: string, many: string) {
  if (n % 10 === 1 && n % 100 !== 11) return one
  if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) return few
  return many
}

export function BrandCategoriesCatalog({
  brandId,
  brandDisplayName,
  brandPrimaryColor,
  compact = false,
}: BrandCategoriesCatalogProps) {
  const [data, setData] = useState<BrandCategoriesApiResponse | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    setData(null)
    setSelectedCategory(null)
    setSelectedSubcategory(null)

    // Next app routes redirect to trailing slash (308). Avoid extra hop.
    const previewQs = (() => {
      if (typeof window === 'undefined') return ''
      const sp = new URLSearchParams(window.location.search)
      const status = sp.get('status')
      const preview = sp.get('preview')
      const documentId = sp.get('documentId')
      const qs = new URLSearchParams()
      if (status) qs.set('status', status)
      if (preview) qs.set('preview', preview)
      if (documentId) qs.set('documentId', documentId)
      return qs.toString()
    })()

    const url = `/api/brand-categories/?brandId=${encodeURIComponent(brandId)}${previewQs ? `&${previewQs}` : ''}`
    fetch(url, { headers: { Accept: 'application/json' }, cache: 'no-store' })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return (await res.json()) as BrandCategoriesApiResponse
      })
      .then((json) => {
        if (cancelled) return
        setData(json)
        setStatus('idle')
      })
      .catch(() => {
        if (cancelled) return
        setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [brandId])

  const categories = useMemo(() => data?.catalogCategories ?? [], [data?.catalogCategories])

  const selectedCategoryObj = useMemo(() => {
    if (!selectedCategory) return null
    return categories.find((c) => c.title === selectedCategory) ?? null
  }, [categories, selectedCategory])

  const subcategories = useMemo(() => selectedCategoryObj?.subcategories ?? [], [selectedCategoryObj])

  const selectedSubcategoryObj = useMemo(() => {
    if (!selectedSubcategory) return null
    return subcategories.find((s) => s.title === selectedSubcategory) ?? null
  }, [subcategories, selectedSubcategory])

  const types = useMemo(() => selectedSubcategoryObj?.types ?? [], [selectedSubcategoryObj])

  const accentRgb = hexToRgbTriplet(brandPrimaryColor) ?? '255 255 255'

  return (
    <section
      className={`brand-catalog3 ${compact ? 'is-compact' : ''}`}
      style={
        {
          ['--brand-catalog-accent' as string]: brandPrimaryColor,
          ['--brand-catalog-accent-rgb' as string]: accentRgb,
        } as React.CSSProperties
      }
    >
      {!compact && (
        <div className="brand-catalog3__title">
          <h2>Каталог товаров {brandDisplayName}</h2>
          <p>Выберите категорию, чтобы быстро перейти к нужной группе товаров</p>
        </div>
      )}

      {status === 'loading' && (
        <div className="brand-catalog3__loading">Загрузка каталога…</div>
      )}

      {status === 'error' && (
        <div className="brand-catalog3__loading">Не удалось загрузить каталог</div>
      )}

      {status === 'idle' && data && categories.length === 0 && (
        <div className="brand-catalog3__loading">Для этого бренда каталог пока не заполнен</div>
      )}

      {status === 'idle' && data && categories.length > 0 && (
        <div className="brand-catalog3__grid">
          <div className="brand-catalog3__col">
            <div className="brand-catalog3__colHeader">
              <span className="brand-catalog3__colIcon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V6Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 16a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 16a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <h3>Основные категории</h3>
              <span className="brand-catalog3__badge">{categories.length}</span>
            </div>

            <div className="brand-catalog3__list" role="list">
              {categories.map((c) => {
                const isActive = selectedCategory === c.title
                const subcategoryCount = (c.subcategories ?? []).length
                return (
                  <button
                    key={c.title}
                    type="button"
                    className={`brand-catalog3__item ${isActive ? 'is-active' : ''}`}
                    onClick={() => {
                      setSelectedCategory(c.title)
                      setSelectedSubcategory(null)
                    }}
                  >
                    <span className="brand-catalog3__itemIcon" aria-hidden="true" />
                    <span className="brand-catalog3__itemMain">
                      <span className="brand-catalog3__itemName">{c.title}</span>
                      <span className="brand-catalog3__itemMeta">
                        {subcategoryCount} {pluralRu(subcategoryCount, 'подкатегория', 'подкатегории', 'подкатегорий')}
                      </span>
                    </span>
                    <span className="brand-catalog3__itemArrow" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path
                          d="M9 5l7 7-7 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="brand-catalog3__col">
            <div className="brand-catalog3__colHeader">
              <span className="brand-catalog3__colIcon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <h3>Подкатегории</h3>
              <span className="brand-catalog3__badge">
                {selectedCategoryObj ? subcategories.length : 0}
              </span>
            </div>

            {!selectedCategoryObj && (
              <div className="brand-catalog3__empty">
                <p>Выберите категорию</p>
              </div>
            )}

            {selectedCategoryObj && (
              <div className="brand-catalog3__list" role="list">
                {subcategories.map((s) => {
                  const isActive = selectedSubcategory === s.title
                  const count = (s.types ?? []).length
                  const isLink = count === 0 && Boolean((s.url ?? '').trim())
                  const href = (s.url ?? '').trim()
                  return (
                    isLink ? (
                      <a
                        key={s.title}
                        className={`brand-catalog3__item ${isActive ? 'is-active' : ''}`}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          // keep selection for highlight, but allow navigation
                          setSelectedSubcategory(s.title)
                        }}
                      >
                        <span className="brand-catalog3__itemIcon" aria-hidden="true" />
                        <span className="brand-catalog3__itemMain">
                          <span className="brand-catalog3__itemName">{s.title}</span>
                          <span className="brand-catalog3__itemMeta">
                            {count} {pluralRu(count, 'тип', 'типа', 'типов')}
                            {href ? ' • ссылка' : ''}
                          </span>
                        </span>
                        <span className="brand-catalog3__itemArrow" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none">
                            <path
                              d="M9 5l7 7-7 7"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </a>
                    ) : (
                      <button
                        key={s.title}
                        type="button"
                        className={`brand-catalog3__item ${isActive ? 'is-active' : ''}`}
                        onClick={() => setSelectedSubcategory(s.title)}
                      >
                        <span className="brand-catalog3__itemIcon" aria-hidden="true" />
                        <span className="brand-catalog3__itemMain">
                          <span className="brand-catalog3__itemName">{s.title}</span>
                          <span className="brand-catalog3__itemMeta">
                            {count} {pluralRu(count, 'тип', 'типа', 'типов')}
                          </span>
                        </span>
                        <span className="brand-catalog3__itemArrow" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none">
                            <path
                              d="M9 5l7 7-7 7"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </button>
                    )
                  )
                })}
              </div>
            )}
          </div>

          <div className="brand-catalog3__col">
            <div className="brand-catalog3__colHeader">
              <span className="brand-catalog3__colIcon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <h3>Типы товаров</h3>
              <span className="brand-catalog3__badge">{types.length}</span>
            </div>

            {!selectedCategoryObj || !selectedSubcategoryObj ? (
              <div className="brand-catalog3__empty">
                <p>Выберите подкатегорию</p>
              </div>
            ) : (
              <div className="brand-catalog3__list" role="list">
                {types.map((t) => {
                  const href = (t.url ?? '').trim()
                  return href ? (
                    <a
                      key={t.title}
                      className="brand-catalog3__leaf brand-catalog3__leafLink"
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="brand-catalog3__leafIcon" aria-hidden="true" />
                      <span className="brand-catalog3__leafName">{t.title}</span>
                    </a>
                  ) : (
                    <div key={t.title} className="brand-catalog3__leaf">
                      <span className="brand-catalog3__leafIcon" aria-hidden="true" />
                      <span className="brand-catalog3__leafName">{t.title}</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}


