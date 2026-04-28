import { PropertyCard } from './property-card'
import type { Property } from '@/lib/guesty/types'

interface PropertyGridProps {
  properties: Property[]
  total: number
}

export function PropertyGrid({ properties, total }: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 rounded-full bg-muted p-6">
          <svg
            className="size-12 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </div>
        <h3 className="mb-2 font-headline text-xl font-bold uppercase">
          No Properties Found
        </h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or check back later for new listings.
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Results count */}
      <div className="mb-6 text-sm text-muted-foreground">
        Showing <span className="font-medium text-foreground">{properties.length}</span> of{' '}
        <span className="font-medium text-foreground">{total}</span> properties
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  )
}
