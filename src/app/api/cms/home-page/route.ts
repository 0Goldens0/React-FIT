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

  // Serve drafts only when explicitly requested.
  // Serve drafts only for explicit preview OR for Strapi preview URLs that include documentId.
  const wantDraft = (preview || Boolean(documentId)) && (status === 'draft' || status === 'modified')

  const qs = new URLSearchParams()
  qs.set('populate', '*')
  qs.set('status', wantDraft ? 'draft' : 'published')
  if (documentId) qs.set('filters[documentId][$eq]', documentId)
  if (locale) qs.set('locale', locale)

  const url = `${CMS_ORIGIN}/api/home-page?${qs.toString()}`

  const headers: Record<string, string> = { Accept: 'application/json' }
  const token = process.env.CMS_API_TOKEN
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(url, { headers, cache: 'no-store' })
  const contentType = res.headers.get('content-type') || 'application/json; charset=utf-8'
  const body = await res.text()

  return new Response(body, {
    status: res.status,
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'no-store',
    },
  })
}


