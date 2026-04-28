// ─── WordPress REST API Response Types ───────────────────────

export type WPPost = {
  id: number
  slug: string
  date: string
  modified: string
  title: { rendered: string }
  excerpt: { rendered: string }
  content: { rendered: string }
  featured_media: number
  categories: number[]
  tags: number[]
  author: number
  _embedded?: {
    'wp:featuredmedia'?: WPMedia[]
    'wp:term'?: WPTerm[][]
    author?: WPAuthor[]
  }
}

export type WPCategory = {
  id: number
  name: string
  slug: string
  description: string
  count: number
  parent: number
}

export type WPTag = {
  id: number
  name: string
  slug: string
  count: number
}

export type WPMedia = {
  id: number
  source_url: string
  alt_text: string
  media_details?: {
    width: number
    height: number
    sizes?: Record<
      string,
      { source_url: string; width: number; height: number }
    >
  }
}

export type WPAuthor = {
  id: number
  name: string
  slug: string
  avatar_urls?: Record<string, string>
  description?: string
}

// ─── Normalized Types (for our components) ───────────────────

export type BlogPost = {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  modified: string
  featuredImage: {
    url: string
    alt: string
    width: number
    height: number
  } | null
  category: {
    name: string
    slug: string
  }
  tags: { name: string; slug: string }[]
  author: {
    name: string
    avatar: string | null
  }
}

export type BlogCategory = {
  name: string
  slug: string
  description: string
  count: number
}
