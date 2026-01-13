// Strapi v5 Content API returns items directly in `data` (no `attributes` wrapper).
// For robustness (and easier migrations), we support both v4 and v5 response shapes.
export type StrapiV5ListResponse<T> = {
  data: Array<T>
  meta?: unknown
}

export type StrapiV5SingleResponse<T> = {
  data: T | null
  meta?: unknown
}

export type StrapiMedia = {
  data: null | {
    id: number
    attributes: {
      url: string
      alternativeText?: string | null
      caption?: string | null
      width?: number | null
      height?: number | null
      mime?: string
    }
  }
}

export type StrapiMediaMulti = {
  data: Array<{
    id: number
    attributes: {
      url: string
      alternativeText?: string | null
      caption?: string | null
      width?: number | null
      height?: number | null
      mime?: string
    }
  }>
}

export const CMS_URL =
  process.env.NEXT_PUBLIC_CMS_URL?.replace(/\/+$/, '') || 'http://localhost:1337'

function getPreviewStatusFromLocation(): 'draft' | 'published' | null {
  if (typeof window === 'undefined') return null
  const status = new URLSearchParams(window.location.search).get('status')
  // Strapi admin preview can send `status=modified` for draft state.
  if (status === 'modified') return 'draft'
  if (status === 'draft' || status === 'published') return status
  return null
}

function getPreviewDocumentIdFromLocation(): string | null {
  if (typeof window === 'undefined') return null
  const documentId = new URLSearchParams(window.location.search).get('documentId')
  return documentId || null
}

function getPreviewLocaleFromLocation(): string | null {
  if (typeof window === 'undefined') return null
  const locale = new URLSearchParams(window.location.search).get('locale')
  return locale || null
}

function getPreviewEnabledFromLocation(): boolean {
  if (typeof window === 'undefined') return false
  return new URLSearchParams(window.location.search).get('preview') === '1'
}

export function cmsAssetUrl(url: string) {
  if (!url) return url
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  // Dev convenience: when the frontend is opened via LAN IP, `localhost` points to the device,
  // not the dev machine running Strapi. If CMS_URL is localhost, rewrite to current hostname.
  let base = CMS_URL
  if (typeof window !== 'undefined') {
    try {
      const u = new URL(CMS_URL)
      const isLocalhost = u.hostname === 'localhost' || u.hostname === '127.0.0.1'
      const pageHostIsLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      if (isLocalhost && !pageHostIsLocal) {
        base = `${u.protocol}//${window.location.hostname}:${u.port || '1337'}`
      }
    } catch {
      // ignore
    }
  }
  return `${base}${url.startsWith('/') ? '' : '/'}${url}`
}

export function extractMediaUrl(media: unknown): string | undefined {
  // v4/v5 media relation commonly uses { data: { attributes: { url } } }
  if (typeof media === 'string') return cmsAssetUrl(media)
  if (!media || typeof media !== 'object') return undefined

  const mediaObj = media as Record<string, unknown>

  // Try v4/v5 nested structure: media.data.attributes.url
  if (mediaObj.data && typeof mediaObj.data === 'object') {
    const dataObj = mediaObj.data as Record<string, unknown>
    if (dataObj.attributes && typeof dataObj.attributes === 'object') {
      const attrObj = dataObj.attributes as Record<string, unknown>
      if (typeof attrObj.url === 'string') return cmsAssetUrl(attrObj.url)
    }
  }

  // Try media.attributes.url
  if (mediaObj.attributes && typeof mediaObj.attributes === 'object') {
    const attrObj = mediaObj.attributes as Record<string, unknown>
    if (typeof attrObj.url === 'string') return cmsAssetUrl(attrObj.url)
  }

  // Try direct media.url
  if (typeof mediaObj.url === 'string') return cmsAssetUrl(mediaObj.url)

  return undefined
}

