import Image from 'next/image'
import Link from 'next/link'
import { BeforeAfterSlider } from '@/components/showcase/before-after-slider'
import { BRAND } from '@/lib/constants'

export const metadata = {
  title: 'Allura San Francisco | Property Transformation Showcase',
  description: 'See the stunning transformation of a San Francisco property by Allura Homes. Before and after photos showcasing our design expertise.',
}

const transformations = [
  {
    roomName: 'Guest Bedroom',
    beforeImage: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bedroom2-before-HY0P1oOtMr1fwx2I98gAlsnDuVVtBO.jpg',
    afterImage: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bedroom2.png-QBuSkPvx07zlPMbmbdaBToW22fT43X.jpeg',
    beforeAlt: 'Guest bedroom before renovation - dated decor',
    afterAlt: 'Guest bedroom after Allura staging - Japanese-inspired luxury',
  },
  {
    roomName: 'Primary Bedroom',
    beforeImage: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/japanese-bedroom1-before-RR9VK1GhMACD1zMacxtup9M8kWvM0z.jpg',
    afterImage: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/japanese-bedroom1.png-LPQA2qnxVkdpgZD2zA5nR1pgty1muU.jpeg',
    beforeAlt: 'Primary bedroom before - empty with dated curtains',
    afterAlt: 'Primary bedroom after Allura staging - warm Japanese aesthetic',
  },
  {
    roomName: 'Bathroom',
    beforeImage: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bathroom-before-4URmd0WikdMgGuMxgN3891x7kpkMT8.jpg',
    afterImage: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bathroom.png-EtttgU0uyFSlIUqtwNf7fNllKTbhXe.jpeg',
    beforeAlt: 'Bathroom before renovation - cluttered counters',
    afterAlt: 'Bathroom after Allura staging - spa-like retreat',
  },
  {
    roomName: 'Garden & Patio',
    beforeImage: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/garden-before-gxaFIcgD8E9OV04eTCCiZnVRMhxVmr.jpg',
    afterImage: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/garden-Id1tEiCChQdFn3cMrRAr1zwp5gCuQu.png',
    beforeAlt: 'Garden before - neglected outdoor space',
    afterAlt: 'Garden after Allura staging - stunning sunset entertaining area',
  },
]

const watermarkLogo = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/White%20Stacked%20-%20no%20background-7z0zSqfnTHEenr8FQRBrAwwt3t7arb.png'

export default function SanFranciscoShowcasePage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/garden-Id1tEiCChQdFn3cMrRAr1zwp5gCuQu.png"
            alt="Allura San Francisco Property"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6">
          <Link href="/" className="inline-block mb-8">
            <Image
              src={BRAND.logos.horizontalGold}
              alt="Allura Homes"
              width={220}
              height={60}
              className="object-contain"
            />
          </Link>
          <h1 
            className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Allura San Francisco
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            A stunning Japanese-inspired transformation in the heart of the city
          </p>
        </div>
      </header>

      {/* Intro Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            The Transformation
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            Below is the vision for minimal effort with big results. This San Francisco property 
            can achieve dramatic transformation under Allura&apos;s expert staging and design guidance. 
            Drawing inspiration from Japanese aesthetics, we create spaces that blend tranquility 
            with modern luxury. Drag the slider to see the remarkable before and after of each room.
          </p>
        </div>
      </section>

      {/* Before/After Sliders */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {transformations.map((room) => (
              <BeforeAfterSlider
                key={room.roomName}
                beforeImage={room.beforeImage}
                afterImage={room.afterImage}
                beforeAlt={room.beforeAlt}
                afterAlt={room.afterAlt}
                watermarkLogo={watermarkLogo}
                roomName={room.roomName}
              />
            ))}
          </div>
        </div>
      </section>


    </div>
  )
}
