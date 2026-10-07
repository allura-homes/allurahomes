import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const originalEnv = process.env.WORDPRESS_API_URL
const originalFetch = global.fetch

beforeEach(() => {
  process.env.WORDPRESS_API_URL = 'https://blog.example.com'
  vi.clearAllMocks()
})

afterEach(() => {
  process.env.WORDPRESS_API_URL = originalEnv
  global.fetch = originalFetch
})

describe('WordPress fetch failure semantics', () => {
  it('throws WordPressUnavailableError on SiteGround captcha (202 + HTML + sg-captcha)', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      status: 202,
      headers: {
        get: (name: string) => {
          if (name === 'content-type') return 'text/html'
          if (name === 'sg-captcha') return 'challenge'
          return null
        },
      },
    })

    const { getPostBySlug, WordPressUnavailableError } = await import('../api')
    await expect(getPostBySlug('test-slug')).rejects.toThrow(WordPressUnavailableError)
    await expect(getPostBySlug('test-slug')).rejects.toThrow('WordPress returned status 202')
  })

  it('throws WordPressUnavailableError on 500', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      status: 500,
      headers: { get: () => null },
    })

    const { getPostBySlug, WordPressUnavailableError } = await import('../api')
    await expect(getPostBySlug('test-slug')).rejects.toThrow(WordPressUnavailableError)
    await expect(getPostBySlug('test-slug')).rejects.toThrow('WordPress returned status 500')
  })

  it('throws WordPressUnavailableError on 403', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      status: 403,
      headers: { get: () => null },
    })

    const { getPostBySlug, WordPressUnavailableError } = await import('../api')
    await expect(getPostBySlug('test-slug')).rejects.toThrow(WordPressUnavailableError)
    await expect(getPostBySlug('test-slug')).rejects.toThrow('WordPress returned status 403')
  })

  it('throws WordPressUnavailableError on 200 + HTML', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      status: 200,
      headers: {
        get: (name: string) => (name === 'content-type' ? 'text/html' : null),
      },
    })

    const { getPostBySlug, WordPressUnavailableError } = await import('../api')
    await expect(getPostBySlug('test-slug')).rejects.toThrow(WordPressUnavailableError)
    await expect(getPostBySlug('test-slug')).rejects.toThrow('non-JSON content-type')
  })

  it('throws WordPressUnavailableError on invalid JSON', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      status: 200,
      headers: {
        get: (name: string) => (name === 'content-type' ? 'application/json' : null),
      },
      json: () => Promise.reject(new Error('Invalid JSON')),
    })

    const { getPostBySlug, WordPressUnavailableError } = await import('../api')
    await expect(getPostBySlug('test-slug')).rejects.toThrow(WordPressUnavailableError)
    await expect(getPostBySlug('test-slug')).rejects.toThrow('malformed JSON')
  })

  it('throws WordPressUnavailableError on timeout', async () => {
    global.fetch = vi.fn().mockImplementation(() => {
      return new Promise((_, reject) => {
        const error = new Error('Timeout')
        error.name = 'AbortError'
        setTimeout(() => reject(error), 100)
      })
    })

    const { getPostBySlug, WordPressUnavailableError } = await import('../api')
    await expect(getPostBySlug('test-slug')).rejects.toThrow(WordPressUnavailableError)
    await expect(getPostBySlug('test-slug')).rejects.toThrow('timeout')
  })

  it('throws WordPressUnavailableError on network error with exactly one retry', async () => {
    let callCount = 0
    global.fetch = vi.fn().mockImplementation(() => {
      callCount++
      return Promise.reject(new Error('Network error'))
    })

    const { getPostBySlug, WordPressUnavailableError } = await import('../api')
    await expect(getPostBySlug('test-slug')).rejects.toThrow(WordPressUnavailableError)
    await expect(getPostBySlug('test-slug')).rejects.toThrow('WordPress network error')
    expect(callCount).toBe(4)
  })

  it('returns null on 200 + empty array', async () => {
    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        status: 200,
        headers: {
          get: (name: string) => (name === 'content-type' ? 'application/json' : null),
        },
        json: () => Promise.resolve([]),
      })

    const { getPostBySlug } = await import('../api')
    const result = await getPostBySlug('nonexistent-slug')
    expect(result).toBeNull()
  })

  it('returns post data on 200 + valid JSON', async () => {
    const mockPost = {
      id: 1,
      slug: 'test-post',
      title: { rendered: 'Test Post' },
      excerpt: { rendered: 'Test excerpt' },
      content: { rendered: 'Test content' },
      date: '2024-01-01',
      modified: '2024-01-01',
      categories: [1],
      tags: [],
      author: 1,
      featured_media: 0,
      _embedded: {
        'wp:term': [[{ id: 1, name: 'Hosting', slug: 'hosting' }], []],
        author: [{ id: 1, name: 'Test Author' }],
      },
    }

    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        status: 200,
        headers: {
          get: (name: string) => (name === 'content-type' ? 'application/json' : null),
        },
        json: () => Promise.resolve([mockPost]),
      })
      .mockResolvedValueOnce({
        status: 200,
        headers: {
          get: (name: string) => (name === 'content-type' ? 'application/json' : null),
        },
        json: () => Promise.resolve([{ id: 1, name: 'Hosting', slug: 'hosting' }]),
      })

    const { getPostBySlug } = await import('../api')
    const result = await getPostBySlug('test-post')
    expect(result).not.toBeNull()
    expect(result?.slug).toBe('test-post')
  })
})