async function fetchJson<T>(path: string): Promise<T> {
  const previewStatus = getPreviewStatusFromLocation()
  const joiner = path.includes('?') ? '&' : '?'
  const pathWithStatus =
    previewStatus && !path.includes('status=')
      ? `${path}${joiner}status=${encodeURIComponent(previewStatus)}`
      : path

  const res = await fetch(`${CMS_URL}${pathWithStatus}`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error(`CMS request failed ${res.status}: ${path}`)
  }
  return (await res.json()) as T
}

export type CmsProductArticle = {
  id: number
  documentId?: string
  title: string
  slug: string
  category?: string | null
  excerpt?: string | null
  content?: unknown | null
  publishedDate?: string | null
  coverImage?: StrapiMedia
  gallery?: StrapiMediaMulti
  seoTitle?: string | null
  seoDescription?: string | null
  seoKeywords?: string | null
  ogImage?: StrapiMedia
  canonicalUrl?: string | null
}

export type CmsFaq = {
  id: number
  documentId?: string
  question: string
  answer?: unknown | null
  order?: number | null
  category?: string | null
}

export type CmsSinglePage = {
  id: number
  documentId?: string
  title: string
  subtitle?: string | null
  content?: unknown | null
  heroImage?: StrapiMedia
}

export type CmsBrandPopularProduct = {
  id?: number
  order?: number | null
  name: string
  article?: string | null
  category?: string | null
  price?: string | null
  url?: string | null
  image?: StrapiMedia
}

export type CmsBrand = {
  id: number
  documentId?: string
  brandId: string
  displayName: string
  description?: string | null
  logo?: StrapiMedia
  primaryColor?: string | null
  buttonTextColor?: string | null
  parallaxBgColor?: string | null
  parallaxFgColor?: string | null
  catalogB2cUrl?: string | null
  catalogB2bUrl?: string | null
  popularProducts?: CmsBrandPopularProduct[] | null
  catalog?: unknown | null
}

export async function fetchCmsBrand(brandId: string): Promise<CmsBrand | null> {
  const status = getPreviewStatusFromLocation()
  const locale = getPreviewLocaleFromLocation()
  const preview = getPreviewEnabledFromLocation()
  const qs = new URLSearchParams()
  qs.set('brandId', brandId)
  if (status) qs.set('status', status)
  if (locale) qs.set('locale', locale)
  if (preview) qs.set('preview', '1')
  // Use Next.js proxy route (same-origin) to avoid CORS/env confusion.
  // NOTE: include trailing slash to avoid 308 redirect dropping query params in some setups.
  const url = `/api/cms/brands/${qs.toString() ? `?${qs.toString()}` : ''}`
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) return null
  const json = (await res.json()) as StrapiV5ListResponse<CmsBrand>
  return json.data?.[0] ?? null
}

export async function fetchCmsBrandsList(): Promise<CmsBrand[]> {
  const status = getPreviewStatusFromLocation()
  const locale = getPreviewLocaleFromLocation()
  const preview = getPreviewEnabledFromLocation()
  const qs = new URLSearchParams()
  if (status) qs.set('status', status)
  if (locale) qs.set('locale', locale)
  if (preview) qs.set('preview', '1')
  const url = `/api/cms/brands/${qs.toString() ? `?${qs.toString()}` : ''}`
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) return []
  const json = (await res.json()) as StrapiV5ListResponse<CmsBrand>
  return Array.isArray(json.data) ? json.data : []
}

export type CmsLogisticsStatItem = {
  id?: number
  value: string
  label: string
  variant?: 'default' | 'highlight' | 'highlightAlt'
}

export type CmsLogisticsSpecItem = {
  id?: number
  value: string
  label: string
}

export type CmsLogisticsFeatureTag = {
  id?: number
  text: string
}

export type CmsLogisticsWmsCard = {
  id?: number
  icon: string
  iconVariant?: 'green' | 'yellow'
  title: string
  text: string
  tags?: CmsLogisticsFeatureTag[] | null
}

export type CmsLogisticsWarehouse = {
  id?: number
  city: string
  address: string
  status?: string | null
  image?: StrapiMedia
}

