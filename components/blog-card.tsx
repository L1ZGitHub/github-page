import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, BarChart3 } from "lucide-react"
import type { BlogPostMeta } from "@/lib/mdx"

const difficultyColors: Record<string, string> = {
  beginner: "bg-emerald-50 text-emerald-700 border-emerald-200",
  intermediate: "bg-amber-50 text-amber-700 border-amber-200",
  advanced: "bg-red-50 text-red-700 border-red-200",
}

export function BlogCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-xl">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className={`text-xs ${difficultyColors[post.difficulty] || ""}`}
          >
            {post.difficulty}
          </Badge>
          <span className="text-xs text-gray-400">{post.category}</span>
        </div>

        <h3 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="mb-4 text-sm leading-relaxed text-gray-600 line-clamp-2">
          {post.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
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

        <div className="mt-4 flex flex-wrap gap-1.5">
          {post.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </article>
    </Link>
  )
}
