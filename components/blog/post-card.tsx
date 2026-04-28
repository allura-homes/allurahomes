'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AnimateOnScroll } from '@/components/animate-on-scroll'
import type { BlogPost } from '@/lib/wordpress/types'
import { CalendarDays, Clock, ArrowRight } from 'lucide-react'

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function estimateReadTime(content: string) {
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

export function PostCard({
  post,
  index = 0,
}: {
  post: BlogPost
  index?: number
}) {
  const href = `/${post.category.slug}/${post.slug}`

  return (
    <AnimateOnScroll delay={index * 0.1}>
      <Link
        href={href}
        className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-xl"
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          {post.featuredImage ? (
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alt || post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              unoptimized={post.featuredImage.url.startsWith('http://')}
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-navy-deep/5">
              <span className="font-headline text-2xl text-navy-deep/20" style={{ fontFamily: 'var(--font-headline)' }}>
                ALLURA
              </span>
            </div>
          )}
          {/* Category Tag */}
          <span className="absolute left-4 top-4 rounded-md bg-navy-deep/90 px-3 py-1 font-headline text-xs font-semibold uppercase tracking-wider text-primary-foreground" style={{ fontFamily: 'var(--font-headline)' }}>
            {post.category.name}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-3.5" />
              {formatDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" />
              {estimateReadTime(post.content || post.excerpt)} min read
            </span>
          </div>

          <h3
            className="mb-2 text-xl font-bold leading-snug text-navy-deep transition-colors group-hover:text-gold-dark"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            {post.title}
          </h3>

          <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>

          <span className="inline-flex items-center gap-2 font-headline text-sm font-semibold uppercase tracking-widest text-gold-dark transition-colors group-hover:text-gold" style={{ fontFamily: 'var(--font-headline)' }}>
            Read Article
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </AnimateOnScroll>
  )
}