export type CmsLogisticsPage = CmsSinglePage & {
  heroBadge?: string | null
  heroTitle?: string | null
  heroTitleHighlight?: string | null
  heroSubtitle?: string | null
  heroStats?: CmsLogisticsStatItem[] | null

  warehouseSectionTitle?: string | null
  warehouseSectionContent?: unknown | null
  warehouseSectionImage?: StrapiMedia

  distributionBadgeNew?: string | null
  distributionBadgeText?: string | null
  distributionTitle?: string | null
  distributionTitleHighlight?: string | null
  distributionDescription?: string | null
  distributionSpecs?: CmsLogisticsSpecItem[] | null
  distributionFeatures?: CmsLogisticsFeatureTag[] | null
  distributionImage?: StrapiMedia

  wmsCards?: CmsLogisticsWmsCard[] | null

  speedTitle?: string | null
  speedDescription?: string | null
  warehouses?: CmsLogisticsWarehouse[] | null

  ctaTitle?: string | null
  ctaText?: string | null
  ctaButtonText?: string | null
  ctaButtonUrl?: string | null

  seoTitle?: string | null
  seoDescription?: string | null
  seoKeywords?: string | null
  ogImage?: StrapiMedia
  canonicalUrl?: string | null
}

export type CmsPartnerLogo = {
  id: number
  documentId?: string
  name: string
  logo?: StrapiMedia | null
  url?: string | null
  order?: number | null
}

export type CmsHomeClientServiceCard = {
  id?: number
  title: string
  frontText?: string | null
  backText?: unknown | null
  iconName?: string | null
  icon?: StrapiMedia | null
  order?: number | null
}

export type CmsHomePage = {
  id: number
  documentId?: string
  title: string
  clientServiceTitle?: string | null
  clientServiceSubtitle?: unknown | null
  clientServiceCards?: CmsHomeClientServiceCard[] | null
}

export type CmsBranchContact = {
  id: number
  documentId?: string
  cityId: string
  cityName: string
  regionCode: string
  phone: string
  email: string
  address: string
  directorName: string
  directorTitle: string
  avatar?: StrapiMedia | null
  order?: number | null
  isActive?: boolean | null
}

export type CmsMarketingActivitySection = {
  id?: number
  title: string
  content?: unknown | null
  image?: StrapiMedia | null
  layout?: 'textLeft' | 'textRight' | null
  order?: number | null
}

export type CmsMarketingActivityPage = {
  id: number
  documentId?: string
  title: string
  heroTitle?: string | null
  heroSubtitle?: unknown | null
  sections?: CmsMarketingActivitySection[] | null
  ctaTitle?: string | null
  ctaText?: unknown | null
  ctaButtonText?: string | null
  ctaButtonUrl?: string | null
  magazineTitle?: string | null
  magazinePdf?: StrapiMedia | null
  seoTitle?: string | null
  seoDescription?: string | null
  seoKeywords?: string | null
  ogImage?: StrapiMedia | null
  canonicalUrl?: string | null
}

function normalizeList<T>(res: unknown): T[] {
  const resObj = res as { data?: unknown }
  const data = resObj?.data
  if (!Array.isArray(data)) return []
  // v4: [{ id, attributes: {...} }]
  if (data.length > 0 && data[0] && typeof data[0] === 'object' && 'attributes' in data[0]) {
    return data.map((d) => {
      const item = d as { id: number; attributes?: Record<string, unknown> }
      return { id: item.id, ...(item.attributes || {}) } as T
    })
  }
  // v5: [{ id, ...fields }]
  return data as T[]
}

function normalizeSingle<T>(res: unknown): T | null {
  const resObj = res as { data?: unknown }
  const data = resObj?.data
  if (!data) return null
  // v4: { id, attributes: {...} }
  if (typeof data === 'object' && 'attributes' in data) {
    const dataObj = data as { id: number; attributes?: Record<string, unknown> }
    return { id: dataObj.id, ...(dataObj.attributes || {}) } as unknown as T
  }
  // v5: { id, ...fields }
  return data as T
}

