import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { getAllSlugs, getPostBySlug } from "@/lib/mdx"
import { getRelatedPosts } from "@/lib/blog"
import { BlogCard } from "@/components/blog-card"

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
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      {/* Back link */}
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="size-4" />
        Back to Blog
      </Link>

      {/* Header */}
      <header className="mb-12">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {post.category}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {post.difficulty}
          </Badge>
        </div>

        <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl leading-tight">
          {post.title}
        </h1>

        <p className="mb-6 text-lg text-gray-600">{post.description}</p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <User className="size-4" />
            {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="size-4" />
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-4" />
            {post.readTime}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-gray-100 px-2.5 py-1 text-xs text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Article content */}
      <div
        className="prose prose-gray max-w-none prose-headings:font-bold prose-a:text-amber-600 prose-a:no-underline hover:prose-a:underline prose-code:rounded prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-pre:rounded-xl prose-pre:bg-gray-900 prose-pre:[&_code]:bg-transparent prose-pre:[&_code]:p-0 prose-img:rounded-xl"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-16 border-t border-gray-200 pt-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Related Articles</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((related) => (
              <BlogCard key={related.slug} post={related} />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
