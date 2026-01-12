export const dynamic = 'force-dynamic'
export const revalidate = 0

const CMS_ORIGIN =
  process.env.NEXT_PUBLIC_CMS_URL?.replace(/\/+$/, '') ||
  process.env.CMS_URL?.replace(/\/+$/, '') ||
  'http://localhost:1337'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status') // 'draft' | 'published' | null
  const documentId = searchParams.get('documentId') || null
  const locale = searchParams.get('locale') || null
  const preview = searchParams.get('preview') === '1'

  // IMPORTANT: do not implicitly enable drafts via cookies; serve drafts only when explicitly requested
  // (Strapi preview adds status=modified/draft in the URL).
  // Serve drafts only for explicit preview OR for Strapi preview URLs that include documentId.
  const wantDraft = (preview || Boolean(documentId)) && (status === 'draft' || status === 'modified')

  const qs = new URLSearchParams()
  qs.set('populate', '*')

  if (wantDraft) {
    qs.set('status', 'draft')
  } else {
    // Default frontend should read published content (drafts are for preview).
    qs.set('status', 'published')
  }

  // If Strapi has multiple single-type documents (dev accidents), pin preview to the current documentId.
  if (documentId) {
    // Strapi preview URLs rely on filtering by documentId.
    qs.set('filters[documentId][$eq]', documentId)
  }
  if (locale) {
    qs.set('locale', locale)
  }

  const url = `${CMS_ORIGIN}/api/logistics-page?${qs.toString()}`

  const headers: Record<string, string> = { Accept: 'application/json' }
  // If you want draft previews to work when Strapi requires auth for drafts, set CMS_API_TOKEN.
  const token = process.env.CMS_API_TOKEN
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(url, { headers, cache: 'no-store' })
  const contentType = res.headers.get('content-type') || ''
  const body = await res.text()

  // When Strapi has multiple "versions" of a single-type, it may return the most recent data
  // inside `data.localizations`. The frontend expects the "best" version in `data`.
  if (contentType.includes('application/json')) {
    try {
      const json = JSON.parse(body) as any
      const data = json?.data
      const locals = Array.isArray(data?.localizations) ? data.localizations : []
      if (data && locals.length > 0) {
        const candidates = [data, ...locals].filter(Boolean)

        const score = (item: any) => {
          const updatedAt = Date.parse(item?.updatedAt || item?.updated_at || '') || 0
          const hasContent =
            (Array.isArray(item?.warehouseSectionContent) && item.warehouseSectionContent.length > 0) ||
            (typeof item?.heroSubtitle === 'string' && item.heroSubtitle.trim().length > 0) ||
            (typeof item?.distributionDescription === 'string' && item.distributionDescription.trim().length > 0) ||
            (Array.isArray(item?.heroStats) && item.heroStats.length > 0) ||
            (Array.isArray(item?.warehouses) && item.warehouses.length > 0) ||
            (Array.isArray(item?.wmsCards) && item.wmsCards.length > 0)
          const contentBonus = hasContent ? 10_000_000_000 : 0
          return updatedAt + contentBonus
        }

        // In draft preview we want the most recently updated draft-ish candidate
        // (publishedAt may still be set; we just want the latest editor state).
        const chosen =
          candidates
            .slice()
            .sort((a: any, b: any) => score(b) - score(a))[0] || data

        // Put the chosen version in data and keep others for debugging if needed.
        json.data = chosen
        // Avoid huge payloads / recursion
        if (json.data && json.data.localizations) delete json.data.localizations

        return new Response(JSON.stringify(json), {
          status: res.status,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'no-store',
          },
        })
      }
    } catch {
      // fall through to raw passthrough
    }
  }

  return new Response(body, {
    status: res.status,
    headers: {
      'Content-Type': contentType || 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}


