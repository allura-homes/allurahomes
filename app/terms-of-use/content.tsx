'use client'

import { AnimateOnScroll } from '@/components/animate-on-scroll'

const sections = [
  {
    title: '1. Acceptance of Terms',
    content:
      'By accessing the Site, you confirm that you are at least 18 years old and capable of entering into legally binding agreements. If you do not agree to these Terms, you may not use the Site.',
  },
  {
    title: '2. Changes to Terms',
    content:
      'Allura may modify these Terms at any time. We will update the effective date at the top of this page when changes are made. Continuing to use the Site after changes have been posted constitutes your acceptance of the updated Terms.',
  },
  {
    title: '3. Privacy and Cookie Policies',
    content:
      'Your use of the Site is also governed by our Privacy Policy and Cookie Policy, which are incorporated into these Terms. We encourage you to review these policies to understand how we collect and use your information.',
  },
  {
    title: '4. Permitted Use',
    content:
      'You are granted a limited, non-transferable license to access and use the Site for personal purposes, such as searching for or booking vacation rentals. Any other use requires our prior written consent.',
  },
  {
    title: '5. Prohibited Conduct',
    content: 'You agree not to:',
    items: [
      'Use the Site for commercial purposes without authorization.',
      'Copy or scrape content from the Site.',
      'Use the Site to infringe on the rights of others.',
      'Engage in fraudulent activities or false representations.',
      'Attempt to reverse engineer any software on the Site.',
      'Overload or interfere with the Site\'s operations.',
    ],
  },
  {
    title: '6. Intellectual Property',
    content:
      'The content on the Site, including text, graphics, and logos, is owned by Allura or licensed to us and is protected by intellectual property laws.',
  },
  {
    title: '7. Artificial Intelligence (AI) Use',
    content:
      'Allura uses AI to enhance your experience, including personalized recommendations and chat support. By using the Site, you consent to these AI technologies.',
  },
  {
    title: '8. User Accounts',
    content:
      'If you create an account, you are responsible for maintaining the confidentiality of your login information and all activities under your account. Notify us immediately of any unauthorized use.',
  },
  {
    title: '9. User Content and Reviews',
    content:
      'You may submit reviews or content to the Site. By doing so, you grant Allura a worldwide, non-exclusive, royalty-free license to use, display, and distribute your content. You must have the necessary rights to the content you submit.',
  },
  {
    title: '10. Transaction Terms',
    content:
      'Specific transactions may require additional terms, which will prevail over these Terms in case of any conflict.',
  },
  {
    title: '11. International Travel',
    content:
      'If booking international travel, you are responsible for ensuring you meet all entry requirements and have necessary documentation. We recommend reviewing travel advisories before booking.',
  },
  {
    title: '12. Currency and Transactions',
    content:
      'Fees may be presented in various currencies for your convenience. You are responsible for any conversion fees charged by your financial provider.',
  },
  {
    title: '13. Liability Disclaimer',
    content:
      'The Site is provided "as is" without any warranties. Allura is not liable for any inaccuracies or errors on the Site. Your use of the Site is at your own risk.',
  },
  {
    title: '14. Indemnification',
    content:
      'You agree to indemnify Allura against claims arising from your use of the Site, your violation of these Terms, or your infringement of any rights of others.',
  },
  {
    title: '15. Governing Law and Disputes',
    content:
      'These Terms are governed by the laws of the State of California. Disputes will be resolved in the courts located in San Diego, California. You waive any right to participate in class actions.',
  },
  {
    title: '16. Assignment',
    content:
      'You may not assign your rights under these Terms without our consent. Allura may assign its rights without restriction.',
  },
  {
    title: '17. General',
    content:
      'These Terms constitute the entire agreement between you and Allura regarding the Site. If any provision is found invalid, the remaining provisions will remain in effect.',
  },
  {
    title: 'Contact Information',
    content:
      'For questions about these Terms, contact us at legal@allurahomes.com or write to us at: Allura Homes, 1670 Kettner Blvd #118, San Diego, CA 92101.',
  },
]

export function TermsContent() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy-deep py-20 pt-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1
            className="text-4xl font-bold text-primary-foreground md:text-5xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Terms of Use
          </h1>
          <p className="mt-4 text-primary-foreground/60">
            Effective Date: October 23, 2024
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <AnimateOnScroll>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              Welcome to Allura Homes LLC (&ldquo;Allura&rdquo;). By accessing
              or using our website, mobile applications, or any related services
              (collectively, the &ldquo;Site&rdquo;), you agree to comply with
              these Terms of Service (&ldquo;Terms&rdquo;). Please read them
              carefully.
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
