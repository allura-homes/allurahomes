'use client'

import { useState } from 'react'
import {
  Wifi,
  Car,
  Snowflake,
  Flame,
  Tv,
  Utensils,
  WashingMachine,
  Waves,
  Mountain,
  TreePine,
  Home,
  Coffee,
  Dumbbell,
  Bath,
  Baby,
  Dog,
  Cigarette,
  PartyPopper,
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Map common amenity names to icons
const AMENITY_ICONS: Record<string, LucideIcon> = {
  wifi: Wifi,
  'wireless internet': Wifi,
  internet: Wifi,
  parking: Car,
  'free parking': Car,
  garage: Car,
  'air conditioning': Snowflake,
  ac: Snowflake,
  heating: Flame,
  fireplace: Flame,
  tv: Tv,
  television: Tv,
  'cable tv': Tv,
  kitchen: Utensils,
  'full kitchen': Utensils,
  washer: WashingMachine,
  dryer: WashingMachine,
  'washer/dryer': WashingMachine,
  pool: Waves,
  'swimming pool': Waves,
  'hot tub': Bath,
  jacuzzi: Bath,
  spa: Bath,
  gym: Dumbbell,
  fitness: Dumbbell,
  'ocean view': Mountain,
  'mountain view': Mountain,
  view: Mountain,
  garden: TreePine,
  patio: TreePine,
  'outdoor space': TreePine,
  bbq: Flame,
  grill: Flame,
  coffee: Coffee,
  'coffee maker': Coffee,
  espresso: Coffee,
  'family friendly': Baby,
  'kid friendly': Baby,
  'pet friendly': Dog,
  'pets allowed': Dog,
}

function getAmenityIcon(amenity: string): LucideIcon {
  const lower = amenity.toLowerCase()
  for (const [key, icon] of Object.entries(AMENITY_ICONS)) {
    if (lower.includes(key)) return icon
  }
  return Home
}

interface AmenitiesGridProps {
  amenities: string[]
}

export function AmenitiesGrid({ amenities }: AmenitiesGridProps) {
  const [showAll, setShowAll] = useState(false)

  if (amenities.length === 0) return null

  // Categorize amenities
  const essentials = amenities.filter((a) =>
    ['wifi', 'internet', 'parking', 'air', 'heating', 'kitchen', 'washer', 'dryer'].some(
      (k) => a.toLowerCase().includes(k)
    )
  )

  const featured = amenities.filter((a) =>
    ['pool', 'hot tub', 'jacuzzi', 'gym', 'fireplace', 'view', 'bbq', 'grill'].some(
      (k) => a.toLowerCase().includes(k)
    )
  )

  const displayed = showAll ? amenities : amenities.slice(0, 12)

  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold">What this place offers</h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {displayed.map((amenity, idx) => {
          const Icon = getAmenityIcon(amenity)
          const isFeatured = featured.includes(amenity)

          return (
            <div
              key={`${amenity}-${idx}`}
              className={cn(
                'flex items-center gap-3 p-3 rounded-lg',
                isFeatured && 'bg-accent/5 border border-accent/20'
              )}
            >
              <Icon
                className={cn(
                  'size-5 flex-shrink-0',
                  isFeatured ? 'text-accent' : 'text-muted-foreground'
                )}
              />
              <span className="text-sm">{amenity}</span>
            </div>
          )
        })}
      </div>

      {amenities.length > 12 && (
        <Button
          variant="outline"
          onClick={() => setShowAll(!showAll)}
          className="mt-6"
        >
          {showAll ? 'Show less' : `Show all ${amenities.length} amenities`}
        </Button>
      )}
    </div>
  )
}
