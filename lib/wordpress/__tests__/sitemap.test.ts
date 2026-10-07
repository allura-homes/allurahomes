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

describe('getPublishedPostsForSitemap legacy filtering', () => {
  it('includes hosting-only post, excludes hosting-resources-only post, includes post with both', async () => {
    const mockCategories = [
      { id: 1, slug: 'hosting' },
      { id: 2, slug: 'regulations' },
      { id: 3, slug: 'ai' },
      { id: 4, slug: 'hosting-resources' },
      { id: 5, slug: 'shortterm-rental-regulations' },
    ]

    const mockPosts = [
      {
        slug: 'post-in-hosting-only',
        modified: '2024-01-01',
        categories: [1],
      },
      {
        slug: 'post-in-legacy-only',
        modified: '2024-01-02',
        categories: [4],
      },
      {
        slug: 'post-in-both',
        modified: '2024-01-03',
        categories: [1, 4],
      },
    ]

    let fetchCallCount = 0
    global.fetch = vi.fn().mockImplementation((url: string) => {
      fetchCallCount++
      
      if (url.includes('/categories')) {
        return Promise.resolve({
          status: 200,
          headers: {
            get: (name: string) => (name === 'content-type' ? 'application/json' : null),
          },
          json: () => Promise.resolve(mockCategories),
        })
      }
      
      if (url.includes('/posts')) {
        return Promise.resolve({
          status: 200,
          headers: {
            get: (name: string) => {
              if (name === 'content-type') return 'application/json'
              if (name === 'X-WP-Total') return '3'
              if (name === 'X-WP-TotalPages') return '1'
              return null
            },
          },
          json: () => Promise.resolve(mockPosts),
        })
      }

      return Promise.reject(new Error('Unexpected fetch'))
    })

    const { getPublishedPostsForSitemap } = await import('../api')
    const result = await getPublishedPostsForSitemap()

    expect(result).toHaveLength(2)
    expect(result).toContainEqual({
      slug: 'post-in-hosting-only',
      modified: '2024-01-01',
      category: 'hosting',
    })
    expect(result).toContainEqual({
      slug: 'post-in-both',
      modified: '2024-01-03',
      category: 'hosting',
    })
    expect(result.find(p => p.slug === 'post-in-legacy-only')).toBeUndefined()
  })
})
