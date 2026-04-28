'use client'

import { useState } from 'react'
import { Shield, CheckCircle, Sparkles, HeartHandshake, Clock, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function AlluraGuarantee() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Callout Banner */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center gap-4 p-4 bg-primary/5 rounded-2xl border border-primary/10 hover:bg-primary/10 transition-colors text-left group"
      >
        <div className="flex items-center justify-center size-12 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors">
          <Shield className="size-6 text-accent" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-foreground">The Allura Guarantee</p>
          <p className="text-sm text-muted-foreground">
            Book with confidence.{' '}
            <span className="text-accent hover:underline">Read more.</span>
          </p>
        </div>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          {/* Modal Content */}
          <div 
            className="relative w-full max-w-lg bg-background rounded-2xl shadow-xl p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Close"
            >
              <X className="size-5 text-muted-foreground" />
            </button>

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                The Allura Guarantee
              </h2>
              <p className="text-muted-foreground">
                Distinguished by design. Defined by care.
              </p>
            </div>

            {/* Guarantee Points */}
            <div className="space-y-6">
              {/* Point 1: Photo-Perfect Homes */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 flex items-center justify-center size-10 rounded-full bg-accent/10">
                  <CheckCircle className="size-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Photo-perfect homes
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Every Allura home looks exactly like the photos—spotlessly clean, 
                    thoughtfully designed, and ready to welcome you. If it doesn&apos;t 
                    meet our standards, we&apos;ll make it right.
                  </p>
                </div>
              </div>

              {/* Point 2: Effortless Stays */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 flex items-center justify-center size-10 rounded-full bg-accent/10">
                  <Sparkles className="size-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Effortless arrivals & departures
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Smart locks, clear instructions, and no checkout chores. 
                    We&apos;ve designed every detail so coming and going feels 
                    simple and stress-free.
                  </p>
                </div>
              </div>

              {/* Point 3: 24/7 Concierge */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 flex items-center justify-center size-10 rounded-full bg-accent/10">
                  <Clock className="size-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    24/7 concierge support
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Real people, always available. Our hospitality team is here 
                    before, during, and after your stay—because 5-star service 
                    doesn&apos;t take a day off.
                  </p>
                </div>
              </div>

              {/* Point 4: Flexible & Fair */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 flex items-center justify-center size-10 rounded-full bg-accent/10">
                  <HeartHandshake className="size-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Flexible & fair policies
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Life happens. We offer transparent pricing with no hidden fees, 
                    and reasonable cancellation policies so you can book with peace 
                    of mind.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-border">
              <Button
                onClick={() => setIsOpen(false)}
                className="w-full btn-gold h-12"
              >
                Got it
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
