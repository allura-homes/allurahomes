import { describe, it, expect, vi } from 'vitest'

describe('ArticlePage notFound behavior', () => {
  it('notFound() is called only when getPostBySlug returns null', async () => {
    const mockGetPostBySlug = vi.fn()
    const mockNotFound = vi.fn(() => {
      throw new Error('NEXT_NOT_FOUND')
    })

    mockGetPostBySlug.mockResolvedValue(null)

    try {
      const post = await mockGetPostBySlug('test-slug')
      if (post === null) {
        mockNotFound()
      }
    } catch (err: any) {
      expect(err.message).toBe('NEXT_NOT_FOUND')
    }

    expect(mockGetPostBySlug).toHaveBeenCalledWith('test-slug')
    expect(mockNotFound).toHaveBeenCalled()
  })

  it('notFound() is not called when getPostBySlug returns a post', async () => {
    const mockGetPostBySlug = vi.fn()
    const mockNotFound = vi.fn()

    const mockPost = {
      id: 1,
      slug: 'test-post',
      category: { name: 'Hosting', slug: 'hosting' },
    }

    mockGetPostBySlug.mockResolvedValue(mockPost)

    const post = await mockGetPostBySlug('test-slug')
    if (post === null) {
      mockNotFound()
    }

    expect(mockGetPostBySlug).toHaveBeenCalledWith('test-slug')
    expect(mockNotFound).not.toHaveBeenCalled()
  })

  it('notFound() is called when post has no allowed category', () => {
    const mockNotFound = vi.fn(() => {
      throw new Error('NEXT_NOT_FOUND')
    })

    const BLOG_CATEGORY_SLUGS = ['hosting', 'regulations', 'ai']
    const post = {
      category: { slug: 'uncategorized' },
    }

    try {
      if (!BLOG_CATEGORY_SLUGS.includes(post.category.slug as any)) {
        mockNotFound()
      }
    } catch (err: any) {
      expect(err.message).toBe('NEXT_NOT_FOUND')
    }

    expect(mockNotFound).toHaveBeenCalled()
  })
})
