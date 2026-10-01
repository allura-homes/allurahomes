export const SHARE_IMAGE = {
  url: '/images/og-image.jpg',
  width: 1200,
  height: 630,
  alt: 'Allura Homes boutique vacation rental management',
}

export function metaDescription(text: string): string {
  const plainText = text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
  if (plainText.length <= 160) return plainText
  const shortened = plainText.slice(0, 157).replace(/\s+\S*$/, '').replace(/[\s,;:.!?-]+$/, '')
  return `${shortened}…`
}
