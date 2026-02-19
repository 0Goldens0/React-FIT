'use client'

import { useEffect, useMemo, useState } from 'react'
import { getBrandCatalogData } from './brandsCategories'

const USE_STATIC = process.env.NEXT_PUBLIC_STATIC_CATALOG === 'true'

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

function hexToRgb(hex: string): [number, number, number] | null {
  const raw = hex.trim().replace(/^#/, '')
  const full =
    raw.length === 3 ? raw.split('').map((c) => c + c).join('') : raw.length === 6 ? raw : null
  if (!full) return null
  const r = parseInt(full.slice(0, 2), 16)
  const g = parseInt(full.slice(2, 4), 16)
  const b = parseInt(full.slice(4, 6), 16)
  if ([r, g, b].some((n) => Number.isNaN(n))) return null
  return [r, g, b]
}

function hexToRgbTriplet(hex: string): string | null {
  const rgb = hexToRgb(hex)
  return rgb ? `${rgb[0]} ${rgb[1]} ${rgb[2]}` : null
}

/** Цвета слишком тёмные для использования как акцент на тёмном фоне → заменяем на белый */
function resolveAccent(hex: string): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return '#FFFFFF'
  const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255
  return luminance < 0.35 ? '#FFFFFF' : hex
}

function pluralRu(n: number, one: string, few: string, many: string) {
  if (n % 10 === 1 && n % 100 !== 11) return one
  if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) return few
  return many
}

const CATEGORY_ICONS: Record<string, string> = {
  'Слесарный инструмент': '🔧',
  'Буры, сверла, коронки, фрезы': '🔩',
  'Электро-Пневмо-Бензоинструмент': '⚡',
  'Садовый инструмент': '🌿',
  'Отделочный инструмент': '🎨',
  'Абразивно-шлифовальный инструмент': '✨',
  'Измерительный инструмент': '📐',
  'Хозтовары и скобяные изделия': '🏠',
  'Крепеж и крепежный инструмент': '📌',
  'Торговое оборудование': '🏪',
  'Сантехнический инструмент': '💧',
  'Столярный инструмент': '🪚',
  'Инструмент автомобильный': '🚗',
}

