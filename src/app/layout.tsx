import type { Metadata } from 'next'

import './globals.css'
import { ClientBoot } from './ClientBoot'

export const metadata: Metadata = {
  title: 'FIT',
  description: 'FIT — официальный сайт',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ClientBoot />
        <div className="App">{children}</div>
      </body>
    </html>
  )
}


