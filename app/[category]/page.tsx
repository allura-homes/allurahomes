import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCategoryBySlug, getPostsByCategory, getCategories } from '@/lib/wordpress/api'
import { CategoryContent } from './content'

// Only allow known blog category slugs to be matched here.
// This prevents this catch-all from swallowing real pages like /about, /contact etc.
const BLOG_CATEGORY_SLUGS = [
  'hosting-resources',
  'hosting',              // short alias used in footer links
  'shortterm-rental-regulations',
  'regulations',          // short alias used in footer links
  'ai',
]

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories
    .filter((c) => BLOG_CATEGORY_SLUGS.includes(c.slug))
    .map((c) => ({ category: c.slug }))
}

type Props = { params: Promise<{ category: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params

  if (!BLOG_CATEGORY_SLUGS.includes(slug)) return {}

  const cat = await getCategoryBySlug(slug)
  if (!cat) return {}

  return {
    title: cat.name,
    description: cat.description || `Browse ${cat.name} articles from Allura Homes.`,
    openGraph: {
      title: `${cat.name} | Allura Homes`,
      description: cat.description,
    },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params

  if (!BLOG_CATEGORY_SLUGS.includes(slug)) {
    notFound()
  }

  const cat = await getCategoryBySlug(slug)
  if (!cat) notFound()

  const { posts } = await getPostsByCategory(slug)

  return <CategoryContent category={cat} posts={posts} />
}
