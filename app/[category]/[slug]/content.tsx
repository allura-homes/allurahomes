'use client'

import Image from 'next/image'
import Link from 'next/link'
import { BRAND } from '@/lib/constants'
import { AnimateOnScroll } from '@/components/animate-on-scroll'
import { ArticleBody } from '@/components/blog/article-body'
import { PostCard } from '@/components/blog/post-card'
import { SectionHeading } from '@/components/section-heading'
import { CTABand } from '@/components/sections/cta-band'
import type { BlogPost } from '@/lib/wordpress/types'
import {
  CalendarDays,
  Clock,
  ChevronRight,
  ArrowLeft,
  User,
} from 'lucide-react'

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

export function ArticleContent({
  post,
  relatedPosts,
}: {
  post: BlogPost
  relatedPosts: BlogPost[]
}) {
  return (
    <>
      {/* Hero / Header */}
      <section className="bg-navy-deep pb-12 pt-36">
        <div className="mx-auto max-w-4xl px-6">
          <AnimateOnScroll>
            {/* Breadcrumbs */}
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex items-center gap-2 text-sm text-primary-foreground/50"
            >
              <Link
                href="/"
                className="transition-colors hover:text-gold-light"
              >
                Home
              </Link>
              <ChevronRight className="size-3.5" />
              <Link
                href={`/${post.category.slug}`}
                className="transition-colors hover:text-gold-light"
              >
                {post.category.name}
              </Link>
              <ChevronRight className="size-3.5" />
              <span className="line-clamp-1 text-gold-light">
                {post.title}
              </span>
            </nav>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.1}>
            {/* Category Tag */}
            <span
              className="mb-4 inline-block rounded-md bg-gold/20 px-3 py-1 font-headline text-xs font-semibold uppercase tracking-wider text-gold-light"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              {post.category.name}
            </span>

            {/* Title */}
            <h1
              className="mb-6 text-3xl font-bold leading-tight text-primary-foreground md:text-4xl lg:text-5xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {post.title}
            </h1>

            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-5 text-sm text-primary-foreground/60">
              <span className="inline-flex items-center gap-2">
                {post.author.avatar ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                ) : (
                  <User className="size-4" />
                )}
                {post.author.name}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="size-4" />
                {formatDate(post.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4" />
                {estimateReadTime(post.content || post.excerpt)} min read
              </span>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Featured Image */}
      {post.featuredImage && (
        <section className="-mt-1 bg-navy-deep">
          <div className="mx-auto max-w-5xl px-6 pb-12">
            <AnimateOnScroll>
              <div className="relative aspect-[2/1] overflow-hidden rounded-2xl">
                <Image
                  src={post.featuredImage.url}
                  alt={post.featuredImage.alt || post.title}
                  fill
                  sizes="(max-width: 1200px) 100vw, 1024px"
                  className="object-cover"
                  priority
                  unoptimized={post.featuredImage.url.startsWith('http://')}
                />
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      )}

      {/* Article Body */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          <AnimateOnScroll>
            {post.content ? (
              <ArticleBody html={post.content} />
            ) : (
              <div className="rounded-xl border border-gold/20 bg-cream p-8 text-center">
                <p className="text-lg text-muted-foreground">
                  This article will be available once your WordPress instance is
                  connected. The demo shows the layout and design of the full
                  article reading experience.
                </p>
              </div>
            )}
          </AnimateOnScroll>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-12 border-t border-border pt-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-2 text-sm font-semibold text-navy-deep">
                  Tags:
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag.slug}
                    className="rounded-full bg-offwhite px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Back Link */}
          <div className="mt-8">
            <Link
              href={`/${post.category.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold-dark transition-colors hover:text-gold"
            >
              <ArrowLeft className="size-4" />
              Back to {post.category.name}
            </Link>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-offwhite py-20">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeading
              title="Related Articles"
              subtitle="Continue reading about this topic."
            />
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((rp, i) => (
                <PostCard key={rp.id} post={rp} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <CTABand
        headline="Need Help Managing Your Rental?"
        subtitle="Our team has 13+ years of experience maximizing revenue for California vacation rental owners."
        primaryCta={{ label: 'Book a Call', href: BRAND.calendarUrl }}
        secondaryCta={{ label: 'Learn More', href: '/property-management' }}
        variant="gold"
      />
    </>
  )
}
