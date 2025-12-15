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
      <body>
        <ClientBoot />
        <div className="App">{children}</div>
      </body>
    </html>
  )
}


