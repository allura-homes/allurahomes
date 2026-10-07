import { describe, it, expect } from 'vitest'
import { pickCanonicalCategory, CANONICAL_CATEGORIES } from '../canonical'

describe('pickCanonicalCategory', () => {
  const mockCategories = [
    { id: 1, slug: 'hosting' },
    { id: 2, slug: 'regulations' },
    { id: 3, slug: 'ai' },
    { id: 4, slug: 'hosting-resources' },
    { id: 5, slug: 'shortterm-rental-regulations' },
    { id: 6, slug: 'news' },
  ]

  it('returns first allowed category in API order', () => {
    const result = pickCanonicalCategory([1], mockCategories)
    expect(result).toBe('hosting')
  })

  it('picks first allowed category when post has multiple', () => {
    const result = pickCanonicalCategory([2, 1], mockCategories)
    expect(result).toBe('hosting')
  })

  it('picks regulations when it appears before hosting in category list', () => {
    const reorderedCats = [
      { id: 2, slug: 'regulations' },
      { id: 1, slug: 'hosting' },
      { id: 3, slug: 'ai' },
    ]
    const result = pickCanonicalCategory([1, 2], reorderedCats)
    expect(result).toBe('regulations')
  })

  it('maps legacy hosting-resources to hosting', () => {
    const result = pickCanonicalCategory([4], mockCategories)
    expect(result).toBe('hosting')
  })

  it('maps legacy shortterm-rental-regulations to regulations', () => {
    const result = pickCanonicalCategory([5], mockCategories)
    expect(result).toBe('regulations')
  })

  it('returns null when no allowed or legacy categories', () => {
    const result = pickCanonicalCategory([6], mockCategories)
    expect(result).toBeNull()
  })

  it('returns null when category list is empty', () => {
    const result = pickCanonicalCategory([1], [])
    expect(result).toBeNull()
  })

  it('returns null when post has no categories', () => {
    const result = pickCanonicalCategory([], mockCategories)
    expect(result).toBeNull()
  })

  it('prefers allowed category over legacy when both present', () => {
    const result = pickCanonicalCategory([4, 1], mockCategories)
    expect(result).toBe('hosting')
  })

  it('produces same result as sitemap rule for hosting + regulations post', () => {
    const categories = [
      { id: 1, slug: 'hosting' },
      { id: 2, slug: 'regulations' },
    ]
    const result = pickCanonicalCategory([1, 2], categories)
    expect(result).toBe('hosting')
    
    const reorderedCategories = [
      { id: 2, slug: 'regulations' },
      { id: 1, slug: 'hosting' },
    ]
    const result2 = pickCanonicalCategory([1, 2], reorderedCategories)
    expect(result2).toBe('regulations')
  })

  it('all CANONICAL_CATEGORIES are valid outputs', () => {
    for (const cat of CANONICAL_CATEGORIES) {
      const catEntry = mockCategories.find(c => c.slug === cat)
      if (catEntry) {
        const result = pickCanonicalCategory([catEntry.id], mockCategories)
        expect(result).toBe(cat)
      }
    }
  })
})
