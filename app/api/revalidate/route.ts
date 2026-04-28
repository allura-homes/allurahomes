import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// WordPress calls this webhook when a post is published, updated, or deleted.
// Set this URL in WP Admin → Settings → (or use a plugin like WP Webhooks):
//   https://allurahomes.com/api/revalidate?secret=YOUR_SECRET
//
// Add REVALIDATE_SECRET to your Vercel env vars to secure the endpoint.

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (process.env.REVALIDATE_SECRET && secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await request.json().catch(() => ({}))
    const slug: string | undefined = body?.post_slug ?? body?.slug
    const categorySlug: string | undefined = body?.category_slug ?? body?.category

    // Always revalidate the blog index paths
    revalidatePath('/hosting')
    revalidatePath('/hosting-resources')
    revalidatePath('/regulations')
    revalidatePath('/shortterm-rental-regulations')
    revalidatePath('/ai')

    // If a specific post slug was provided, revalidate that post across all categories
    if (slug) {
      revalidatePath(`/hosting/${slug}`)
      revalidatePath(`/regulations/${slug}`)
      revalidatePath(`/ai/${slug}`)
    }

    // If a specific category was provided, also revalidate its index
    if (categorySlug) {
      revalidatePath(`/${categorySlug}`)
    }

    return NextResponse.json({ revalidated: true, slug, categorySlug })
  } catch {
    return NextResponse.json({ message: 'Revalidation failed' }, { status: 500 })
  }
}

// Also support GET for easy browser testing
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (process.env.REVALIDATE_SECRET && secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  revalidatePath('/hosting')
  revalidatePath('/regulations')
  revalidatePath('/ai')

  return NextResponse.json({ revalidated: true, message: 'All blog paths revalidated' })
}
