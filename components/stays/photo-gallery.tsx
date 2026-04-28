'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Grid3X3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PhotoGalleryProps {
  images: Array<{
    id: string
    url: string
    thumbnail: string
    caption?: string
  }>
  title: string
}

export function PhotoGallery({ images, title }: PhotoGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = ''
  }

  const goTo = (index: number) => {
    if (index < 0) setCurrentIndex(images.length - 1)
    else if (index >= images.length) setCurrentIndex(0)
    else setCurrentIndex(index)
  }

  if (images.length === 0) return null

  return (
    <>
      {/* Bento Grid */}
      <div className="relative grid gap-2 md:grid-cols-4 md:grid-rows-2 h-[300px] md:h-[500px] rounded-2xl overflow-hidden">
        {/* Main large image */}
        <button
          onClick={() => openLightbox(0)}
          className="relative md:col-span-2 md:row-span-2 cursor-pointer group"
        >
          <Image
            src={images[0].url}
            alt={images[0].caption || `${title} - Main photo`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        </button>

        {/* Secondary images */}
        {images.slice(1, 5).map((image, idx) => (
          <button
            key={image.id}
            onClick={() => openLightbox(idx + 1)}
            className="relative hidden md:block cursor-pointer group"
          >
            <Image
              src={image.url}
              alt={image.caption || `${title} - Photo ${idx + 2}`}
              fill
              sizes="25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </button>
        ))}

        {/* Show all photos button */}
        {images.length > 5 && (
          <Button
            onClick={() => openLightbox(0)}
            variant="secondary"
            className="absolute bottom-4 right-4 gap-2 shadow-lg"
          >
            <Grid3X3 className="size-4" />
            Show all {images.length} photos
          </Button>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="size-6 text-white" />
          </button>

          {/* Navigation */}
          <button
            onClick={() => goTo(currentIndex - 1)}
            className="absolute left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="size-6 text-white" />
          </button>
          <button
            onClick={() => goTo(currentIndex + 1)}
            className="absolute right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="size-6 text-white" />
          </button>

          {/* Image */}
          <div className="relative w-full max-w-5xl h-[80vh] mx-8">
            <Image
              src={images[currentIndex].url}
              alt={images[currentIndex].caption || `${title} - Photo ${currentIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
              unoptimized
            />
          </div>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Thumbnails */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-3xl px-4">
            {images.map((image, idx) => (
              <button
                key={image.id}
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  'relative size-16 rounded-lg overflow-hidden flex-shrink-0 transition-all',
                  idx === currentIndex
                    ? 'ring-2 ring-white ring-offset-2 ring-offset-black'
                    : 'opacity-50 hover:opacity-100'
                )}
              >
                <Image
                  src={image.thumbnail}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                  unoptimized
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
