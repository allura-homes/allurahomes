import { normalizeMarketingCopy, normalizeMarketingHTML } from '@/lib/marketing-copy'

import type {
  WPPost,
  WPCategory,
  BlogPost,
  BlogCategory,
} from './types'

export class WordPressUnavailableError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message)
    this.name = 'WordPressUnavailableError'
  }
}

// ─── Configuration ───────────────────────────────────────────
const _rawWpUrl = (process.env.WORDPRESS_API_URL ?? '').trim().replace(/\/$/, '')
const WP_API_URL = _rawWpUrl ? `${_rawWpUrl}/wp-json/wp/v2` : null
const WP_API_URL_IS_HTTP = WP_API_URL?.startsWith('http://')
const CONCURRENCY_LIMIT = 2

// ─── Demo Data (used when no WordPress is connected) ─────────
const DEMO_CATEGORIES: BlogCategory[] = [
  {
    name: 'Hosting Resources',
    slug: 'hosting',
    description:
      'Expert tips, strategies, and guides to improve your vacation rental performance.',
    count: 5,
  },
  {
    name: 'Short-Term Rental Regulations',
    slug: 'regulations',
    description:
      'Stay compliant with the latest STR permit requirements and local regulations across California.',
    count: 4,
  },
  {
    name: 'AI & Technology',
    slug: 'ai',
    description:
      'How artificial intelligence and smart home technology are transforming vacation rental management.',
    count: 3,
  },
]

