import type { Metadata } from 'next'
import { SHARE_IMAGE, metaDescription, metaTitle } from '@/lib/seo'
import { notFound } from 'next/navigation'
import { getPostBySlug, getPostsByCategory, getCategories } from '@/lib/wordpress/api'
import { ArticleContent } from './content'

const BLOG_CATEGORY_SLUGS = [
  'hosting-resources',
  'hosting',
  'shortterm-rental-regulations',
  'regulations',
  'ai',
]

export async function generateStaticParams() {
  const categories = await getCategories()
  const params: { category: string; slug: string }[] = []

  for (const cat of categories) {
    if (!BLOG_CATEGORY_SLUGS.includes(cat.slug)) continue
    const { posts } = await getPostsByCategory(cat.slug)
    for (const post of posts) {
      params.push({ category: cat.slug, slug: post.slug })
    }
  }

  return params
}

type Props = { params: Promise<{ category: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}

  const postUrl = `https://www.allurahomes.com/${category}/${slug}`
  
  // Special handling for Chula Vista regulations page
  if (slug === 'chula-vista-ca' && category === 'regulations') {
    return {
      title: { absolute: 'Chula Vista Airbnb Rules & Vacation Rental Management | Allura' },
      description: 'Chula Vista Airbnb and short-term rental rules: STR permit, business license, TOT and limits. Need a manager? Allura Homes has hosted since 2013.',
      alternates: { canonical: postUrl },
      openGraph: {
        title: 'Chula Vista Airbnb Rules & Vacation Rental Management | Allura',
        description: 'Chula Vista Airbnb and short-term rental rules: STR permit, business license, TOT and limits. Need a manager? Allura Homes has hosted since 2013.',
        type: 'article',
        url: postUrl,
        publishedTime: post.date,
        modifiedTime: post.modified,
        authors: [post.author.name],
        images: [SHARE_IMAGE],
      },
    }
  }
  
  const location = post.title.match(/^Comprehensive Guide to Operating an? Airbnb or Short-Term Rental in (.*?)(?:, California)?\.?$/i)?.[1]
  const permitLocation = post.title.match(/^Get Started Registering Your Airbnb for a Short-Term Rental Permit in (.*?), California$/i)?.[1]
  const shortTitle = category === 'regulations'
    ? location ? `${location} STR Regulations` : permitLocation ? `${permitLocation} Airbnb Permit Registration` : post.title.replace(/^What Should You Know About (.*?)\?$/i, '$1')
    : post.title
  const title = metaTitle(shortTitle)

  return {
    title: { absolute: title },
    description: metaDescription(post.excerpt),
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title,
      description: metaDescription(post.excerpt),
      type: 'article',
      url: postUrl,
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: [post.author.name],
      images: [SHARE_IMAGE],
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { category: categorySlug, slug } = await params

  if (!BLOG_CATEGORY_SLUGS.includes(categorySlug)) {
    notFound()
  }

  const post = await getPostBySlug(slug)
  if (!post) notFound()

  // Fetch related posts from same category
  const { posts: relatedPosts } = await getPostsByCategory(post.category.slug)
  const related = relatedPosts.filter((p) => p.id !== post.id).slice(0, 3)

  // Chula Vista FAQ schema
  const chulaVistaFaqSchema = slug === 'chula-vista-ca' && categorySlug === 'regulations' ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Who can manage my Chula Vista vacation rental?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Allura Homes manages Chula Vista vacation rentals. We are a boutique manager hosting since 2013, with less than 20 homes. Airbnb Superhost, Vrbo Premier Host, and a 4.9 star rating in 2025. Your local contact, available 24/7. Fees: 20% for short-term stays, from 15% for furnished 30+ night stays, supplies at cost.',
        },
      },
    ],
  } : null

  return (
    <>
      <ArticleContent post={post} relatedPosts={related} />
      {chulaVistaFaqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(chulaVistaFaqSchema).replace(/</g, '\\u003c') }}
        />
      )}
    </>
  )
}
