import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Clock, BarChart3 } from "lucide-react"
import { getPostBySlug } from "@/lib/mdx"
import { getAllPosts, getRelatedPosts } from "@/lib/blog"
import { getCategoryStyle, getDifficultyStyle } from "@/lib/category-colors"
import { ARXIV_PAPER_ID, ORG_ID, PERSON_ID } from "@/lib/person-id"
import { RelatedArticleCard } from "@/components/related-article-card"
import { AnimatedCards } from "@/components/animated-cards"
import { ArticleByline } from "@/components/article-byline"
import { ArticleChangelog } from "@/components/article-changelog"
import { AuthorBio } from "@/components/author-bio"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const post = await getPostBySlug(slug)
    if (post.status !== "published") {
      return { title: "Article Not Found" }
    }
    return {
      title: post.title,
      description: post.description,
      alternates: {
        canonical: `https://helain-zimmermann.com/blog/${slug}`,
      },
      openGraph: {
        title: post.title,
        description: post.description,
        url: `https://helain-zimmermann.com/blog/${slug}`,
        type: "article",
        publishedTime: post.date,
        modifiedTime: post.dateModified || post.date,
        authors: [post.author],
        tags: post.tags,
      },
      twitter: {
        card: "summary",
        title: post.title,
        description: post.description,
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

  if (post.status !== "published") {
    notFound()
  }

  const relatedPosts = getRelatedPosts(slug, 3)

  // Pillar articles about privacy-preserving NLP cite the arXiv paper.
  const isPrivacyNlpPillar =
    post.tags?.some((t) =>
      /privacy|anonymi[sz]|differential|federated/i.test(t),
    ) ?? false

  const blogPosting: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.dateModified || post.date,
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://helain-zimmermann.com/blog/${slug}`,
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
  }

  if (isPrivacyNlpPillar) {
    blogPosting.citation = [
      {
        "@type": "ScholarlyArticle",
        "@id": ARXIV_PAPER_ID,
      },
    ]
  }

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Blog", item: "https://helain-zimmermann.com/blog" },
              { "@type": "ListItem", position: 2, name: post.category, item: "https://helain-zimmermann.com/blog" },
              { "@type": "ListItem", position: 3, name: post.title, item: `https://helain-zimmermann.com/blog/${slug}` },
            ],
          }),
        }}
      />
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

          {/* Byline with author photo + E-E-A-T signals */}
          <div style={{ margin: "1rem 0 0.75rem" }}>
            <ArticleByline datePublished={post.date} dateModified={post.dateModified} />
          </div>

          {/* Meta row */}
          <div className="article-meta-row">
            <span className="article-meta-item">
              <Clock className="size-4 text-gray-400" />
              {post.readTime}
            </span>
            <span className="article-difficulty-badge" style={getDifficultyStyle(post.difficulty)}>
              <BarChart3 className="size-3" />
              {post.difficulty}
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
        style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem 1.5rem 1rem" }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Changelog (only if entries exist) */}
      <ArticleChangelog entries={post.changelog || []} />

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem 1.5rem 2rem", borderTop: "1px solid #e5e7eb" }}>
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

      {/* Author bio (E-E-A-T) */}
      <div style={{ padding: "0 1.5rem 4rem" }}>
        <AuthorBio />
      </div>
    </article>
  )
}
