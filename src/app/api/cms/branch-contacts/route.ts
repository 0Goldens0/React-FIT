export const dynamic = 'force-dynamic'
export const revalidate = 0

const CMS_ORIGIN =
  process.env.NEXT_PUBLIC_CMS_URL?.replace(/\/+$/, '') ||
  process.env.CMS_URL?.replace(/\/+$/, '') ||
  'http://localhost:1337'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const locale = searchParams.get('locale') || null
  const preview = searchParams.get('preview') === '1'

  // For list endpoints, use explicit preview flag only (no documentId available).
  const wantDraft = preview && (status === 'draft' || status === 'modified')

  const qs = new URLSearchParams()
  qs.set('populate', '*')
  qs.set('sort', 'order:asc')
  qs.set('status', wantDraft ? 'draft' : 'published')
  if (locale) qs.set('locale', locale)

  const url = `${CMS_ORIGIN}/api/branch-contacts?${qs.toString()}`

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


