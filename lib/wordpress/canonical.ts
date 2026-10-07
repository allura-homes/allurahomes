export const CANONICAL_CATEGORIES = ['hosting', 'regulations', 'ai'] as const

export type CanonicalCategory = typeof CANONICAL_CATEGORIES[number]

const LEGACY_CATEGORY_MAP: Record<string, CanonicalCategory> = {
  'hosting-resources': 'hosting',
  'shortterm-rental-regulations': 'regulations',
}

export type CanonicalCategoryResult = {
  slug: string
  viaLegacy: boolean
} | null

export function pickCanonicalCategory(
  postCategoryIds: number[],
  allCategories: { id: number; slug: string }[]
): CanonicalCategoryResult {
  const allowedSet = new Set(CANONICAL_CATEGORIES)

  for (const cat of allCategories) {
    if (postCategoryIds.includes(cat.id) && allowedSet.has(cat.slug as CanonicalCategory)) {
      return { slug: cat.slug, viaLegacy: false }
    }
  }

  for (const cat of allCategories) {
    if (postCategoryIds.includes(cat.id)) {
      const mapped = LEGACY_CATEGORY_MAP[cat.slug]
      if (mapped) {
        return { slug: mapped, viaLegacy: true }
      }
    }
  }

  return null
}
