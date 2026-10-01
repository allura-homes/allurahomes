import Link from 'next/link'
import { cn } from '@/lib/utils'
import { SectionHeading } from '@/components/section-heading'
import { SiteButton } from '@/components/site-button'
import { FeatureCard } from '@/components/sections/content-section'
import { switchContent as c } from './content'
import { FREE_INCOME_REPORT_HREF } from '@/lib/site-config'

const bodyLinks = [
  { text: 'STRO license', href: '/hosting/san-diego-str-permit-guide' },
  { text: 'STRO, TOT', href: '/regulations/san-diego-california' },
  { text: 'free switch analysis', href: FREE_INCOME_REPORT_HREF },
  { text: 'end-to-end', href: '/how-it-works' },
]

export function SwitchBody({ text }: { text: string }) {
  const match = bodyLinks.find(link => text.includes(link.text))
  if (!match) return <>{text}</>
  const index = text.indexOf(match.text)
  return <>{text.slice(0, index)}<Link href={match.href} className="underline decoration-gold underline-offset-4 hover:text-gold-dark">{match.text}</Link>{text.slice(index + match.text.length)}</>
}

export function SwitchHeading({ eyebrow, title, subtitle, dark = false, left = false }: { eyebrow: string; title: string; subtitle?: React.ReactNode; dark?: boolean; left?: boolean }) {
  return <SectionHeading accent={eyebrow} title={title} subtitle={subtitle} dark={dark} alignment={left ? 'left' : 'center'} />
}

export function SwitchActions({ dark = false, vertical = false }: { dark?: boolean; vertical?: boolean }) {
  return <div className={cn('flex flex-col gap-4', !vertical && 'sm:flex-row sm:flex-wrap')}><SiteButton href="#analysis">{c.cta.primary}</SiteButton><SiteButton href={c.cta.callHref} target="_blank" variant="secondary" dark={dark}>{c.cta.secondary}</SiteButton></div>
}

export function SwitchCard({ title, body }: { title: string; body: string }) {
  return <FeatureCard title={title}><SwitchBody text={body} /></FeatureCard>
}
