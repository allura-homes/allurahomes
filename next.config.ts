import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      // Legacy blog category slugs → new short slugs (308 = permanent)
      {
        source: '/hosting-resources',
        destination: '/hosting',
        permanent: true,
      },
      {
        source: '/hosting-resources/:slug*',
        destination: '/hosting/:slug*',
        permanent: true,
      },
      {
        source: '/shortterm-rental-regulations',
        destination: '/regulations',
        permanent: true,
      },
      {
        source: '/shortterm-rental-regulations/:slug*',
        destination: '/regulations/:slug*',
        permanent: true,
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
