'use client'

import { Bed, Bath, Users, MapPin, Star, Shield, Clock } from 'lucide-react'
import { PhotoGallery } from '@/components/stays/photo-gallery'
import { VideoTour } from '@/components/stays/video-tour'
import { BookingWidget } from '@/components/stays/booking-widget'
import { AmenitiesGrid } from '@/components/stays/amenities-grid'
import { AlluraGuarantee } from '@/components/stays/allura-guarantee'
import { BedroomGallery } from '@/components/stays/bedroom-gallery'
import { AnimateOnScroll } from '@/components/animate-on-scroll'
import type { Property } from '@/lib/guesty/types'

interface PropertyDetailContentProps {
  property: Property
}

export function PropertyDetailContent({ property }: PropertyDetailContentProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Photo Gallery */}
      <section className="container mx-auto max-w-7xl px-4 pt-6 pb-8">
        <PhotoGallery images={property.images} title={property.title} />
      </section>

      {/* Main Content */}
      <section className="container mx-auto max-w-7xl px-4 pb-16">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-12">
            {/* Header */}
            <AnimateOnScroll>
              <div>
                {/* Location */}
                <div className="mb-3 flex items-center gap-2 text-muted-foreground">
                  <MapPin className="size-4" />
                  <span>
                    {property.location.city}, {property.location.state}
                  </span>
                </div>

                {/* Title */}
                <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                  {property.title}
                </h1>

                {/* Quick Stats */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="size-5" />
                    <span>{property.guests} guests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed className="size-5" />
                    <span>
                      {property.bedrooms} bedroom{property.bedrooms !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="size-5" />
                    <span>
                      {property.bathrooms} bathroom{property.bathrooms !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                {/* Video Tour Buttons */}
                {(property.videoTourUrl || property.matterportUrl) && (
                  <div className="mt-6">
                    <VideoTour
                      videoUrl={property.videoTourUrl}
                      matterportUrl={property.matterportUrl}
                      title={property.title}
                    />
                  </div>
                )}
              </div>
            </AnimateOnScroll>

            {/* Trust Badges */}
            <AnimateOnScroll delay={0.1}>
              <div className="flex flex-wrap gap-4 p-6 bg-primary/5 rounded-2xl border border-primary/10">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center size-10 rounded-full bg-accent/10">
                    <Star className="size-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Superhost</p>
                    <p className="text-xs text-muted-foreground">Highly rated</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center size-10 rounded-full bg-accent/10">
                    <Shield className="size-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Professional</p>
                    <p className="text-xs text-muted-foreground">Fully managed</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center size-10 rounded-full bg-accent/10">
                    <Clock className="size-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">24/7 Support</p>
                    <p className="text-xs text-muted-foreground">Always available</p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Allura Guarantee */}
            <AnimateOnScroll delay={0.12}>
              <AlluraGuarantee />
            </AnimateOnScroll>

            {/* Description */}
            <AnimateOnScroll delay={0.15}>
              <div>
                <h2 className="mb-4 text-2xl font-semibold">About this property</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {property.description.summary}
                  </p>
                  {property.description.space && (
                    <>
                      <h3 className="mt-6 mb-2 font-headline font-bold uppercase text-foreground">The Space</h3>
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {property.description.space}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </AnimateOnScroll>

            {/* Where You'll Sleep */}
            <AnimateOnScroll delay={0.18}>
              <BedroomGallery property={property} />
            </AnimateOnScroll>

            {/* Neighborhood */}
            <AnimateOnScroll delay={0.19}>
              <div>
                <div className="prose prose-gray max-w-none">
                  {property.description.neighborhood && (
                    <>
                      <h3 className="mt-6 mb-2 font-headline font-bold uppercase text-foreground">The Neighborhood</h3>
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {property.description.neighborhood}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </AnimateOnScroll>

            {/* Amenities */}
            <AnimateOnScroll delay={0.2}>
              <AmenitiesGrid amenities={property.amenities} />
            </AnimateOnScroll>

            {/* House Rules */}
            {property.description.houseRules && (
              <AnimateOnScroll delay={0.25}>
                <div>
                  <h2 className="mb-4 text-2xl font-semibold">House Rules</h2>
                  <div className="p-6 bg-muted/50 rounded-2xl">
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {property.description.houseRules}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            )}

            {/* Cancellation Policy */}
            {property.cancellationPolicy && (
              <AnimateOnScroll delay={0.3}>
                <div>
                  <h2 className="mb-4 text-2xl font-semibold">Cancellation Policy</h2>
                  <p className="text-muted-foreground">{property.cancellationPolicy}</p>
                </div>
              </AnimateOnScroll>
            )}
          </div>

          {/* Right Column - Booking Widget */}
          <div className="lg:col-span-1">
            <BookingWidget property={property} />
          </div>
        </div>
      </section>
    </div>
  )
}
