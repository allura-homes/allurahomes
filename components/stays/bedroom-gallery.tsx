'use client'

import { useState, useRef, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Bed } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Property } from '@/lib/guesty/types'

interface BedroomGalleryProps {
  property: Property
}

interface BedroomData {
  id: string
  name: string
  bedType?: string
  image?: {
    url: string
    thumbnail: string
  }
}

// Parse bedroom info from caption (e.g., "Bedroom 5 (queen)", "Primary Bedroom (king)")
function parseBedroomCaption(caption: string): { name: string; bedType?: string } | null {
  const lowerCaption = caption.toLowerCase()
  
  // Check if this is a bedroom image
  const isBedroomImage = 
    lowerCaption.includes('bedroom') ||
    lowerCaption.includes('master') ||
    lowerCaption.includes('primary')
  
  if (!isBedroomImage) return null
  
  // Extract bed type from parentheses if present (e.g., "(queen)", "(king)")
  let bedType: string | undefined
  const bedMatch = caption.match(/\(([^)]+)\)/)
  if (bedMatch) {
    const bedName = bedMatch[1].toLowerCase()
    if (['king', 'queen', 'twin', 'double', 'single', 'bunk', 'sofa'].includes(bedName)) {
      bedType = `1 ${bedName} bed`
    }
  }
  
  // Clean up the name - remove the bed type in parentheses
  let name = caption.replace(/\s*\([^)]+\)\s*/g, '').trim()
  
  // Capitalize properly
  name = name.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
  
  // Normalize "Primary Bedroom" to "Primary Bedroom" (already good)
  // Normalize "Master" to "Primary Bedroom"
  if (name.toLowerCase() === 'master' || name.toLowerCase() === 'master bedroom') {
    name = 'Primary Bedroom'
  }
  
  return { name, bedType }
}

// Sort bedrooms: Primary first, then by number
function sortBedrooms(a: BedroomData, b: BedroomData): number {
  const aIsPrimary = a.name.toLowerCase().includes('primary') || a.name.toLowerCase().includes('master')
  const bIsPrimary = b.name.toLowerCase().includes('primary') || b.name.toLowerCase().includes('master')
  
  if (aIsPrimary && !bIsPrimary) return -1
  if (!aIsPrimary && bIsPrimary) return 1
  
  // Extract numbers for comparison
  const aNum = parseInt(a.name.match(/\d+/)?.[0] || '999')
  const bNum = parseInt(b.name.match(/\d+/)?.[0] || '999')
  
  return aNum - bNum
}

export function BedroomGallery({ property }: BedroomGalleryProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  
  // Build bedroom data from image captions
  const bedrooms = useMemo(() => {
    const bedroomMap = new Map<string, BedroomData>()
    
    // First pass: extract bedrooms from image captions
    for (const img of property.images) {
      if (!img.caption) continue
      
      const parsed = parseBedroomCaption(img.caption)
      if (!parsed) continue
      
      // Use normalized name as key to avoid duplicates
      const key = parsed.name.toLowerCase()
      
      // Only add if we don't already have this bedroom, or update if this one has a bed type
      if (!bedroomMap.has(key) || (parsed.bedType && !bedroomMap.get(key)?.bedType)) {
        bedroomMap.set(key, {
          id: img.id,
          name: parsed.name,
          bedType: parsed.bedType || bedroomMap.get(key)?.bedType,
          image: {
            url: img.url,
            thumbnail: img.thumbnail,
          },
        })
      }
    }
    
    // If we found bedroom images with captions, use those
    if (bedroomMap.size > 0) {
      return Array.from(bedroomMap.values()).sort(sortBedrooms)
    }
    
    // Fallback: Use listingRooms data if no captions available
    const rooms = property.listingRooms || []
    if (rooms.length === 0) return []
    
    return rooms.map((room, index) => {
      // Format bed description from listingRooms data
      const bedDescription = room.beds
        .map(bed => {
          const bedTypes: Record<string, string> = {
            'KING_BED': 'king bed',
            'QUEEN_BED': 'queen bed',
            'DOUBLE_BED': 'double bed',
            'SINGLE_BED': 'single bed',
            'TWIN_BED': 'twin bed',
            'BUNK_BED': 'bunk bed',
            'SOFA_BED': 'sofa bed',
          }
          const bedName = bedTypes[bed.type] || bed.type.toLowerCase().replace(/_/g, ' ')
          return `${bed.quantity} ${bedName}${bed.quantity > 1 ? 's' : ''}`
        })
        .join(', ')
      
      return {
        id: room.id,
        name: index === 0 ? 'Primary Bedroom' : `Bedroom ${index + 1}`,
        bedType: bedDescription,
        image: undefined,
      }
    }).sort(sortBedrooms)
  }, [property.images, property.listingRooms])
  
  // If no bedrooms found, don't render the section
  if (bedrooms.length === 0) {
    return null
  }
  
  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return
    
    const container = scrollContainerRef.current
    const scrollAmount = container.clientWidth * 0.8
    
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }
  
  const handleScroll = () => {
    if (!scrollContainerRef.current) return
    
    const container = scrollContainerRef.current
    setCanScrollLeft(container.scrollLeft > 0)
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    )
  }
  
  return (
    <div>
      {/* Header with navigation */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Where you&apos;ll sleep</h2>
        
        {bedrooms.length > 2 && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="size-9 rounded-full"
              aria-label="Scroll left"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="size-9 rounded-full"
              aria-label="Scroll right"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        )}
      </div>
      
      {/* Scrollable bedroom cards */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {bedrooms.map((bedroom) => (
          <div
            key={bedroom.id}
            className="flex-shrink-0 w-[280px] snap-start"
          >
            {/* Image or placeholder */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-muted">
              {bedroom.image ? (
                // Use img tag directly to avoid Next.js Image optimization issues with Guesty URLs
                <img
                  src={bedroom.image.url}
                  alt={bedroom.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Bed className="size-12 text-muted-foreground/50" />
                </div>
              )}
            </div>
            
            {/* Info */}
            <div>
              <h3 className="font-semibold text-foreground">
                {bedroom.name}
              </h3>
              {bedroom.bedType && (
                <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <Bed className="size-3.5" />
                  {bedroom.bedType}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
