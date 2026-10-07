import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockGetPostBySlug = vi.fn()
const mockGetPostsByCategory = vi.fn()
const mockGetCategories = vi.fn()
const mockNotFound = vi.fn(() => {
  throw new Error('NEXT_NOT_FOUND')
})
const mockPermanentRedirect = vi.fn((path: string) => {
  throw new Error(`NEXT_REDIRECT:${path}`)
})

vi.mock('@/lib/wordpress/api', () => ({
  getPostBySlug: (...args: any[]) => mockGetPostBySlug(...args),
  getPostsByCategory: (...args: any[]) => mockGetPostsByCategory(...args),
  getCategories: (...args: any[]) => mockGetCategories(...args),
  WordPressUnavailableError: class extends Error {},
}))

vi.mock('next/navigation', () => ({
  notFound: () => mockNotFound(),
  permanentRedirect: (path: string) => mockPermanentRedirect(path),
}))

import ArticlePage, { generateMetadata, generateStaticParams } from '../page'

describe('ArticlePage real implementation tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('notFound() is called when getPostBySlug returns null', async () => {
    mockGetPostBySlug.mockResolvedValue(null)

    await expect(
      ArticlePage({ params: Promise.resolve({ category: 'hosting', slug: 'nonexistent' }) })
    ).rejects.toThrow('NEXT_NOT_FOUND')

    expect(mockNotFound).toHaveBeenCalled()
    expect(mockPermanentRedirect).not.toHaveBeenCalled()
  })

  it('notFound() is called for uncategorized post, never permanentRedirect', async () => {
    mockGetPostBySlug.mockResolvedValue({
      id: 1,
      slug: 'test',
      category: { name: 'Uncategorized', slug: 'uncategorized' },
    })

    await expect(
      ArticlePage({ params: Promise.resolve({ category: 'hosting', slug: 'test' }) })
    ).rejects.toThrow('NEXT_NOT_FOUND')

    expect(mockNotFound).toHaveBeenCalled()
    expect(mockPermanentRedirect).not.toHaveBeenCalled()
  })

  it('permanentRedirect is called for wrong category to canonical path', async () => {
    mockGetPostBySlug.mockResolvedValue({
      id: 1,
      slug: 'test',
      category: { name: 'Hosting', slug: 'hosting' },
    })
    mockGetPostsByCategory.mockResolvedValue({
      posts: [],
      total: 0,
      pages: 0,
    })

    await expect(
      ArticlePage({ params: Promise.resolve({ category: 'regulations', slug: 'test' }) })
    ).rejects.toThrow('NEXT_REDIRECT:/hosting/test')

    expect(mockPermanentRedirect).toHaveBeenCalledWith('/hosting/test')
    expect(mockNotFound).not.toHaveBeenCalled()
  })

  it('WordPressUnavailableError propagates and does not become notFound', async () => {
    const { WordPressUnavailableError } = await import('@/lib/wordpress/api')
    mockGetPostBySlug.mockRejectedValue(new WordPressUnavailableError('WordPress down'))

    await expect(
      ArticlePage({ params: Promise.resolve({ category: 'hosting', slug: 'test' }) })
    ).rejects.toThrow('WordPress down')

    expect(mockNotFound).not.toHaveBeenCalled()
  })

  it('generateMetadata returns {} for uncategorized post', async () => {
    mockGetPostBySlug.mockResolvedValue({
      id: 1,
      slug: 'test',
      title: 'Test Post',
      excerpt: 'Test excerpt',
      date: '2024-01-01',
      modified: '2024-01-01',
      category: { name: 'Uncategorized', slug: 'uncategorized' },
      author: { name: 'Test' },
    })

    const metadata = await generateMetadata({
      params: Promise.resolve({ category: 'hosting', slug: 'test' }),
    })

    expect(metadata).toEqual({})
  })

  it('generateStaticParams skips uncategorized posts and dedupes', async () => {
    mockGetCategories.mockResolvedValue([
      { name: 'Hosting', slug: 'hosting', description: '', count: 2 },
      { name: 'Regulations', slug: 'regulations', description: '', count: 1 },
    ])

    mockGetPostsByCategory
      .mockResolvedValueOnce({
        posts: [
          { id: 1, slug: 'post1', category: { slug: 'hosting' } },
          { id: 2, slug: 'post2', category: { slug: 'uncategorized' } },
          { id: 3, slug: 'post3', category: { slug: 'hosting' } },
        ],
        total: 3,
        pages: 1,
      })
      .mockResolvedValueOnce({
        posts: [
          { id: 3, slug: 'post3', category: { slug: 'hosting' } },
        ],
        total: 1,
        pages: 1,
      })

    const params = await generateStaticParams()

    expect(params).toEqual([
      { category: 'hosting', slug: 'post1' },
      { category: 'hosting', slug: 'post3' },
    ])
  })
})