export function BrandCategoriesCatalog({
  brandId,
  brandDisplayName,
  brandPrimaryColor,
  compact = false,
}: BrandCategoriesCatalogProps) {
  const [data, setData] = useState<BrandCategoriesApiResponse | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [openSub, setOpenSub] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setExpanded(null)
    setOpenSub(null)
    setSearch('')

    if (USE_STATIC) {
      const raw = getBrandCatalogData(brandId)
      if (!raw) { setData({ brandId, brandKey: null, catalogCategories: [] }); return }
      const catalogCategories = Object.entries(raw.categories ?? {}).map(([catTitle, level2]) => ({
        title: catTitle,
        subcategories: Object.entries(level2 ?? {}).map(([subTitle, types]) => ({
          title: subTitle,
          url: null as string | null,
          types: (types ?? []).map((t) => ({ title: String(t), url: null as string | null })),
        })),
      }))
      setData({ brandId, brandKey: brandId, catalogCategories })
      setStatus('idle')
      return
    }

    let cancelled = false
    setStatus('loading')
    setData(null)

    const previewQs = (() => {
      if (typeof window === 'undefined') return ''
      const sp = new URLSearchParams(window.location.search)
      const statusParam = sp.get('status')
      const preview = sp.get('preview')
      const documentId = sp.get('documentId')
      const qs = new URLSearchParams()
      if (statusParam) qs.set('status', statusParam)
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

    return () => { cancelled = true }
  }, [brandId])

  const categories = useMemo(() => data?.catalogCategories ?? [], [data?.catalogCategories])

  const totalTypes = useMemo(
    () =>
      categories.reduce(
        (s, c) => s + c.subcategories.reduce((s2, sub) => s2 + sub.types.length, 0),
        0,
      ),
    [categories],
  )

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return categories
    return categories.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.subcategories.some(
          (s) =>
            s.title.toLowerCase().includes(q) ||
            s.types.some((t) => t.title.toLowerCase().includes(q)),
        ),
    )
  }, [categories, search])

  const accent = resolveAccent(brandPrimaryColor)
  const accentRgb = hexToRgbTriplet(accent) ?? '255 255 255'

  const toggle = (title: string) => {
    if (expanded === title) {
      setExpanded(null)
      setOpenSub(null)
    } else {
      setExpanded(title)
      setOpenSub(null)
    }
  }

  return (
    <section
      className={`bc3 ${compact ? 'bc3--compact' : ''}`}
      style={
        {
          ['--bc3-accent' as string]: accent,
          ['--bc3-accent-rgb' as string]: accentRgb,
        } as React.CSSProperties
      }
    >
      {/* ── Top bar ── */}
      <div className="bc3__topbar">
        {!compact && (
          <div className="bc3__topbar-text">
            <h2 className="bc3__heading">Каталог товаров {brandDisplayName}</h2>
            <p className="bc3__subheading">
              Выберите категорию, чтобы быстро перейти к нужной группе товаров
            </p>
          </div>
        )}
        <div className="bc3__topbar-controls">
          <span className="bc3__stats">
            {categories.length}{' '}
            {pluralRu(categories.length, 'категория', 'категории', 'категорий')} · {totalTypes}{' '}
            наименований
          </span>
          <div className="bc3__search-wrap">
            <svg
              className="bc3__search-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              className="bc3__search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setExpanded(null)
                setOpenSub(null)
              }}
              placeholder="Найти категорию или товар…"
            />
          </div>
        </div>
      </div>

      {/* ── Status messages ── */}
      {status === 'loading' && <div className="bc3__message">Загрузка каталога…</div>}
      {status === 'error' && <div className="bc3__message">Не удалось загрузить каталог</div>}
      {status === 'idle' && data && categories.length === 0 && (
        <div className="bc3__message">Для этого бренда каталог пока не заполнен</div>
      )}

      {/* ── Accordion list ── */}
      {status === 'idle' && data && categories.length > 0 && (
        <div className="bc3__list">
          {filtered.map((cat, i) => {
            const isOpen = expanded === cat.title
            const typesCount = cat.subcategories.reduce((s, sub) => s + sub.types.length, 0)
            const icon = CATEGORY_ICONS[cat.title] ?? '🔧'

            return (
              <div
                key={cat.title}
                className={`bc3__cat ${isOpen ? 'is-open' : ''}`}
                style={{ animationDelay: `${i * 35}ms` } as React.CSSProperties}
              >
                {/* Category header */}
                <button
                  type="button"
                  className="bc3__cat-header"
                  onClick={() => toggle(cat.title)}
                >
                  {/* Left gradient accent strip */}
                  <div className="bc3__accent-strip" />

                  {/* Icon area */}
                  <div className="bc3__cat-icon-wrap">
                    <span className="bc3__cat-icon">{icon}</span>
                  </div>

                  {/* Text content */}
                  <div className="bc3__cat-content">
                    <div className="bc3__cat-inner">
                      <span className="bc3__cat-name">{cat.title}</span>
                      <div className="bc3__cat-meta">
                        <div className="bc3__progress-bar">
                          <div
                            className="bc3__progress-fill"
                            style={{ width: `${Math.min(100, (typesCount / 60) * 100)}%` }}
                          />
                        </div>
                        <span className="bc3__cat-meta-text">
                          {cat.subcategories.length} подкат. · {typesCount} типов
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Chevron */}
                  <svg
                    className="bc3__chevron"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>

                {/* Expanded body */}
                <div className="bc3__expanded">
                  {/* Subcategory chips */}
                  <div className="bc3__chips">
                    {cat.subcategories.map((sub, j) => {
                      const subOpen = openSub === sub.title
                      const isLink =
                        sub.types.length === 0 && Boolean((sub.url ?? '').trim())
                      const href = (sub.url ?? '').trim()

                      const chipProps = {
                        className: `bc3__chip ${subOpen ? 'is-open' : ''}`,
                        style: { '--chip-delay': `${j * 25}ms` } as React.CSSProperties,
                      }

                      if (isLink) {
                        return (
                          <a
                            key={sub.title}
                            {...chipProps}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <div className="bc3__chip-dot" />
                            {sub.title}
                            <span className="bc3__chip-count">{sub.types.length}</span>
                          </a>
                        )
                      }

                      return (
                        <button
                          key={sub.title}
                          type="button"
                          {...chipProps}
                          onClick={() => setOpenSub(subOpen ? null : sub.title)}
                        >
                          <div className="bc3__chip-dot" />
                          {sub.title}
                          <span className="bc3__chip-count">{sub.types.length}</span>
                        </button>
                      )
                    })}
                  </div>

                  {/* Types panel */}
                  {openSub &&
                    (() => {
                      const sub = cat.subcategories.find((s) => s.title === openSub)
                      if (!sub) return null
                      return (
                        <div className="bc3__types-panel">
                          <div className="bc3__types-header">
                            <div className="bc3__types-dot" />
                            <span className="bc3__types-title">{sub.title}</span>
                            <span className="bc3__types-count">
                              {sub.types.length}{' '}
                              {pluralRu(sub.types.length, 'тип', 'типа', 'типов')}
                            </span>
                          </div>
                          <div className="bc3__types-grid">
                            {sub.types.map((t, k) => {
                              const href = (t.url ?? '').trim()
                              return href ? (
                                <a
                                  key={t.title}
                                  className="bc3__type-card bc3__type-link"
                                  href={href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={
                                    { '--type-delay': `${k * 30}ms` } as React.CSSProperties
                                  }
                                >
                                  <div className="bc3__type-accent-line" />
                                  <div className="bc3__type-diamond" />
                                  <span className="bc3__type-name">{t.title}</span>
                                  <svg
                                    className="bc3__type-arrow"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  >
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                  </svg>
                                </a>
                              ) : (
                                <div
                                  key={t.title}
                                  className="bc3__type-card"
                                  style={
                                    { '--type-delay': `${k * 30}ms` } as React.CSSProperties
                                  }
                                >
                                  <div className="bc3__type-accent-line" />
                                  <div className="bc3__type-diamond" />
                                  <span className="bc3__type-name">{t.title}</span>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })()}
                </div>
              </div>
            )
          })}

          {filtered.length === 0 && (
            <div className="bc3__empty">
              <div className="bc3__empty-icon">🔍</div>
              <p>По запросу «{search}» ничего не найдено</p>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
