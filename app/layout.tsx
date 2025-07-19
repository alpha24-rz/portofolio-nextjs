import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Alpharz Portfolio',
  description: 'Created with Next.js',
  generator: 'Next.js',
  icons: {
    icon: '/icon.png',
  },
  verification: {
    google: 'RH8JnRsrK7FUAVd677LagA-jZNzYy9ZFwcBXijQ3Qkk',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}