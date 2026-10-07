export const CANONICAL_CATEGORIES = ['hosting', 'regulations', 'ai'] as const

export type CanonicalCategory = typeof CANONICAL_CATEGORIES[number]

const LEGACY_CATEGORY_MAP: Record<string, CanonicalCategory> = {
  'hosting-resources': 'hosting',
  'shortterm-rental-regulations': 'regulations',
}

export function pickCanonicalCategory(
  postCategoryIds: number[],
  allCategories: { id: number; slug: string }[],
  options: { includeLegacyOnly?: boolean } = {}
): string | null {
  const { includeLegacyOnly = true } = options
  const allowedSet = new Set(CANONICAL_CATEGORIES)

  for (const cat of allCategories) {
    if (postCategoryIds.includes(cat.id) && allowedSet.has(cat.slug as CanonicalCategory)) {
      return cat.slug
    }
  }

  if (includeLegacyOnly) {
    for (const cat of allCategories) {
      if (postCategoryIds.includes(cat.id)) {
        const mapped = LEGACY_CATEGORY_MAP[cat.slug]
        if (mapped) {
          return mapped
        }
      }
    }
  }

  return null
}
