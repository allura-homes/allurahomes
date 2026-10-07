import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { WordPressUnavailableError } from '../api'

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

async function importApi() {
  delete require.cache[require.resolve('../api')]
  return await import('../api')
}

describe('WordPress fetch failure semantics', () => {
  it('throws WordPressUnavailableError on 202 + text/html + sg-captcha header', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      status: 202,
      ok: true,
      headers: {
        get: (name: string) => {
          if (name === 'content-type') return 'text/html'
          if (name === 'sg-captcha') return 'challenge'
          return null
        },
      },
    })

    const { getPostBySlug } = await importApi()
    await expect(getPostBySlug('test-slug')).rejects.toThrow(WordPressUnavailableError)
  })

  it('throws WordPressUnavailableError on 500', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      status: 500,
      ok: false,
      headers: { get: () => null },
    })

    const { getPostBySlug } = await importApi()
    await expect(getPostBySlug('test-slug')).rejects.toThrow(WordPressUnavailableError)
  })

  it('throws WordPressUnavailableError on 403', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      status: 403,
      ok: false,
      headers: { get: () => null },
    })

    const { getPostBySlug } = await importApi()
    await expect(getPostBySlug('test-slug')).rejects.toThrow(WordPressUnavailableError)
  })

  it('throws WordPressUnavailableError on 200 + text/html', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      status: 200,
      ok: true,
      headers: {
        get: (name: string) => (name === 'content-type' ? 'text/html' : null),
      },
    })

    const { getPostBySlug } = await importApi()
    await expect(getPostBySlug('test-slug')).rejects.toThrow(WordPressUnavailableError)
  })

  it('throws WordPressUnavailableError on 200 + malformed JSON', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      status: 200,
      ok: true,
      headers: {
        get: (name: string) => (name === 'content-type' ? 'application/json' : null),
      },
      json: () => Promise.reject(new Error('Invalid JSON')),
    })

    const { getPostBySlug } = await importApi()
    await expect(getPostBySlug('test-slug')).rejects.toThrow(WordPressUnavailableError)
  })

  it('throws WordPressUnavailableError on AbortError', async () => {
    const abortError = new Error('Aborted')
    abortError.name = 'AbortError'
    global.fetch = vi.fn().mockRejectedValue(abortError)

    const { getPostBySlug } = await importApi()
    await expect(getPostBySlug('test-slug')).rejects.toThrow(WordPressUnavailableError)
  })

  it('throws WordPressUnavailableError on network error', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

    const { getPostBySlug } = await importApi()
    await expect(getPostBySlug('test-slug')).rejects.toThrow(WordPressUnavailableError)
  })

  it('returns data on 200 + valid JSON array', async () => {
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
        ok: true,
        headers: {
          get: (name: string) => (name === 'content-type' ? 'application/json' : null),
        },
        json: () => Promise.resolve([mockPost]),
      })
      .mockResolvedValueOnce({
        status: 200,
        ok: true,
        headers: {
          get: (name: string) => (name === 'content-type' ? 'application/json' : null),
        },
        json: () => Promise.resolve([{ id: 1, name: 'Hosting', slug: 'hosting' }]),
      })

    const { getPostBySlug } = await importApi()
    const result = await getPostBySlug('test-post')
    expect(result).not.toBeNull()
    expect(result?.slug).toBe('test-post')
  })

  it('returns null on 200 + empty array', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      status: 200,
      ok: true,
      headers: {
        get: (name: string) => (name === 'content-type' ? 'application/json' : null),
      },
      json: () => Promise.resolve([]),
    })

    const { getPostBySlug } = await importApi()
    const result = await getPostBySlug('nonexistent-slug')
    expect(result).toBeNull()
  })
})
