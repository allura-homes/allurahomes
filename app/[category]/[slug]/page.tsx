import type { Metadata } from 'next'
import { SHARE_IMAGE, metaDescription, metaTitle } from '@/lib/seo'
import { notFound, permanentRedirect } from 'next/navigation'
import { getPostBySlug, getPostsByCategory, getCategories } from '@/lib/wordpress/api'
import { CANONICAL_CATEGORIES } from '@/lib/wordpress/canonical'
import { ArticleContent } from './content'

const BLOG_CATEGORY_SLUGS = CANONICAL_CATEGORIES

export async function generateStaticParams() {
  const categories = await getCategories()
  const params: { category: string; slug: string }[] = []

  for (const cat of categories) {
    if (!BLOG_CATEGORY_SLUGS.includes(cat.slug as any)) continue
    const { posts } = await getPostsByCategory(cat.slug)
    for (const post of posts) {
      params.push({ category: post.category.slug, slug: post.slug })
    }
  }

  return params
}

type Props = { params: Promise<{ category: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) {
    return {}
  }

  const canonicalUrl = `https://www.allurahomes.com/${post.category.slug}/${slug}`
  const location = post.title.match(/^Comprehensive Guide to Operating an? Airbnb or Short-Term Rental in (.*?)(?:, California)?\.?$/i)?.[1]
  const permitLocation = post.title.match(/^Get Started Registering Your Airbnb for a Short-Term Rental Permit in (.*?), California$/i)?.[1]
  const shortTitle = post.category.slug === 'regulations'
    ? location ? `${location} STR Regulations` : permitLocation ? `${permitLocation} Airbnb Permit Registration` : post.title.replace(/^What Should You Know About (.*?)\?$/i, '$1')
    : post.title
  const title = metaTitle(shortTitle)

  return {
    title: { absolute: title },
    description: metaDescription(post.excerpt),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description: metaDescription(post.excerpt),
      type: 'article',
      url: canonicalUrl,
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: [post.author.name],
      images: [SHARE_IMAGE],
    },
  }
}

export default async function ArticlePage({ params }: Props) {
  const { category: categorySlug, slug } = await params

  if (!BLOG_CATEGORY_SLUGS.includes(categorySlug as any)) {
    notFound()
  }

  const post = await getPostBySlug(slug)
  if (!post) {
    notFound()
  }

  if (!post.category.slug) {
    notFound()
  }

  if (categorySlug !== post.category.slug) {
    permanentRedirect(`/${post.category.slug}/${slug}`)
  }

  const { posts: relatedPosts } = await getPostsByCategory(post.category.slug)
  const related = relatedPosts.filter((p) => p.id !== post.id).slice(0, 3)

  return <ArticleContent post={post} relatedPosts={related} />
}
