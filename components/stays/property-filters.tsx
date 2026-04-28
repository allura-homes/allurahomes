'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useTransition } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface PropertyFiltersProps {
  cities: string[]
}

export function PropertyFilters({ cities }: PropertyFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const currentCity = searchParams.get('city') || ''
  const currentGuests = searchParams.get('guests') || ''
  const currentBedrooms = searchParams.get('bedrooms') || ''
  const currentSort = searchParams.get('sort') || ''

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value && value !== 'all') {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      startTransition(() => {
        router.push(`/stays?${params.toString()}`)
      })
    },
    [router, searchParams]
  )

  const clearFilters = useCallback(() => {
    startTransition(() => {
      router.push('/stays')
    })
  }, [router])

  const hasFilters = currentCity || currentGuests || currentBedrooms || currentSort

  return (
    <div className="rounded-2xl border border-border/50 bg-card p-4 md:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-6">
        {/* Location */}
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Location
          </label>
          <Select
            value={currentCity || 'all'}
            onValueChange={(v) => updateFilter('city', v)}
          >
            <SelectTrigger className="h-12 bg-background">
              <SelectValue placeholder="All locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All locations</SelectItem>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Guests */}
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Guests
          </label>
          <Select
            value={currentGuests || 'all'}
            onValueChange={(v) => updateFilter('guests', v)}
          >
            <SelectTrigger className="h-12 bg-background">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any</SelectItem>
              <SelectItem value="2">2+ guests</SelectItem>
              <SelectItem value="4">4+ guests</SelectItem>
              <SelectItem value="6">6+ guests</SelectItem>
              <SelectItem value="8">8+ guests</SelectItem>
              <SelectItem value="10">10+ guests</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bedrooms */}
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Bedrooms
          </label>
          <Select
            value={currentBedrooms || 'all'}
            onValueChange={(v) => updateFilter('bedrooms', v)}
          >
            <SelectTrigger className="h-12 bg-background">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any</SelectItem>
              <SelectItem value="1">1+ bedroom</SelectItem>
              <SelectItem value="2">2+ bedrooms</SelectItem>
              <SelectItem value="3">3+ bedrooms</SelectItem>
              <SelectItem value="4">4+ bedrooms</SelectItem>
              <SelectItem value="5">5+ bedrooms</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort */}
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Sort by
          </label>
          <Select
            value={currentSort || 'all'}
            onValueChange={(v) => updateFilter('sort', v)}
          >
            <SelectTrigger className="h-12 bg-background">
              <SelectValue placeholder="Featured" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Featured</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="bedrooms">Most Bedrooms</SelectItem>
              <SelectItem value="guests">Most Guests</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2 lg:pt-0">
          {hasFilters && (
            <Button
              variant="outline"
              onClick={clearFilters}
              disabled={isPending}
              className="h-12"
            >
              Clear
            </Button>
          )}
          <Button
            className="btn-gold h-12 gap-2"
            disabled={isPending}
          >
            <Search className="size-4" />
            <span className="hidden sm:inline">Search</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
