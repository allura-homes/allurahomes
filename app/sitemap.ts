import type { MetadataRoute } from 'next'
import { getCategories, getPostsByCategory } from '@/lib/wordpress/api'
import { METRO_AREAS } from '@/lib/metro-areas'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://allurahomes.com'
  const now = new Date()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/property-management`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/free-income-report`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/book-a-call`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/referrals`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-use`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Metro area pages
  const metroPages: MetadataRoute.Sitemap = METRO_AREAS.map((metro) => ({
    url: `${baseUrl}/property-management/${metro.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  // Dynamic blog pages
  const blogPages: MetadataRoute.Sitemap = []
  try {
    const categories = await getCategories()
    for (const cat of categories) {
      blogPages.push({
        url: `${baseUrl}/${cat.slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
      })
      const { posts } = await getPostsByCategory(cat.slug)
      for (const post of posts) {
        blogPages.push({
          url: `${baseUrl}/${cat.slug}/${post.slug}`,
          lastModified: new Date(post.modified),
          changeFrequency: 'monthly',
          priority: 0.7,
        })
      }
    }
  } catch {
    // WordPress not connected yet -- skip blog pages
  }

  return [...staticPages, ...metroPages, ...blogPages]
}
