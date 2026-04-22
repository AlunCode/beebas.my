import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Beebas — Get Out of Debt Faster",
  description: "Malaysia's first debt snowball and avalanche tracker. See exactly when you'll be debt-free.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
