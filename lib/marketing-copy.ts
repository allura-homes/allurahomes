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
  // Only change text nodes; keep article links, attributes, embeds, and comments intact.
  return html.split(/(<!--[\s\S]*?-->|<[^>]*>)/g).map(part => part.startsWith('<') ? part : normalizeMarketingCopy(part)).join('')
}
