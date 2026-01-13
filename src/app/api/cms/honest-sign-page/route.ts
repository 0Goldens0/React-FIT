export const dynamic = 'force-dynamic'
export const revalidate = 0

const CMS_ORIGIN =
  process.env.NEXT_PUBLIC_CMS_URL?.replace(/\/+$/, '') ||
  process.env.CMS_URL?.replace(/\/+$/, '') ||
  'http://localhost:1337'

// Strapi API response types for honest-sign-page
interface StrapiHonestSignData {
  updatedAt?: string
  updated_at?: string
  content?: unknown[]
  subtitle?: string
  localizations?: StrapiHonestSignData[]
}

interface StrapiHonestSignResponse {
  data?: StrapiHonestSignData
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const documentId = searchParams.get('documentId') || null
  const locale = searchParams.get('locale') || null
  const preview = searchParams.get('preview') === '1'

  // Serve drafts only when explicitly requested via query params (preview).
  // Serve drafts only for explicit preview OR for Strapi preview URLs that include documentId.
  const wantDraft = (preview || Boolean(documentId)) && (status === 'draft' || status === 'modified')

  const qs = new URLSearchParams()
  qs.set('populate', '*')
  if (wantDraft) qs.set('status', 'draft')
  else qs.set('status', 'published')
  if (documentId) qs.set('filters[documentId][$eq]', documentId)
  if (locale) qs.set('locale', locale)

  const url = `${CMS_ORIGIN}/api/honest-sign-page?${qs.toString()}`

  const headers: Record<string, string> = { Accept: 'application/json' }
  const token = process.env.CMS_API_TOKEN
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(url, { headers, cache: 'no-store' })
  const contentType = res.headers.get('content-type') || ''
  const body = await res.text()

  if (contentType.includes('application/json')) {
    try {
      const json = JSON.parse(body) as StrapiHonestSignResponse
      const data = json?.data
      const locals = Array.isArray(data?.localizations) ? data.localizations : []
      if (data && locals.length > 0) {
        const candidates = [data, ...locals].filter(Boolean)

        const score = (item: StrapiHonestSignData) => {
          const updatedAt = Date.parse(item?.updatedAt || item?.updated_at || '') || 0
          const hasContent =
            (Array.isArray(item?.content) && item.content.length > 0) ||
            (typeof item?.subtitle === 'string' && item.subtitle.trim().length > 0)
          const contentBonus = hasContent ? 10_000_000_000 : 0
          return updatedAt + contentBonus
        }

        const chosen =
          candidates
            .slice()
            .sort((a, b) => score(b) - score(a))[0] || data

        json.data = chosen
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
      // fall through
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


