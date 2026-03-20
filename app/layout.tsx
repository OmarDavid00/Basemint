import type { Metadata } from 'next'
import { Providers } from './providers'
import './globals.css'


export const metadata = {
  title: 'Base NFT Mini App',
  description: '...',
  other: {
    'base:app_id': '69ba5ee0e3869312452b6bdf',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
