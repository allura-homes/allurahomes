import type { MetadataRoute } from 'next'
import { getPublishedPostsForSitemap } from '@/lib/wordpress/api'
import { METRO_AREAS } from '@/lib/metro-areas'
import { SWITCH_PAGE_PATH } from '@/lib/site-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.allurahomes.com'
  // Content revision dates from Git history, not deployment or request time.
  const contentRevision = '2026-10-01'
  const termsRevision = '2026-08-26'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: contentRevision,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/property-management`,
      lastModified: contentRevision,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}${SWITCH_PAGE_PATH}`,
      lastModified: contentRevision,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/free-income-report`,
      lastModified: contentRevision,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: contentRevision,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: contentRevision,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: contentRevision,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: contentRevision,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/book-a-call`,
      lastModified: contentRevision,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/referrals`,
      lastModified: contentRevision,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: contentRevision,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-use`,
      lastModified: termsRevision,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  staticPages.push(
    { url: `${baseUrl}/san-diego-vacation-rental-management`, lastModified: contentRevision, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/stays`, lastModified: contentRevision, changeFrequency: 'weekly', priority: 0.8 },
  )

  // Metro area pages
  const metroPages: MetadataRoute.Sitemap = METRO_AREAS.map((metro) => ({
    url: `${baseUrl}/property-management/${metro.slug}`,
    lastModified: contentRevision,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  const posts = await getPublishedPostsForSitemap()
  const blogPages: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${baseUrl}/${post.category}/${post.slug}`,
    lastModified: post.modified.slice(0, 10),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))
  for (const category of ['hosting', 'regulations', 'ai']) {
    const dates = posts.filter(post => post.category === category).map(post => post.modified).sort()
    blogPages.push({
      url: `${baseUrl}/${category}`,
      lastModified: dates.at(-1)?.slice(0, 10) ?? contentRevision,
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  }

  return [...new Map([...staticPages, ...metroPages, ...blogPages].map(page => [page.url, page])).values()]
}
