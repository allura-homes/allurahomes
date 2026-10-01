export function normalizeMarketingCopy(text: string): string {
  return text
    .replace(/\bmaximizing\b/gi, word => word[0] === 'M' ? 'Improving' : 'improving')
    .replace(/\bmaximized\b/gi, word => word[0] === 'M' ? 'Improved' : 'improved')
    .replace(/\bmaximizes\b/gi, word => word[0] === 'M' ? 'Improves' : 'improves')
    .replace(/\bmaximize\b/gi, word => word[0] === 'M' ? 'Improve' : 'improve')
    .replace(/\bluxury\b/gi, word => word[0] === 'L' ? 'High-end' : 'high-end')
    .replace(/\bvrbo\b/gi, 'Vrbo')
    .replace(/\s*--\s*/g, ', ')
}

export function normalizeMarketingHTML(html: string): string {
  const normalized = html
    .replace(/maximizing-multi-channel-yield(?:-with-allura-homes)?/gi, 'improving-multi-channel-yield')
    .replace(/luxury-rentals/gi, 'high-end-rentals')
  return normalized.split(/(<!--[\s\S]*?-->|<[^>]*>)/g).map(part => part.startsWith('<') ? part : normalizeMarketingCopy(part)).join('')
}
