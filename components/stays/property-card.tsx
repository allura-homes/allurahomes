'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Bed, Bath, Users, MapPin, Play, Heart } from 'lucide-react'
import type { Property } from '@/lib/guesty/types'

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const hasVideoTour = property.videoTourUrl || property.matterportUrl

  return (
    <Link
      href={`/stays/${property.slug}`}
      className="group block overflow-hidden rounded-2xl bg-card border border-border/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {property.images[0] ? (
          <Image
            src={property.images[0].url}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-muted">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}

        {/* Video tour badge */}
        {hasVideoTour && (
          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
            <Play className="size-3 fill-current" />
            {property.matterportUrl ? '3D Tour' : 'Video Tour'}
          </div>
        )}

        {/* Guest Favorite badge */}
        {property.isGuestFavorite && (
          <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-accent/90 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
            <Heart className="size-3.5 fill-current" />
            Guest Favorite
          </div>
        )}

        {/* Price badge */}
        <div className="absolute bottom-3 right-3 rounded-lg bg-white/95 px-3 py-1.5 shadow-lg backdrop-blur-sm">
          <span className="text-sm text-muted-foreground">from </span>
          <span className="font-semibold text-primary">
            ${property.pricing.basePrice}
          </span>
          <span className="text-sm text-muted-foreground">/night</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Location */}
        <div className="mb-2 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-3.5" />
          <span>
            {property.location.city}, {property.location.state}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-3 font-headline text-lg font-bold uppercase leading-snug text-foreground line-clamp-2 group-hover:text-accent transition-colors">
          {property.title}
        </h3>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Users className="size-4" />
            <span>{property.guests} guests</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bed className="size-4" />
            <span>{property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="size-4" />
            <span>{property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
