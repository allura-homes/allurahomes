import type { Metadata, Viewport } from 'next'
import { Oswald, Montserrat, Rock_Salt, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import Script from 'next/script'
import { SiteWrapper } from '@/components/layout/site-wrapper'
import './globals.css'

const GA_ID = 'G-WHT06K3ZFQ'

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

const rockSalt = Rock_Salt({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-rock-salt',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Allura Homes | Distinguished by Design - Luxury Vacation Rental Management in California',
    template: '%s | Allura Homes',
  },
  description:
    'California\'s premier white-glove, boutique vacation rental management company. Superhost-certified, full-service property management in San Diego, Temecula, Los Angeles & beyond. 13+ years maximizing rental income for property owners.',
  metadataBase: new URL('https://allurahomes.com'),
  keywords: [
    'vacation rental management',
    'Airbnb management',
    'short-term rental management',
    'property management San Diego',
    'property management Temecula',
    'property management Los Angeles',
    'STR management California',
    'Superhost property manager',
    'luxury rental management',
    'Airbnb Superhost',
    'VRBO Premier Host',
    'vacation rental income',
    'boutique property management',
    'Allura Homes',
  ],
  authors: [{ name: 'Allura Homes', url: 'https://allurahomes.com' }],
  creator: 'Allura Homes',
  publisher: 'Allura Homes',
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
  alternates: {
    canonical: 'https://allurahomes.com',
  },
  verification: {
    google: 'b8NtDhn1jK2lxxMbNYVuh6aGID9Jt-rIKwqvYGGR2QQ',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://allurahomes.com',
    siteName: 'Allura Homes',
    title: 'Allura Homes | Distinguished by Design - Luxury Vacation Rental Management',
    description:
      'California\'s premier white-glove, boutique vacation rental management. Superhost-certified with 13+ years of experience maximizing rental income.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Allura Homes - Distinguished by Design - Luxury Vacation Rental Management in California',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@AlluraHomes',
    creator: '@AlluraHomes',
    title: 'Allura Homes | Distinguished by Design',
    description:
      'California\'s premier white-glove vacation rental management. Superhost-certified with 13+ years of experience.',
    images: ['/images/og-image.jpg'],
  },
  category: 'Property Management',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'manifest', url: '/site.webmanifest' },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: '#012547',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${montserrat.variable} ${rockSalt.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { page_path: window.location.pathname });
          `}
        </Script>
        <SiteWrapper>{children}</SiteWrapper>
        <Analytics />
      </body>
    </html>
  )
}
