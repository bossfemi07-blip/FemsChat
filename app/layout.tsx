import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FemsChat - TikTok + Audiomack + WhatsApp 🇳🇬',
  description: 'Chat, Post, Stream Music, Go Live. Built by Itz Femiranking from Bori',
  manifest: '/manifest.json',
  themeColor: '#25D366',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}