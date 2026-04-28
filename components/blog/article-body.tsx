'use client'

import { cn } from '@/lib/utils'

export function ArticleBody({
  html,
  className,
}: {
  html: string
  className?: string
}) {
  return (
    <div
      className={cn('prose-allura', className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
