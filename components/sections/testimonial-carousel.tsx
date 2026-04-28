'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/constants'
import { AnimateOnScroll } from '@/components/animate-on-scroll'
import { cn } from '@/lib/utils'

export function TestimonialCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi])

  // Auto-play
  useEffect(() => {
    if (!emblaApi) return
    const interval = setInterval(() => emblaApi.scrollNext(), 6000)
    return () => clearInterval(interval)
  }, [emblaApi])

  return (
    <section className="bg-navy-deep py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <AnimateOnScroll>
          <div className="mb-12 text-center">
            <span className="mb-3 block font-serif text-sm tracking-wide text-gold-light">
              What Our Owners Say
            </span>
            <h2
              className="text-3xl font-bold text-primary-foreground md:text-4xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Trusted by Homeowners
            </h2>
            <div className="mx-auto mt-4 h-0.5 w-16 bg-gold" />
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.2}>
          <div className="relative">
            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex">
                {TESTIMONIALS.map((t, i) => (
                  <div key={i} className="min-w-0 shrink-0 grow-0 basis-full px-4 md:basis-[80%] lg:basis-[60%]">
                    <div className="flex flex-col items-center px-4 py-8 text-center md:px-12">
                      <Quote className="mb-6 size-10 text-gold/40" />
                      <blockquote className="text-lg leading-relaxed text-primary-foreground/90 md:text-xl lg:text-2xl">
                        &ldquo;{t.quote}&rdquo;
                      </blockquote>
                      <div className="mt-6 flex gap-1">
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <Star
                            key={j}
                            className="size-4 fill-gold text-gold"
                          />
                        ))}
                      </div>
                      <div className="mt-3">
                        <p className="font-headline text-sm font-semibold uppercase tracking-wider text-gold" style={{ fontFamily: 'var(--font-headline)' }}>
                          {t.author}
                        </p>
                        <p className="mt-0.5 text-sm text-primary-foreground/50">
                          {t.location}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={scrollPrev}
                className="flex size-10 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors hover:bg-gold hover:text-navy-deep"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="size-5" />
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    className={cn(
                      'h-2 rounded-full transition-all',
                      selectedIndex === i
                        ? 'w-8 bg-gold'
                        : 'w-2 bg-primary-foreground/20'
                    )}
                    aria-label={`Go to testimonial ${i + 1}`}
                    onClick={() => emblaApi?.scrollTo(i)}
                  />
                ))}
              </div>
              <button
                onClick={scrollNext}
                className="flex size-10 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors hover:bg-gold hover:text-navy-deep"
                aria-label="Next testimonial"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