const DEMO_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: 'successful-property-marketing-sd',
    title: 'Successful Property Marketing in San Diego: The Complete Guide',
    excerpt:
      'Learn the strategies top-performing Airbnb hosts use to keep occupancy high and reviews stellar in the competitive San Diego market.',
    content: '',
    date: '2025-11-15T10:00:00',
    modified: '2025-11-15T10:00:00',
    featuredImage: {
      url: '/images/property-sunset-estate.jpg',
      alt: 'Boutique San Diego vacation rental',
      width: 800,
      height: 533,
    },
    category: { name: 'Hosting', slug: 'hosting' },
    tags: [
      { name: 'Marketing', slug: 'marketing' },
      { name: 'San Diego', slug: 'san-diego' },
    ],
    author: { name: 'Mike Corrales', avatar: '/images/mike-corrales.jpeg' },
  },
  {
    id: 2,
    slug: 'dynamic-pricing-strategies-vacation-rentals',
    title: 'Dynamic Pricing Strategies That Actually Work for Vacation Rentals',
    excerpt:
      'Stop leaving money on the table. Here\'s how to implement dynamic pricing that improves revenue without sacrificing occupancy.',
    content: '',
    date: '2025-10-28T10:00:00',
    modified: '2025-10-28T10:00:00',
    featuredImage: {
      url: '/images/property-vineyard-retreat.jpg',
      alt: 'Temecula vacation rental',
      width: 800,
      height: 533,
    },
    category: { name: 'Hosting', slug: 'hosting' },
    tags: [
      { name: 'Revenue', slug: 'revenue' },
      { name: 'Pricing', slug: 'pricing' },
    ],
    author: { name: 'Mike Corrales', avatar: '/images/mike-corrales.jpeg' },
  },
  {
    id: 3,
    slug: 'guest-experience-automation',
    title: '5-Star Guest Experiences: How Automation and Personal Touch Work Together',
    excerpt:
      'The best vacation rentals blend smart automation with genuine hospitality. Learn how top managers get it right.',
    content: '',
    date: '2025-10-10T10:00:00',
    modified: '2025-10-10T10:00:00',
    featuredImage: {
      url: '/images/property-coastal-villa.jpg',
      alt: 'Coastal California vacation rental',
      width: 800,
      height: 533,
    },
    category: { name: 'Hosting', slug: 'hosting' },
    tags: [
      { name: 'Guest Experience', slug: 'guest-experience' },
      { name: 'Automation', slug: 'automation' },
    ],
    author: { name: 'Mike Corrales', avatar: '/images/mike-corrales.jpeg' },
  },
  {
    id: 4,
    slug: 'airbnb-carlsbad-regulations',
    title: 'Airbnb & Short-Term Rental Regulations in Carlsbad: What Owners Need to Know',
    excerpt:
      'Carlsbad has specific STR rules that every host must follow. Here\'s a complete breakdown of permits, taxes, and compliance requirements.',
    content: '',
    date: '2025-09-20T10:00:00',
    modified: '2025-09-20T10:00:00',
    featuredImage: {
      url: '/images/hero-about.jpg',
      alt: 'California coastal community',
      width: 800,
      height: 533,
    },
    category: { name: 'Regulations', slug: 'regulations' },
    tags: [
      { name: 'Carlsbad', slug: 'carlsbad' },
      { name: 'Permits', slug: 'permits' },
    ],
    author: { name: 'Mike Corrales', avatar: '/images/mike-corrales.jpeg' },
  },
  {
    id: 5,
    slug: 'san-diego-str-permit-guide',
    title: 'San Diego STR Permit Guide: Step-by-Step for 2025',
    excerpt:
      'Navigate the San Diego short-term rental permit process with confidence. Everything from application to approval, explained clearly.',
    content: '',
    date: '2025-09-05T10:00:00',
    modified: '2025-09-05T10:00:00',
    featuredImage: {
      url: '/images/hero-pm.jpg',
      alt: 'San Diego property management',
      width: 800,
      height: 533,
    },
    category: { name: 'Regulations', slug: 'regulations' },
    tags: [
      { name: 'San Diego', slug: 'san-diego' },
      { name: 'Permits', slug: 'permits' },
    ],
    author: { name: 'Mike Corrales', avatar: '/images/mike-corrales.jpeg' },
  },
  {
    id: 7,
    slug: 'ai-pricing-tools-vacation-rentals',
    title: 'How AI Pricing Tools Are Reshaping Vacation Rental Revenue in 2025',
    excerpt:
      'From PriceLabs to Wheelhouse, AI-powered dynamic pricing tools are helping hosts earn 30–40% more. Here\'s how they work and which one is right for you.',
    content: '',
    date: '2025-12-01T10:00:00',
    modified: '2025-12-01T10:00:00',
    featuredImage: {
      url: '/images/property-sunset-estate.jpg',
      alt: 'AI technology for vacation rentals',
      width: 800,
      height: 533,
    },
    category: { name: 'AI & Technology', slug: 'ai' },
    tags: [
      { name: 'AI', slug: 'ai' },
      { name: 'Pricing', slug: 'pricing' },
    ],
    author: { name: 'Mike Corrales', avatar: '/images/mike-corrales.jpeg' },
  },
  {
    id: 6,
    slug: 'temecula-wine-country-hosting-tips',
    title: 'Temecula Wine Country: What Makes a Vacation Rental Stand Out',
    excerpt:
      'Temecula is one of California\'s fastest-growing STR markets. Here\'s how to position your property for premium bookings.',
    content: '',
    date: '2025-08-22T10:00:00',
    modified: '2025-08-22T10:00:00',
    featuredImage: {
      url: '/images/property-vineyard-retreat.jpg',
      alt: 'Temecula wine country rental',
      width: 800,
      height: 533,
    },
    category: { name: 'Hosting', slug: 'hosting' },
    tags: [
      { name: 'Temecula', slug: 'temecula' },
      { name: 'Wine Country', slug: 'wine-country' },
    ],
    author: { name: 'Mike Corrales', avatar: '/images/mike-corrales.jpeg' },
  },
]

// ─── Normalizer ──────────────────────────────────────────────

function normalizePost(post: WPPost, categories: WPCategory[]): BlogPost {
  const embedded = post._embedded
  const media = embedded?.['wp:featuredmedia']?.[0]
  const terms = embedded?.['wp:term']?.[0] ?? []
  const tagTerms = embedded?.['wp:term']?.[1] ?? []
  const author = embedded?.author?.[0]

  const postCatId = post.categories?.[0]
  const cat = categories.find((c) => c.id === postCatId) ?? terms[0]

  return {
    id: post.id,
    slug: post.slug,
    title: normalizeMarketingCopy(decodeHTML(post.title.rendered)),
    excerpt: normalizeMarketingCopy(decodeHTML(stripHTML(post.excerpt.rendered))),
    content: normalizeMarketingHTML(post.content.rendered),
    date: post.date,
    modified: post.modified,
    featuredImage: media
      ? {
          url: media.source_url,
          alt: normalizeMarketingCopy(media.alt_text || ''),
          width: media.media_details?.width ?? 800,
          height: media.media_details?.height ?? 533,
        }
      : null,
    category: cat
      ? { name: normalizeMarketingCopy(decodeHTML(cat.name)), slug: cat.slug }
      : { name: 'Uncategorized', slug: 'uncategorized' },
    tags: tagTerms.map((t: { name: string; slug: string }) => ({
      name: normalizeMarketingCopy(decodeHTML(t.name)),
      slug: t.slug === 'luxury-rentals' ? 'high-end-rentals' : t.slug,
    })),
    author: {
      name: author?.name ?? 'Allura Homes',
      avatar: author?.avatar_urls?.['96'] ?? null,
    },
  }
}

