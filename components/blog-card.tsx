import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import type { BlogPostMeta } from "@/lib/mdx"
import { getCategoryColors } from "@/lib/category-colors"

const difficultyColors: Record<string, string> = {
  beginner: "bg-emerald-50 text-emerald-600",
  intermediate: "bg-amber-50 text-amber-600",
  advanced: "bg-red-50 text-red-600",
}

export function BlogCard({ post, index }: { post: BlogPostMeta; index?: number }) {
  const catColors = getCategoryColors(post.category)
  const diffColor = difficultyColors[post.difficulty] || "bg-amber-50 text-amber-600"

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="article-card-animated group block"
      style={{ "--card-index": index ?? 0 } as React.CSSProperties}
    >
      <article className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
        <div className="flex flex-1 flex-col p-6">
          {/* Category badge with per-category colors */}
          <span
            className={`mb-3 inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold ${catColors.classes}`}
          >
            {post.category}
          </span>

          {/* Title */}
          <h2 className="mb-2 text-lg font-bold leading-snug text-gray-900 line-clamp-2">
            {post.title}
          </h2>

          {/* Description */}
          <p className="mb-auto text-sm leading-relaxed text-gray-600 line-clamp-2">
            {post.description}
          </p>

          {/* Meta row with border-top, matching old site */}
          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar className="size-3" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="size-3" />
                {post.readTime}
              </span>
            </div>
            <span
              className={`rounded-full px-2 py-0.5 text-[0.6875rem] font-semibold capitalize ${diffColor}`}
            >
              {post.difficulty}
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
