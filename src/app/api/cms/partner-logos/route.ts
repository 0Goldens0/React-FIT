export const dynamic = 'force-dynamic'
export const revalidate = 0

const CMS_ORIGIN =
  process.env.NEXT_PUBLIC_CMS_URL?.replace(/\/+$/, '') ||
  process.env.CMS_URL?.replace(/\/+$/, '') ||
  'http://localhost:1337'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const locale = searchParams.get('locale')
  const preview = searchParams.get('preview') === '1'

  // Serve drafts only when explicitly requested via query params (preview).
  const wantDraft = preview && (status === 'draft' || status === 'modified')

  const qs = new URLSearchParams()
  qs.set('populate', '*')
  qs.set('sort', 'order:asc')
  
  if (wantDraft) {
    qs.set('status', 'draft')
  } else {
    qs.set('status', 'published')
  }

  if (locale) {
    qs.set('locale', locale)
  }

  const url = `${CMS_ORIGIN}/api/partner-logos?${qs.toString()}`

  const headers: Record<string, string> = { Accept: 'application/json' }
  const token = process.env.CMS_API_TOKEN
  if (token) headers.Authorization = `Bearer ${token}`

  try {
    const res = await fetch(url, { headers, cache: 'no-store' })
    const body = await res.text()
    
    return new Response(body, {
      status: res.status,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

