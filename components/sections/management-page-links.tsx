import Link from 'next/link'

export function ManagementPageLinks({ current }: { current?: 'boutique' | 'switch' }) {
  const linkClass = 'font-semibold text-gold-dark underline underline-offset-4 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4'

  return (
    <section aria-label="Related management information" className="bg-background py-10 text-foreground">
      <div className="container max-w-4xl text-base leading-relaxed">
        <p className="text-pretty">
          {current === 'boutique' ? (
            <>Already working with a manager? Read about <Link href="/property-management/switch-property-managers-san-diego" className={linkClass}>switching managers</Link>.</>
          ) : current === 'switch' ? (
            <>Learn more about our <Link href="/san-diego-vacation-rental-management" className={linkClass}>San Diego Vacation Rental Management</Link>.</>
          ) : (
            <>Explore our <Link href="/san-diego-vacation-rental-management" className={linkClass}>San Diego Vacation Rental Management</Link> or read about <Link href="/property-management/switch-property-managers-san-diego" className={linkClass}>switching managers</Link>.</>
          )}
        </p>
      </div>
    </section>
  )
}
