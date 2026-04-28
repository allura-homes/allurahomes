import type { Metadata } from 'next'
import { IncomeReportForm } from '@/components/forms/income-report-form'
import { IncomeReportContent } from './content'

export const metadata: Metadata = {
  title: 'Free Vacation Rental Income Report - See What Your Property Could Earn',
  description:
    'Get a free, no-obligation income projection for your vacation rental property in California. Discover what your home could earn with professional Airbnb & VRBO management. Custom market analysis delivered within 48 hours.',
  alternates: { canonical: 'https://allurahomes.com/free-income-report' },
  keywords: ['free rental income report', 'vacation rental income estimate', 'Airbnb earnings calculator', 'property income projection California'],
  openGraph: {
    title: 'Free Vacation Rental Income Report | Allura Homes',
    description: 'Discover what your property could earn with professional Allura Homes management. Free, no-obligation.',
    url: 'https://allurahomes.com/free-income-report',
  },
}

export default function FreeIncomeReportPage() {
  return (
    <>
      <IncomeReportContent />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How long does it take to receive my income report?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our team typically delivers your custom income report within 24-48 hours of receiving your information.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is there any cost or obligation?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. The income report is completely free with no strings attached. We believe in earning your trust with data, not pressure.',
                },
              },
              {
                '@type': 'Question',
                name: 'What information is included in the report?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Your report includes a custom income projection, local market comparisons, seasonal demand analysis, and a recommended pricing strategy for your specific property.',
                },
              },
            ],
          }),
        }}
      />
    </>
  )
}
