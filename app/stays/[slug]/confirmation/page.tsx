import { Suspense } from 'react'
import { ConfirmationContent } from './content'

export const metadata = {
  title: 'Booking Confirmed | Allura Homes',
  description: 'Your reservation has been confirmed',
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="size-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading confirmation...</p>
          </div>
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  )
}
