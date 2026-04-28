import type { Metadata } from 'next'
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
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Allura Homes`,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: [post.author.name],
      images: post.featuredImage
        ? [
            {
              url: post.featuredImage.url,
              width: post.featuredImage.width,
              height: post.featuredImage.height,
              alt: post.featuredImage.alt,
            },
          ]
        : undefined,
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

  return <ArticleContent post={post} relatedPosts={related} />
}
