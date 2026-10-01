import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function ContentSection({ children, dark = false, muted = false, id }: { children: ReactNode; dark?: boolean; muted?: boolean; id?: string }) {
  return <section id={id} className={cn('py-20 lg:py-28', dark ? 'bg-navy-deep text-primary-foreground' : muted ? 'bg-offwhite text-foreground' : 'bg-background text-foreground')}><div className="mx-auto max-w-7xl px-6">{children}</div></section>
}

export function FeatureCard({ title, children, icon }: { title: string; children: ReactNode; icon?: ReactNode }) {
  return <article className="group h-full rounded-xl bg-card p-8 text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">{icon && <div className="mb-4 flex size-14 items-center justify-center rounded-lg bg-navy-deep/5">{icon}</div>}<h3 className="font-headline text-lg font-semibold uppercase tracking-wider text-navy-deep" style={{ fontFamily: 'var(--font-headline)' }}>{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</p></article>
}