export async function fetchCmsArticles(): Promise<CmsProductArticle[]> {
  const res = await fetchJson<StrapiV5ListResponse<CmsProductArticle>>(
    `/api/product-articles?sort=publishedDate:desc&populate=*`
  )
  return normalizeList<CmsProductArticle>(res)
}

export async function fetchCmsArticleBySlug(slug: string): Promise<CmsProductArticle | null> {
  const qs = encodeURIComponent(slug)
  const res = await fetchJson<StrapiV5ListResponse<CmsProductArticle>>(
    `/api/product-articles?filters[slug][$eq]=${qs}&populate=*`
  )
  const list = normalizeList<CmsProductArticle>(res)
  return list[0] || null
}

export async function fetchCmsFaqs(): Promise<CmsFaq[]> {
  const res = await fetchJson<StrapiV5ListResponse<CmsFaq>>(`/api/faqs?sort=order:asc`)
  return normalizeList<CmsFaq>(res)
}

export async function fetchCmsLogisticsPage(): Promise<CmsLogisticsPage | null> {
  // Use same-origin proxy so it works on phones/devices and supports draft preview via Next draft mode.
  const status = getPreviewStatusFromLocation()
  const documentId = getPreviewDocumentIdFromLocation()
  const locale = getPreviewLocaleFromLocation()
  const preview = getPreviewEnabledFromLocation()
  const qs = new URLSearchParams()
  if (status) qs.set('status', status)
  if (documentId) qs.set('documentId', documentId)
  if (locale) qs.set('locale', locale)
  if (preview) qs.set('preview', '1')
  const url = `/api/cms/logistics-page/${qs.toString() ? `?${qs.toString()}` : ''}`
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) return null
  const json = (await res.json()) as StrapiV5SingleResponse<CmsLogisticsPage>
  return normalizeSingle<CmsLogisticsPage>(json)
}

export type CmsHonestSignPage = {
  documentId: string
  title: string
  subtitle?: string
  heroBadge?: string
  heroImage?: StrapiMedia
  identityTitle?: string
  identityContent?: unknown
  identityImage?: StrapiMedia
  packagingTitle?: string
  packagingIntro?: string
  packagingCards?: Array<{
    title: string
    text: string
    icon?: string
    iconVariant?: string
  }>
  packagingBrandsNote?: string
  packagingImage?: StrapiMedia
  honestSignTitle?: string
  honestSignContent?: string
  honestSignListIntro?: string
  honestSignBenefits?: Array<{ text: string }>
  honestSignClosing?: string
  honestSignImage?: StrapiMedia
  visualMaterialsTitle?: string
  visualMaterialsIntro?: string
  visualMaterialsItems?: Array<{ text: string }>
  visualMaterialsClosing?: string
  visualMaterialsGallery?: StrapiMediaMulti
  finalTitle?: string
  finalText?: string
  seoTitle?: string
  seoDescription?: string
}

export async function fetchCmsHonestSignPage(): Promise<CmsHonestSignPage | null> {
  const status = getPreviewStatusFromLocation()
  const documentId = getPreviewDocumentIdFromLocation()
  const locale = getPreviewLocaleFromLocation()
  const preview = getPreviewEnabledFromLocation()
  const qs = new URLSearchParams()
  if (status) qs.set('status', status)
  if (documentId) qs.set('documentId', documentId)
  if (locale) qs.set('locale', locale)
  if (preview) qs.set('preview', '1')
  const url = `/api/cms/honest-sign-page/${qs.toString() ? `?${qs.toString()}` : ''}`
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) return null
  const json = (await res.json()) as StrapiV5SingleResponse<CmsHonestSignPage>
  return normalizeSingle<CmsHonestSignPage>(json)
}

