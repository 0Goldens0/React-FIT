import { NextResponse } from 'next/server'

// Allow Strapi admin (running on localhost:1337) to embed the frontend in an iframe for Preview.
export function middleware() {
  const res = NextResponse.next()

  // Minimal CSP to allow embedding by Strapi admin in dev.
  // (You can harden this in production by using your actual admin domain.)
  res.headers.set('Content-Security-Policy', "frame-ancestors 'self' http://localhost:1337")

  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}





