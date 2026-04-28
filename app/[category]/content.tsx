'use client'

import Link from 'next/link'
import { SectionHeading } from '@/components/section-heading'
import { PostCard } from '@/components/blog/post-card'
import { CTABand } from '@/components/sections/cta-band'
import { BRAND } from '@/lib/constants'
import { AnimateOnScroll } from '@/components/animate-on-scroll'
import type { BlogPost, BlogCategory } from '@/lib/wordpress/types'
import { ChevronRight } from 'lucide-react'

export function CategoryContent({
  category,
  posts,
}: {
  category: BlogCategory
  posts: BlogPost[]
}) {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-deep pb-16 pt-36">
        <div className="mx-auto max-w-7xl px-6">
          <AnimateOnScroll>
            {/* Breadcrumbs */}
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex items-center gap-2 text-sm text-primary-foreground/50"
            >
              <Link href="/" className="transition-colors hover:text-gold-light">
                Home
              </Link>
              <ChevronRight className="size-3.5" />
              <span className="text-gold-light">{category.name}</span>
            </nav>
          </AnimateOnScroll>
          <SectionHeading
            title={category.name}
            subtitle={category.description}
            alignment="left"
            dark
          />
        </div>
      </section>

      {/* Post Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          {posts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-muted-foreground">
                No articles yet in this category. Check back soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <CTABand
        headline="Ready to Maximize Your Rental Income?"
        subtitle="Book a free consultation to see what your property could earn with professional management."
        primaryCta={{ label: 'Book a Call', href: BRAND.calendarUrl }}
        secondaryCta={{ label: 'Browse Homes', href: BRAND.bookingUrl }}
        variant="navy"
      />
    </>
  )
}
