import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Portofolio Web Alpharz | Desain & Pengembangan Kreatif',
  description: 'Portofolio profesional Alpharz menampilkan karya terbaik dalam pengembangan web, desain UI/UX, dan solusi digital kreatif. Lihat proyek dan keterampilan saya.',
  generator: 'Next.js',
  applicationName: 'Portofolio Alpharz',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'Portofolio Alpharz',
    'Web Developer Alpharz',
    'Desainer Web Alpharz',
    'Karya Alpharz',
    'Proyek Web Alpharz'
  ],
  authors: [{ name: 'Alpharz', url: 'https://alpha-portofolio.vercel.app' }],
  creator: 'Alpharz',
  publisher: 'Alpharz',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  verification: {
    google: 'RH8JnRsrK7FUAVd677LagA-jZNzYy9ZFwcBXijQ3Qkk',
  },
  openGraph: {
    title: 'Portofolio Web Alpharz',
    description: 'Koleksi karya terbaik Alpharz dalam pengembangan web dan desain digital',
    url: 'https://alpha-portofolio.vercel.app',
    siteName: 'Portofolio Alpharz',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Portofolio Alpharz',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portofolio Web Alpharz',
    description: 'Koleksi karya terbaik Alpharz dalam pengembangan web dan desain digital',
    images: ['/og-image.jpg'],
    creator: '@alpharz',
  },
  metadataBase: new URL('https://alpha-portofolio.vercel.app'),
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body>
        {children}
      </body>
    </html>
  )
}