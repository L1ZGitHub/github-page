import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock, User, BarChart3, Tag, Link2 } from "lucide-react"
import { getPostBySlug } from "@/lib/mdx"
import { getCategoryStyle, getDifficultyStyle } from "@/lib/category-colors"
import ArticleActions from "../components/article-actions"

export const dynamic = "force-dynamic"

interface Props {
  params: Promise<{ slug: string }>
}

const statusClasses: Record<string, string> = {
  draft: "bg-yellow-100 text-yellow-800",
  scheduled: "bg-blue-100 text-blue-800",
  published: "bg-green-100 text-green-800",
}

function extractCrossReferences(html: string): string[] {
  const regex = /href="\/blog\/([^"#]+)"/g
  const slugs = new Set<string>()
  let match
  while ((match = regex.exec(html)) !== null) {
    slugs.add(match[1])
  }
  return Array.from(slugs)
}


export default async function AdminArticleDetail({ params }: Props) {
  const { slug } = await params

  let post
  try {
    post = await getPostBySlug(slug)
  } catch {
    notFound()
  }

  const crossRefs = extractCrossReferences(post.content)

  return (
    <div>
      <Link
        href="/admin"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-900"
      >
        <ArrowLeft className="size-3.5" />
        Back to dashboard
      </Link>

      {/* Metadata panel */}
      <div className="mb-8 rounded-xl border border-gray-200 bg-gray-50 p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusClasses[post.status]}`}>
            {post.status}
          </span>
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-medium"
            style={getCategoryStyle(post.category)}
          >
            {post.category}
          </span>
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-medium"
            style={getDifficultyStyle(post.difficulty)}
          >
            <span className="flex items-center gap-1">
              <BarChart3 className="size-3" />
              {post.difficulty}
            </span>
          </span>
        </div>

        <h1 className="mb-4 text-2xl font-bold text-gray-900">{post.title}</h1>
        <p className="mb-4 text-sm text-gray-600">{post.description}</p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <Calendar className="size-4" />
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          {post.scheduledDate && (
            <span className="flex items-center gap-1.5 text-blue-600">
              <Clock className="size-4" />
              Scheduled: {new Date(post.scheduledDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Clock className="size-4" />
            {post.readTime}
          </span>
          <span className="flex items-center gap-1.5">
            <User className="size-4" />
            {post.author}
          </span>
        </div>

        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Tag className="size-3.5 text-gray-400" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Article actions (client component) */}
        <ArticleActions slug={slug} status={post.status} scheduledDate={post.scheduledDate} />

        {/* Cross-references */}
        {crossRefs.length > 0 && (
          <div className="mt-4 border-t border-gray-200 pt-4">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-gray-500">
              <Link2 className="size-3.5" />
              Outgoing cross-references ({crossRefs.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {crossRefs.map((ref) => (
                <Link
                  key={ref}
                  href={`/admin/${ref}`}
                  className="rounded-md bg-white px-2.5 py-1 text-xs text-blue-600 ring-1 ring-gray-200 transition-colors hover:bg-blue-50 hover:ring-blue-300"
                >
                  {ref}
                </Link>
              ))}
            </div>
          </div>
        )}

        {post.status === "published" && (
          <div className="mt-4 border-t border-gray-200 pt-4">
            <a
              href={`/blog/${slug}`}
              target="_blank"
              className="text-sm text-blue-600 hover:underline"
            >
              View published article →
            </a>
          </div>
        )}
      </div>

      {/* Article preview (full rendered HTML) */}
      <div
        className="article-prose"
        style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem 0 4rem" }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  )
}
