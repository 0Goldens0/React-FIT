import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const url = searchParams.get('url')
  const status = searchParams.get('status')

  const configuredSecret =
    process.env.PREVIEW_SECRET ||
    (process.env.NODE_ENV !== 'production' ? 'dev-preview-secret-change-me' : undefined)

  if (!configuredSecret) {
    return new Response('PREVIEW_SECRET is not configured', { status: 500 })
  }

  if (secret !== configuredSecret) {
    return new Response('Invalid token', { status: 401 })
  }

  const dm = await draftMode()
  // Strapi admin preview can send `status=modified` for draft state.
  if (status === 'published') {
    dm.disable()
  } else {
    dm.enable()
  }

  redirect(url || '/')
}


