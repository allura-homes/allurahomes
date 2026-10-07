import type { NextConfig } from 'next'
import { SWITCH_PAGE_PATH } from './lib/site-config'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/tag/luxury-rentals', destination: '/hosting', statusCode: 301 },
      { source: '/tag/high-end-rentals', destination: '/hosting', statusCode: 301 },
      { source: '/switch-managers', destination: SWITCH_PAGE_PATH, statusCode: 301 },
      { source: '/switch-managers/', destination: SWITCH_PAGE_PATH, statusCode: 301 },
      {
        source: '/home',
        destination: '/',
        statusCode: 301,
      },
      {
        source: '/home/',
        destination: '/',
        statusCode: 301,
      },
      {
        source: '/:category(hosting|regulations|ai)/san-diego-str-permit-guide',
        destination: '/hosting/san-diego-vacation-rental-permit-the-2026-homeowners-guide-to-stro-compliance',
        statusCode: 301,
      },
      {
        source: '/:category(hosting|regulations|ai)/dynamic-pricing-strategies-vacation-rentals',
        destination: '/hosting/dynamic-pricing-vacation-rentals',
        statusCode: 301,
      },
      {
        source: '/:category(hosting|regulations|ai)/temecula-wine-country-hosting-tips',
        destination: '/hosting/temecula-vacation-rental-management-the-2026-owners-guide-to-high-yield-stewardship',
        statusCode: 301,
      },
      {
        source: '/:category(hosting|regulations|ai)/ai-pricing-tools-vacation-rentals',
        destination: '/hosting/dynamic-pricing-vacation-rentals',
        statusCode: 301,
      },
      {
        source: '/:category(hosting|regulations|ai)/guest-experience-automation',
        destination: '/hosting/how-to-get-5-star-airbnb-reviews-without-the-work-in-2026',
        statusCode: 301,
      },
      {
        source: '/hosting-resources',
        destination: '/hosting',
        statusCode: 301,
      },
      {
        source: '/hosting-resources/:slug*',
        destination: '/hosting/:slug*',
        statusCode: 301,
      },
      {
        source: '/shortterm-rental-regulations',
        destination: '/regulations',
        statusCode: 301,
      },
      {
        source: '/shortterm-rental-regulations/:slug*',
        destination: '/regulations/:slug*',
        statusCode: 301,
      },
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: '**.allurahomes.com',
      },
      {
        protocol: 'http',
        hostname: '**.allurahomes.com',
      },
      {
        protocol: 'https',
        hostname: 'i0.wp.com',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
      },
      {
        protocol: 'https',
        hostname: '**.gravatar.com',
      },
      {
        protocol: 'http',
        hostname: '**.wp.com',
      },
      {
        protocol: 'https',
        hostname: '**.wp.com',
      },
      // Guesty listing images (Guesty uses Cloudinary CDN)
      {
        protocol: 'https',
        hostname: 'assets.guesty.com',
      },
      // Cloudinary CDN (common for vacation rental images)
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '*.cloudinary.com',
      },
      // AWS S3 (common for property photos)
      {
        protocol: 'https',
        hostname: '*.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
      },
    ],
  },
}

export default nextConfig
