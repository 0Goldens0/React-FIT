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
  const brandId = (searchParams.get('brandId') || '').trim()

  // For list endpoints, use explicit preview flag only (no documentId available).
  const wantDraft = preview && (status === 'draft' || status === 'modified')

  const qs = new URLSearchParams()
  qs.set('status', wantDraft ? 'draft' : 'published')
  // Strapi v5: media relations require `true` (not `*`), otherwise ValidationError (logo.related).
  qs.set('populate[logo]', 'true')
  // Popular products is a component; we also populate nested media explicitly.
  qs.set('populate[popularProducts][populate]', '*')
  qs.set('populate[catalogCategories][populate][subcategories][populate][types]', '*')
  if (brandId) qs.set('filters[brandId][$eq]', brandId)
  if (locale) qs.set('locale', locale)

  const url = `${CMS_ORIGIN}/api/brands?${qs.toString()}`

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