function stripHTML(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim()
}

function decodeHTML(text: string): string {
  return text
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
}

// ─── Concurrency limiter ─────────────────────────────────────
let activeFetches = 0
const waitForSlot = () => new Promise<void>(resolve => {
  const check = () => {
    if (activeFetches < CONCURRENCY_LIMIT) {
      activeFetches++
      resolve()
    } else {
      setTimeout(check, 50)
    }
  }
  check()
})

// ─── Fetcher ─────────────────────────────────────────────────

async function wpFetch<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  if (!WP_API_URL) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[WordPress] WORDPRESS_API_URL not set, returning empty data')
    }
    throw new WordPressUnavailableError('WORDPRESS_API_URL not configured')
  }

  await waitForSlot()
  try {
    return await _wpFetchInternal<T>(endpoint, params)
  } finally {
    activeFetches--
  }
}

async function _wpFetchInternal<T>(endpoint: string, params?: Record<string, string>, isRetry = false): Promise<T> {
  const url = new URL(`${WP_API_URL}${endpoint}`)
  if (params) {
    Object.entries(params).forEach(([key, val]) => url.searchParams.set(key, val))
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 300 },
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    })
    clearTimeout(timeout)

    if (res.status !== 200) {
      throw new WordPressUnavailableError(`WordPress returned status ${res.status}`)
    }

    const contentType = res.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) {
      throw new WordPressUnavailableError(`WordPress returned non-JSON content-type: ${contentType}`)
    }

    if (res.headers.get('sg-captcha')) {
      throw new WordPressUnavailableError('WordPress challenge detected (sg-captcha header)')
    }

    try {
      return await res.json()
    } catch (err) {
      throw new WordPressUnavailableError('WordPress returned malformed JSON', err)
    }
  } catch (err) {
    clearTimeout(timeout)

    if (err instanceof WordPressUnavailableError) {
      throw err
    }

    if (err instanceof Error && err.name === 'AbortError') {
      throw new WordPressUnavailableError('WordPress request timeout', err)
    }

    if (!isRetry && !WP_API_URL_IS_HTTP) {
      await new Promise(resolve => setTimeout(resolve, 750))
      return _wpFetchInternal<T>(endpoint, params, true)
    }

    throw new WordPressUnavailableError('WordPress network error', err)
  }
}

async function wpFetchWithHeaders<T>(
  endpoint: string,
  params?: Record<string, string>
): Promise<{ data: T; total: number; pages: number }> {
  if (!WP_API_URL) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[WordPress] WORDPRESS_API_URL not set, returning empty data')
    }
    throw new WordPressUnavailableError('WORDPRESS_API_URL not configured')
  }

  await waitForSlot()
  try {
    return await _wpFetchWithHeadersInternal<T>(endpoint, params)
  } finally {
    activeFetches--
  }
}

