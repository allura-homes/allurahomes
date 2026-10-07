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
