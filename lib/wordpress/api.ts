import type {
  WPPost,
  WPCategory,
  BlogPost,
  BlogCategory,
} from './types'

// ─── Configuration ───────────────────────────────────────────
// Set WORDPRESS_API_URL env var to your WordPress site URL.
// e.g. http://blog.allurahomes.com
// If the blog doesn't have SSL, use http:// — the code will also auto-fallback from https→http.
const _rawWpUrl = (process.env.WORDPRESS_API_URL ?? '').trim().replace(/\/$/, '')
const WP_API_URL = _rawWpUrl ? `${_rawWpUrl}/wp-json/wp/v2` : null
// If env var was set with https but the server only supports http, derive a fallback
const WP_API_URL_HTTP_FALLBACK =
  WP_API_URL && WP_API_URL.startsWith('https://')
    ? WP_API_URL.replace('https://', 'http://')
    : null

// ─── Demo Data (used when no WordPress is connected) ─────────
const DEMO_CATEGORIES: BlogCategory[] = [
  {
    name: 'Hosting Resources',
    slug: 'hosting',
    description:
      'Expert tips, strategies, and guides to maximize your vacation rental performance.',
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
      alt: 'Luxury San Diego vacation rental',
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
      'Stop leaving money on the table. Here\'s how to implement dynamic pricing that maximizes revenue without sacrificing occupancy.',
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
  const cat = categories.find((c) => c.id === postCatId) ??
    (terms[0] as WPCategory | undefined)

  return {
    id: post.id,
    slug: post.slug,
    title: decodeHTML(post.title.rendered),
    excerpt: decodeHTML(stripHTML(post.excerpt.rendered)),
    content: post.content.rendered,
    date: post.date,
    modified: post.modified,
    featuredImage: media
      ? {
          url: media.source_url,
          alt: media.alt_text || '',
          width: media.media_details?.width ?? 800,
          height: media.media_details?.height ?? 533,
        }
      : null,
    category: cat
      ? { name: cat.name, slug: cat.slug }
      : { name: 'Uncategorized', slug: 'uncategorized' },
    tags: tagTerms.map((t: { name: string; slug: string }) => ({
      name: t.name,
      slug: t.slug,
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

// ─── Fetcher ─────────────────────────────────────────────────

async function wpFetch<T>(endpoint: string, params?: Record<string, string>): Promise<T | null> {
  if (!WP_API_URL) return null

  const url = new URL(`${WP_API_URL}${endpoint}`)
  if (params) {
    Object.entries(params).forEach(([key, val]) => url.searchParams.set(key, val))
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)
    const res = await fetch(url.toString(), {
      next: { revalidate: 300 },
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    })
    clearTimeout(timeout)
    if (!res.ok) return null
    return res.json()
  } catch {
    // If HTTPS failed, retry with HTTP fallback
    if (WP_API_URL_HTTP_FALLBACK && url.toString().startsWith('https://')) {
      try {
        const httpUrl = new URL(url.toString().replace('https://', 'http://'))
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 10000)
        const res = await fetch(httpUrl.toString(), {
          next: { revalidate: 300 },
          signal: controller.signal,
          headers: { Accept: 'application/json' },
        })
        clearTimeout(timeout)
        if (!res.ok) return null
        return res.json()
      } catch {
        return null
      }
    }
    return null
  }
}

// Fetcher that also returns WP pagination headers
async function wpFetchWithHeaders<T>(
  endpoint: string,
  params?: Record<string, string>
): Promise<{ data: T | null; total: number; pages: number }> {
  if (!WP_API_URL) return { data: null, total: 0, pages: 0 }

  const url = new URL(`${WP_API_URL}${endpoint}`)
  if (params) {
    Object.entries(params).forEach(([key, val]) => url.searchParams.set(key, val))
  }

  async function _fetchWithHeaders(fetchUrl: string) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)
    const res = await fetch(fetchUrl, {
      next: { revalidate: 300 },
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    })
    clearTimeout(timeout)
    if (!res.ok) return { data: null as T | null, total: 0, pages: 0 }
    const total = parseInt(res.headers.get('X-WP-Total') ?? '0', 10)
    const pages = parseInt(res.headers.get('X-WP-TotalPages') ?? '1', 10)
    const data: T = await res.json()
    return { data, total, pages }
  }

  try {
    return await _fetchWithHeaders(url.toString())
  } catch {
    // HTTPS→HTTP fallback
    if (WP_API_URL_HTTP_FALLBACK && url.toString().startsWith('https://')) {
      try {
        return await _fetchWithHeaders(url.toString().replace('https://', 'http://'))
      } catch {
        return { data: null, total: 0, pages: 0 }
      }
    }
    return { data: null, total: 0, pages: 0 }
  }
}

// ─── Public API ──────────────────────────────────────────────

export async function getCategories(): Promise<BlogCategory[]> {
  const wpCats = await wpFetch<WPCategory[]>('/categories', {
    per_page: '50',
    hide_empty: 'true',
  })

  if (!wpCats) return DEMO_CATEGORIES

  return wpCats
    .filter((c) => c.slug !== 'uncategorized')
    .map((c) => ({
      name: decodeHTML(c.name),
      slug: c.slug,
      description: decodeHTML(c.description),
      count: c.count,
    }))
}

export async function getPostsByCategory(
  categorySlug: string,
  page = 1,
  perPage = 12
): Promise<{ posts: BlogPost[]; total: number; pages: number }> {
  // Resolve the category by slug
  const allCategories = await wpFetch<WPCategory[]>('/categories', {
    slug: categorySlug,
    per_page: '50',
  })

  if (!allCategories || allCategories.length === 0) {
    const demoPosts = DEMO_POSTS.filter((p) => p.category.slug === categorySlug)
    return { posts: demoPosts, total: demoPosts.length, pages: 1 }
  }

  const category = allCategories[0]
  const allCats = (await wpFetch<WPCategory[]>('/categories', { per_page: '50' })) ?? []

  // Use header-aware fetcher to get correct total + pages from WP REST API
  const { data: wpPosts, total, pages } = await wpFetchWithHeaders<WPPost[]>('/posts', {
    categories: String(category.id),
    per_page: String(perPage),
    page: String(page),
    _embed: 'true',
    orderby: 'date',
    order: 'desc',
  })

  if (!wpPosts) {
    const demoPosts = DEMO_POSTS.filter((p) => p.category.slug === categorySlug)
    return { posts: demoPosts, total: demoPosts.length, pages: 1 }
  }

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

  if (!wpPosts || wpPosts.length === 0) {
    return DEMO_POSTS.find((p) => p.slug === slug) ?? null
  }

  const allCats = (await wpFetch<WPCategory[]>('/categories', { per_page: '50' })) ?? []
  return normalizePost(wpPosts[0], allCats)
}

export async function getAllPosts(page = 1, perPage = 20): Promise<BlogPost[]> {
  const allCats = (await wpFetch<WPCategory[]>('/categories', { per_page: '50' })) ?? []

  const wpPosts = await wpFetch<WPPost[]>('/posts', {
    per_page: String(perPage),
    page: String(page),
    _embed: 'true',
    orderby: 'date',
    order: 'desc',
  })

  if (!wpPosts) return DEMO_POSTS
  return wpPosts.map((p) => normalizePost(p, allCats))
}

export async function getCategoryBySlug(slug: string): Promise<BlogCategory | null> {
  const cats = await getCategories()
  return cats.find((c) => c.slug === slug) ?? null
}
