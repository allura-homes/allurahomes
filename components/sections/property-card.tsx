'use client'

import Image from 'next/image'
import { Star, Bed, Bath, Users } from 'lucide-react'

type PropertyCardProps = {
  title: string
  location: string
  image: string
  beds: number
  baths: number
  guests: number
  rating: number
  href: string
  priority?: boolean
}

export function PropertyCard({
  title,
  location,
  image,
  beds,
  baths,
  guests,
  rating,
  href,
  priority = false,
}: PropertyCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-xl bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={priority}
        />
        {/* Rating badge */}
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-navy-deep/80 px-3 py-1 backdrop-blur-sm">
          <Star className="size-3 fill-gold text-gold" />
          <span className="text-xs font-medium text-primary-foreground">
            {rating}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className="font-headline text-lg font-semibold uppercase tracking-wider text-navy-deep"
          style={{ fontFamily: 'var(--font-headline)' }}
        >
          {title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{location}</p>
        <div className="mt-4 flex items-center gap-4 border-t border-border pt-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Bed className="size-4" /> {beds} Beds
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="size-4" /> {baths} Baths
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="size-4" /> {guests} Guests
          </span>
        </div>
      </div>
    </a>
  )
}
