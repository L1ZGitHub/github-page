import Link from "next/link"
import { FileText, Calendar, Eye, Clock } from "lucide-react"
import { getAllPostsUnfiltered } from "@/lib/blog"
import { getCategoryColors } from "@/lib/category-colors"
import type { BlogPostMeta, ArticleStatus } from "@/lib/mdx"

const statusConfig: Record<ArticleStatus, { label: string; classes: string }> = {
  draft: { label: "Draft", classes: "bg-yellow-100 text-yellow-800" },
  scheduled: { label: "Scheduled", classes: "bg-blue-100 text-blue-800" },
  published: { label: "Published", classes: "bg-green-100 text-green-800" },
}

const tabConfig: { status: ArticleStatus; icon: typeof FileText }[] = [
  { status: "draft", icon: FileText },
  { status: "scheduled", icon: Calendar },
  { status: "published", icon: Eye },
]

function ArticleRow({ post }: { post: BlogPostMeta }) {
  const status = statusConfig[post.status]
  const category = getCategoryColors(post.category)

  return (
    <Link
      href={`/admin/${post.slug}`}
      className="group flex items-center gap-3 rounded-lg border border-gray-100 px-4 py-3 transition-colors hover:border-gray-200 hover:bg-gray-50"
    >
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-gray-900 group-hover:text-gray-700">
          {post.title}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">
          <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${category.classes}`}>
            {post.category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="size-3" />
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          {post.scheduledDate && (
            <span className="flex items-center gap-1 text-blue-600">
              <Clock className="size-3" />
              Scheduled: {new Date(post.scheduledDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock className="size-3" />
            {post.readTime}
          </span>
        </div>
      </div>
      <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${status.classes}`}>
        {status.label}
      </span>
    </Link>
  )
}

export default function AdminDashboard() {
  const allPosts = getAllPostsUnfiltered()

  const grouped: Record<ArticleStatus, BlogPostMeta[]> = {
    draft: [],
    scheduled: [],
    published: [],
  }

  for (const post of allPosts) {
    grouped[post.status].push(post)
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Blog Admin</h1>
        <p className="mt-1 text-sm text-gray-500">
          {allPosts.length} articles total —{" "}
          {grouped.draft.length} drafts, {grouped.scheduled.length} scheduled, {grouped.published.length} published
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-10">
        {tabConfig.map(({ status, icon: Icon }) => {
          const posts = grouped[status]
          const config = statusConfig[status]

          return (
            <section key={status}>
              <div className="mb-3 flex items-center gap-2">
                <Icon className="size-4 text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-900">{config.label}</h2>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${config.classes}`}>
                  {posts.length}
                </span>
              </div>

              {posts.length === 0 ? (
                <p className="py-4 text-sm text-gray-400">No {status} articles.</p>
              ) : (
                <div className="space-y-2">
                  {posts.map((post) => (
                    <ArticleRow key={post.slug} post={post} />
                  ))}
                </div>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}
