import { NextResponse } from 'next/server'

const CMS_URL = (process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:1337').replace(/\/+$/, '')

export const dynamic = 'force-dynamic'

/**
 * Извлекает параметры для embed из URL VK Video
 * Поддерживает форматы:
 * - https://vk.com/video-74008963_456239392
 * - https://vk.com/video123456_789012345
 *
 * Возвращает строку для использования в iframe src:
 * https://vk.com/video_ext.php?oid=-74008963&id=456239392
 */
function extractVkVideoEmbed(urlOrId: string): string {
  if (!urlOrId) return ''

  const trimmed = urlOrId.trim()

  // Паттерн для VK video URL: video{owner_id}_{video_id}
  // owner_id может быть отрицательным (для групп)
  const match = trimmed.match(/video(-?\d+)_(\d+)/i)

  if (match) {
    const ownerId = match[1]
    const videoId = match[2]
    return `https://vk.com/video_ext.php?oid=${ownerId}&id=${videoId}`
  }

  return ''
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get('location') // 'home' or 'marketing'
    const status = searchParams.get('status') // 'draft' | 'published' | 'modified' | null
    const preview = searchParams.get('preview') === '1'

    // Serve drafts only when explicitly requested via query params (preview).
    // Strapi preview URLs use `status=draft|modified&preview=1`.
    const wantDraft = preview && (status === 'draft' || status === 'modified')

    const qs = new URLSearchParams()
    qs.set('populate', '*')
    qs.set('sort', 'order:asc')
    // Strapi v5: use `status` instead of v4 `publicationState`.
    qs.set('status', wantDraft ? 'draft' : 'published')
    // Back-compat: if CMS is v4, it uses publicationState=live|preview.
    qs.set('publicationState', wantDraft ? 'preview' : 'live')

    // Фильтруем по местоположению
    if (location === 'home') {
      qs.set('filters[showOnHomePage][$eq]', 'true')
    } else if (location === 'marketing') {
      qs.set('filters[showOnMarketingPage][$eq]', 'true')
    }

    const url = `${CMS_URL}/api/rutube-videos?${qs.toString()}`

    const res = await fetch(url, {
      headers: {
        Accept: 'application/json',
        ...(process.env.CMS_API_TOKEN ? { Authorization: `Bearer ${process.env.CMS_API_TOKEN}` } : {}),
      },
      cache: 'no-store', // Отключаем кэш для немедленного обновления
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch videos from CMS' },
        { status: res.status }
      )
    }

    const data = await res.json()

    // Преобразуем данные в удобный формат и извлекаем ID из URL
    const list: unknown[] = Array.isArray(data?.data) ? data.data : []

    const toAttrs = (item: unknown): Record<string, unknown> => {
      if (!item || typeof item !== 'object') return {}
      const obj = item as Record<string, unknown>
      const maybeAttrs = obj.attributes
      if (maybeAttrs && typeof maybeAttrs === 'object') return maybeAttrs as Record<string, unknown>
      return obj
    }

    const videos =
      list
        .map((item) => {
          const obj = item && typeof item === 'object' ? (item as Record<string, unknown>) : {}
          const attrs = toAttrs(item)

          const rawUrl = typeof attrs.videoUrl === 'string' ? attrs.videoUrl : ''
          const embedUrl = extractVkVideoEmbed(rawUrl)

          return {
            id: (typeof obj.documentId === 'string' && obj.documentId) || (typeof obj.id === 'number' && obj.id) || '',
            videoId: embedUrl, // Используем embed URL как videoId
            videoUrl: rawUrl,
            title: typeof attrs.title === 'string' ? attrs.title : '',
            description: typeof attrs.description === 'string' ? attrs.description : null,
            order: typeof attrs.order === 'number' ? attrs.order : 0,
            showOnHomePage: typeof attrs.showOnHomePage === 'boolean' ? attrs.showOnHomePage : false,
            showOnMarketingPage:
              typeof attrs.showOnMarketingPage === 'boolean' ? attrs.showOnMarketingPage : false,
          }
        })
        // filter out garbage/empty embed urls
        .filter((v) => Boolean(v.videoId)) || []

    return NextResponse.json({ videos })
  } catch (error) {
    console.error('Error fetching Rutube videos:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
