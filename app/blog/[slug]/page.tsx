import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, Clock, User, BarChart3 } from "lucide-react"
import { getAllSlugs, getPostBySlug } from "@/lib/mdx"
import { getRelatedPosts } from "@/lib/blog"
import { getCategoryStyle, getDifficultyStyle } from "@/lib/category-colors"
import { RelatedArticleCard } from "@/components/related-article-card"
import { AnimatedCards } from "@/components/animated-cards"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const post = await getPostBySlug(slug)
    return {
      title: post.title,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        type: "article",
        publishedTime: post.date,
        authors: [post.author],
        tags: post.tags,
      },
    }
  } catch {
    return { title: "Article Not Found" }
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params

  let post
  try {
    post = await getPostBySlug(slug)
  } catch {
    notFound()
  }

  const relatedPosts = getRelatedPosts(slug, 3)

  return (
    <article>
      {/* Article header with gradient background */}
      <section className="article-header-hero" style={{ padding: "8rem 1.5rem 3rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {/* Breadcrumb */}
          <nav className="article-breadcrumb">
            <Link href="/blog">Blog</Link>
            <span className="separator">/</span>
            <Link href="/blog">{post.category}</Link>
            <span className="separator">/</span>
            <span className="current">{post.title}</span>
          </nav>

          {/* Category badge with per-category colors */}
          <span className="article-category-badge" style={getCategoryStyle(post.category)}>{post.category}</span>

          {/* Title */}
          <h1 className="article-title">{post.title}</h1>

          {/* Meta row */}
          <div className="article-meta-row">
            <span className="article-meta-item">
              <Calendar className="size-4 text-gray-400" />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="article-meta-item">
              <Clock className="size-4 text-gray-400" />
              {post.readTime}
            </span>
            <span className="article-difficulty-badge" style={getDifficultyStyle(post.difficulty)}>
              <BarChart3 className="size-3" />
              {post.difficulty}
            </span>
            <span className="article-meta-item">
              <User className="size-4 text-gray-400" />
              {post.author}
            </span>
          </div>

          {/* Tags */}
          <div className="article-tags-row">
            {post.tags.map((tag) => (
              <span key={tag} className="article-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Article body */}
      <div
        className="article-prose"
        style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem 1.5rem 4rem" }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem 1.5rem 4rem", borderTop: "1px solid #e5e7eb" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827", marginBottom: "1.5rem" }}>
            Related Articles
          </h2>
          <AnimatedCards>
            <div className="grid gap-4 sm:grid-cols-3">
              {relatedPosts.map((related, i) => (
                <RelatedArticleCard key={related.slug} post={related} index={i} />
              ))}
            </div>
          </AnimatedCards>
          <div style={{ marginTop: "2rem" }}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 font-medium text-white transition-all hover:bg-gray-800 hover:scale-105"
            >
              All Articles
            </Link>
          </div>
        </section>
      )}
    </article>
  )
}
