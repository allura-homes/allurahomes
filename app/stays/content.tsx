'use client'

import { Suspense } from 'react'
import { PropertyFilters } from '@/components/stays/property-filters'
import { PropertyGrid } from '@/components/stays/property-grid'
import type { Property } from '@/lib/guesty/types'

interface StaysContentProps {
  properties: Property[]
  total: number
  cities: string[]
}

export function StaysContent({ properties, total, cities }: StaysContentProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative bg-primary py-20 md:py-28">
        <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] opacity-5" />
        <div className="container relative mx-auto max-w-7xl px-4">
          <p className="mb-4 font-serif text-lg text-accent">Book Your Stay</p>
          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Luxury Vacation Rentals
          </h1>
          <p className="max-w-2xl text-lg text-white/80">
            Discover handpicked properties across California, each designed for
            unforgettable experiences. Every home is professionally managed with
            5-star hospitality.
          </p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="container mx-auto max-w-7xl px-4 py-12 md:py-16">
        {/* Filters */}
        <div className="mb-10 -mt-20 relative z-10">
          <Suspense fallback={<div className="h-24 animate-pulse rounded-2xl bg-card" />}>
            <PropertyFilters cities={cities} />
          </Suspense>
        </div>

        {/* Grid */}
        <PropertyGrid properties={properties} total={total} />
      </section>
    </div>
  )
}