export type CmsCompanyNews = {
  id: number
  documentId?: string
  title: string
  slug: string
  excerpt?: string | null
  content?: unknown | null
  publishedDate?: string | null
  coverImage?: StrapiMedia
  gallery?: StrapiMediaMulti
  seoTitle?: string | null
  seoDescription?: string | null
  seoKeywords?: string | null
  ogImage?: StrapiMedia
  canonicalUrl?: string | null
}

export async function fetchCmsCompanyNews(): Promise<CmsCompanyNews[]> {
  const res = await fetchJson<StrapiV5ListResponse<CmsCompanyNews>>(
    `/api/company-news?sort=publishedDate:desc&populate=*`
  )
  return normalizeList<CmsCompanyNews>(res)
}

export async function fetchCmsCompanyNewsBySlug(slug: string): Promise<CmsCompanyNews | null> {
  const qs = encodeURIComponent(slug)
  const res = await fetchJson<StrapiV5ListResponse<CmsCompanyNews>>(
    `/api/company-news?filters[slug][$eq]=${qs}&populate=*`
  )
  const list = normalizeList<CmsCompanyNews>(res)
  return list[0] || null
}

export async function fetchCmsPartnerLogos(): Promise<CmsPartnerLogo[]> {
  const status = getPreviewStatusFromLocation()
  const locale = getPreviewLocaleFromLocation()
  const preview = getPreviewEnabledFromLocation()
  const qs = new URLSearchParams()
  if (status) qs.set('status', status)
  if (locale) qs.set('locale', locale)
  if (preview) qs.set('preview', '1')

  const url = `/api/cms/partner-logos/${qs.toString() ? `?${qs.toString()}` : ''}`
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) return []
  const json = (await res.json()) as StrapiV5ListResponse<CmsPartnerLogo>
  return normalizeList<CmsPartnerLogo>(json)
}

export async function fetchCmsBranchContacts(): Promise<CmsBranchContact[]> {
  const status = getPreviewStatusFromLocation()
  const locale = getPreviewLocaleFromLocation()
  const preview = getPreviewEnabledFromLocation()
  const qs = new URLSearchParams()
  if (status) qs.set('status', status)
  if (locale) qs.set('locale', locale)
  if (preview) qs.set('preview', '1')

  const url = `/api/cms/branch-contacts/${qs.toString() ? `?${qs.toString()}` : ''}`
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) return []
  const json = (await res.json()) as StrapiV5ListResponse<CmsBranchContact>
  return normalizeList<CmsBranchContact>(json)
}

export async function fetchCmsMarketingActivityPage(): Promise<CmsMarketingActivityPage | null> {
  const status = getPreviewStatusFromLocation()
  const documentId = getPreviewDocumentIdFromLocation()
  const locale = getPreviewLocaleFromLocation()
  const preview = getPreviewEnabledFromLocation()
  const qs = new URLSearchParams()
  if (status) qs.set('status', status)
  if (documentId) qs.set('documentId', documentId)
  if (locale) qs.set('locale', locale)
  if (preview) qs.set('preview', '1')

  const url = `/api/cms/marketing-activity-page/${qs.toString() ? `?${qs.toString()}` : ''}`
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) return null
  const json = (await res.json()) as StrapiV5SingleResponse<CmsMarketingActivityPage>
  return normalizeSingle<CmsMarketingActivityPage>(json)
}

export async function fetchCmsHomePage(): Promise<CmsHomePage | null> {
  const status = getPreviewStatusFromLocation()
  const documentId = getPreviewDocumentIdFromLocation()
  const locale = getPreviewLocaleFromLocation()
  const preview = getPreviewEnabledFromLocation()
  const qs = new URLSearchParams()
  if (status) qs.set('status', status)
  if (documentId) qs.set('documentId', documentId)
  if (locale) qs.set('locale', locale)
  if (preview) qs.set('preview', '1')

  const url = `/api/cms/home-page/${qs.toString() ? `?${qs.toString()}` : ''}`
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) return null
  const json = (await res.json()) as StrapiV5SingleResponse<CmsHomePage>
  return normalizeSingle<CmsHomePage>(json)
}


