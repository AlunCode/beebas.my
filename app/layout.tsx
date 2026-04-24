import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://beebas.my'
const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Beebas — Get Out of Debt Faster',
    template: '%s | Beebas',
  },
  description: "Malaysia's #1 debt snowball and avalanche tracker. See exactly when you'll be debt-free. Track credit cards, car loans, PTPTN and more. Free to start.",
  keywords: ['debt tracker Malaysia', 'debt snowball Malaysia', 'debt avalanche', 'PTPTN payoff', 'credit card debt Malaysia', 'debt free Malaysia', 'debt repayment calculator', 'hutang Malaysia'],
  authors: [{ name: 'Beebas' }],
  creator: 'Beebas',
  openGraph: {
    type: 'website',
    locale: 'en_MY',
    url: BASE_URL,
    siteName: 'Beebas',
    title: 'Beebas — Get Out of Debt Faster',
    description: "Malaysia's #1 debt tracker. See your exact debt-free date in 3 minutes. Free.",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Beebas — Malaysia\'s Debt Tracker',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beebas — Get Out of Debt Faster',
    description: "Malaysia's #1 debt tracker. See your exact debt-free date in 3 minutes. Free.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-MY" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}

        {/* Google AdSense — loads only when publisher ID is configured */}
        {ADSENSE_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  )
}
