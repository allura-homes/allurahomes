'use client'

import { AnimateOnScroll } from '@/components/animate-on-scroll'

const sections = [
  {
    title: 'Introduction',
    content:
      'Welcome to Allura Homes LLC, located in San Diego, California. Your privacy is important to us. This Privacy Policy explains how we collect, use, and share personal information about visitors to our website (the "Website"). It also outlines your choices regarding your personal information.',
  },
  {
    title: 'Information We Collect',
    content: 'We collect various types of information, including:',
    items: [
      'Personal Information: Contact details such as name, email, phone number, and address.',
      'Transactional Information: Payment details and transaction history.',
      'Technical Information: IP address, browser type, and device information.',
      'Behavioral Information: Usage patterns and preferences.',
    ],
  },
  {
    title: 'How We Collect Information',
    items: [
      'Directly from You: When you register, book services, or contact us.',
      'Cookies and Tracking: We use cookies and similar technologies to enhance your experience.',
      'Third-Party Sources: We may receive information from partners and service providers.',
    ],
  },
  {
    title: 'Use of Information',
    content: 'We use your information to:',
    items: [
      'Provide and manage our services.',
      'Process transactions and send related information.',
      'Improve our website and services.',
      'Communicate with you about updates, promotions, and more.',
      'Ensure security and prevent fraud.',
    ],
  },
  {
    title: 'Sharing of Information',
    content: 'We may share your information with:',
    items: [
      'Service Providers: To perform functions on our behalf (e.g., payment processing).',
      'Legal Authorities: To comply with legal obligations or protect rights.',
      'Business Partners: With your consent, for joint marketing initiatives.',
    ],
  },
  {
    title: 'Security',
    content:
      'We implement various security measures to protect your personal information. However, no method is 100% secure, and we encourage you to protect your passwords and personal data.',
  },
  {
    title: 'Your Rights',
    content: 'You have the right to:',
    items: [
      'Access your personal information.',
      'Request corrections or deletions.',
      'Opt-out of certain uses and disclosures of your information.',
    ],
  },
  {
    title: 'California Privacy Rights',
    content:
      'If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA), including the right to access and delete your personal information.',
  },
  {
    title: 'Contact Us',
    content:
      'For questions or requests regarding your personal information, please contact us at privacy@allurahomes.com.',
  },
]

export function PrivacyContent() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-deep py-20 pt-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1
            className="text-4xl font-bold text-primary-foreground md:text-5xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Privacy Policy
          </h1>
          <p className="mt-4 text-primary-foreground/60">
            Effective Date: October 14, 2024
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <AnimateOnScroll>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              Privacy Policy of Allura Homes LLC
            </p>
          </AnimateOnScroll>

          {sections.map((section, i) => (
            <AnimateOnScroll key={section.title} delay={i * 0.05}>
              <div className="mb-10">
                <h2
                  className="mb-4 text-2xl font-bold text-navy-deep"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {section.title}
                </h2>
                {section.content && (
                  <p className="leading-relaxed text-muted-foreground">
                    {section.content}
                  </p>
                )}
                {section.items && (
                  <ul className="mt-3 flex flex-col gap-2 pl-6">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="list-disc leading-relaxed text-muted-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>
    </>
  )
}
