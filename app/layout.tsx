import type { Metadata } from 'next'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Base Free Mint NFT',
  description: 'Mint your free NFT on Base',
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
      <head>
        <meta name="base:app_id" content="69ba5ee0e3869312452b6bdf" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
