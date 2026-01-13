'use client'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import BrandSlide from '../components/Brands/BrandSlide'
import { brandProducts, getBrandById } from '../components/Brands/brandsData'
import { fetchCmsBrand, extractMediaUrl, type CmsBrand } from '../utils/cms'
import { useEffect, useMemo, useState } from 'react'
import { getAssetPath } from '../utils/paths'

type BrandPageProps = {
  brandId: string
}

interface CmsPopularProduct {
  order?: number
  article?: string
  name?: string
  image?: unknown
  price?: string
  category?: string
}

export default function BrandPage({ brandId }: BrandPageProps) {
  const fallbackBrand = getBrandById(brandId)
  const [cmsBrand, setCmsBrand] = useState<CmsBrand | null>(null)

  useEffect(() => {
    let cancelled = false
    fetchCmsBrand(brandId)
      .then((b) => {
        if (cancelled) return
        setCmsBrand(b)
      })
      .catch(() => {
        // ignore: we fall back to local brand data
      })
    return () => {
      cancelled = true
    }
  }, [brandId])

  const brand = useMemo(() => {
    // Prefer CMS if present; fallback to hardcoded so the page never breaks.
    if (cmsBrand && typeof cmsBrand === 'object') {
      const logoUrl = extractMediaUrl(cmsBrand.logo)
      return {
        id: cmsBrand.brandId ?? brandId,
        displayName: cmsBrand.displayName ?? fallbackBrand?.displayName ?? brandId,
        description: cmsBrand.description ?? fallbackBrand?.description ?? '',
        logo: logoUrl ?? fallbackBrand?.logo ?? '',
        primaryColor: cmsBrand.primaryColor ?? fallbackBrand?.primaryColor ?? '#FFFFFF',
        buttonTextColor: cmsBrand.buttonTextColor ?? fallbackBrand?.buttonTextColor,
        parallaxBgColor: cmsBrand.parallaxBgColor ?? fallbackBrand?.parallaxBgColor ?? '#0a0a0f',
        parallaxFgColor: cmsBrand.parallaxFgColor ?? fallbackBrand?.parallaxFgColor ?? '#FFFFFF',
        catalogB2cUrl: cmsBrand.catalogB2cUrl ?? 'https://fit-emarket.ru',
        catalogB2bUrl: cmsBrand.catalogB2bUrl ?? 'https://fit24.ru',
      } as const
    }
    return fallbackBrand
      ? { ...fallbackBrand, catalogB2cUrl: 'https://fit-emarket.ru' as string, catalogB2bUrl: 'https://fit24.ru' as string }
      : null
  }, [brandId, cmsBrand, fallbackBrand])

  const products = useMemo(() => {
    // Prefer CMS popular products if present; fallback to hardcoded map.
    const cmsProducts = Array.isArray(cmsBrand?.popularProducts) ? cmsBrand.popularProducts : null
    if (cmsProducts && cmsProducts.length > 0) {
      const hardList = brandProducts[brandId] ?? []
      const normalize = (s: string) =>
        s
          .toLowerCase()
          .replace(/\s+/g, ' ')
          .replace(/[^\p{L}\p{N}\s-]+/gu, '')
          .trim()

      const fallbackByArticle = new Map(hardList.map((p) => [String(p.article || '').trim(), p]))
      const fallbackByName = new Map(hardList.map((p) => [normalize(String(p.name || '')), p]))

      return (cmsProducts as CmsPopularProduct[])
        .slice()
        .sort((a, b) => (Number(a?.order ?? 0) - Number(b?.order ?? 0)))
        .slice(0, 4)
        .map((p) => {
          const article = String(p?.article ?? '').trim()
          const cmsName = String(p?.name ?? '').trim()
          const hard =
            (article ? fallbackByArticle.get(article) : undefined) ||
            (cmsName ? fallbackByName.get(normalize(cmsName)) : undefined)

          const imgFromCms = extractMediaUrl(p?.image)
          const imgFromHard = hard?.image
          // Always attempt a deterministic local-asset fallback by article when image is missing.
          // This is what the old frontend used for most brands (e.g. FIT: img/fit/{article}.webp).
          const imgGuess = article ? getAssetPath(`img/${brandId}/${article}.webp`) : ''

          return {
            name: String(p?.name ?? hard?.name ?? ''),
            article,
            image: imgFromCms ?? imgFromHard ?? imgGuess,
            price: String(p?.price ?? hard?.price ?? ''),
            category: String(p?.category ?? hard?.category ?? ''),
          }
        })
    }
    return (brandProducts[brandId] ?? []).slice(0, 4)
  }, [brandId, cmsBrand])

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

      <BrandSlide brand={brand} products={products} standalone />

      <main className="brand-page-content">
        <section className="brand-cta">
          <div className="cta-buttons">
            <a
              href={brand.catalogB2cUrl || 'https://fit-emarket.ru'}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button"
              style={{ background: brand.primaryColor, color: brand.buttonTextColor || '#FFFFFF' }}
            >
              Каталог для физ. лиц
            </a>
            <a
              href={brand.catalogB2bUrl || 'https://fit24.ru'}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button"
              style={{ background: brand.primaryColor, color: brand.buttonTextColor || '#FFFFFF' }}
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

