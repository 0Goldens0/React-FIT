import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const revalidate = 0

/**
 * Dev helper: disable Next.js draft mode to avoid "different content" between
 * localhost and LAN hostnames (cookies are scoped per hostname).
 *
 * In production, requires PREVIEW_SECRET to prevent abuse.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url') || '/'

  // In dev we allow disabling preview without secret (local network convenience).
  const isDev = process.env.NODE_ENV !== 'production'
  if (!isDev) {
    const secret = searchParams.get('secret')
    const configuredSecret = process.env.PREVIEW_SECRET
    if (!configuredSecret) {
      return new Response('PREVIEW_SECRET is not configured', { status: 500 })
    }
    if (secret !== configuredSecret) {
      return new Response('Invalid token', { status: 401 })
    }
  }

  const dm = await draftMode()
  dm.disable()
  redirect(url)
}