async function _wpFetchWithHeadersInternal<T>(
  endpoint: string,
  params?: Record<string, string>,
  isRetry = false
): Promise<{ data: T; total: number; pages: number }> {
  const url = new URL(`${WP_API_URL}${endpoint}`)
  if (params) {
    Object.entries(params).forEach(([key, val]) => url.searchParams.set(key, val))
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 300 },
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    })
    clearTimeout(timeout)

    if (res.status !== 200) {
      throw new WordPressUnavailableError(`WordPress returned status ${res.status}`)
    }

    const contentType = res.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) {
      throw new WordPressUnavailableError(`WordPress returned non-JSON content-type: ${contentType}`)
    }

    if (res.headers.get('sg-captcha')) {
      throw new WordPressUnavailableError('WordPress challenge detected (sg-captcha header)')
    }

    const total = parseInt(res.headers.get('X-WP-Total') ?? '0', 10)
    const pages = parseInt(res.headers.get('X-WP-TotalPages') ?? '1', 10)

    try {
      const data: T = await res.json()
      return { data, total, pages }
    } catch (err) {
      throw new WordPressUnavailableError('WordPress returned malformed JSON', err)
    }
  } catch (err) {
    clearTimeout(timeout)

    if (err instanceof WordPressUnavailableError) {
      throw err
    }

    if (err instanceof Error && err.name === 'AbortError') {
      throw new WordPressUnavailableError('WordPress request timeout', err)
    }

    if (!isRetry && !WP_API_URL_IS_HTTP) {
      await new Promise(resolve => setTimeout(resolve, 750))
      return _wpFetchWithHeadersInternal<T>(endpoint, params, true)
    }

    throw new WordPressUnavailableError('WordPress network error', err)
  }
}

// ─── Public API ──────────────────────────────────────────────

export async function getCategories(): Promise<BlogCategory[]> {
  const wpCats = await wpFetch<WPCategory[]>('/categories', {
    per_page: '50',
    hide_empty: 'true',
  })

  return wpCats
    .filter((c) => c.slug !== 'uncategorized')
    .map((c) => ({
      name: decodeHTML(c.name),
      slug: c.slug,
      description: normalizeMarketingCopy(decodeHTML(c.description)),
      count: c.count,
    }))
}

export async function getPostsByCategory(
  categorySlug: string,
  page = 1,
  perPage = 12
): Promise<{ posts: BlogPost[]; total: number; pages: number }> {
  const allCategories = await wpFetch<WPCategory[]>('/categories', {
    slug: categorySlug,
    per_page: '50',
  })

  if (allCategories.length === 0) {
    return { posts: [], total: 0, pages: 0 }
  }

  const category = allCategories[0]
  const allCats = await wpFetch<WPCategory[]>('/categories', { per_page: '50' })

  const { data: wpPosts, total, pages } = await wpFetchWithHeaders<WPPost[]>('/posts', {
    categories: String(category.id),
    per_page: String(perPage),
    page: String(page),
    _embed: 'true',
    orderby: 'date',
    order: 'desc',
  })

  return {
    posts: wpPosts.map((p) => normalizePost(p, allCats)),
    total,
    pages,
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const wpPosts = await wpFetch<WPPost[]>('/posts', {
    slug,
    _embed: 'true',
  })

  if (wpPosts.length === 0) {
    return null
  }

  const allCats = await wpFetch<WPCategory[]>('/categories', { per_page: '50' })
  return normalizePost(wpPosts[0], allCats)
}

export async function getAllPosts(page = 1, perPage = 20): Promise<BlogPost[]> {
  const allCats = await wpFetch<WPCategory[]>('/categories', { per_page: '50' })

  const wpPosts = await wpFetch<WPPost[]>('/posts', {
    per_page: String(perPage),
    page: String(page),
    _embed: 'true',
    orderby: 'date',
    order: 'desc',
  })

  return wpPosts.map((p) => normalizePost(p, allCats))
}

export async function getPublishedPostsForSitemap(): Promise<{ slug: string; modified: string; category: string }[]> {
  const categories = await wpFetch<WPCategory[]>('/categories', { per_page: '100', _fields: 'id,slug' })

  const allowed = new Set(['hosting', 'regulations', 'ai'])
  const result: { slug: string; modified: string; category: string }[] = []
  let page = 1
  let pageCount = 1
  do {
    const { data, pages } = await wpFetchWithHeaders<Pick<WPPost, 'slug' | 'modified' | 'categories'>[]>('/posts', {
      status: 'publish', per_page: '100', page: String(page), _fields: 'slug,modified,categories',
    })
    for (const post of data) {
      const category = categories.find(cat => post.categories.includes(cat.id) && allowed.has(cat.slug))
      if (category) result.push({ slug: post.slug, modified: post.modified, category: category.slug })
    }
    pageCount = pages
    page++
  } while (page <= pageCount)
  return result
}

export async function getCategoryBySlug(slug: string): Promise<BlogCategory | null> {
  const cats = await getCategories()
  return cats.find((c) => c.slug === slug) ?? null
}
