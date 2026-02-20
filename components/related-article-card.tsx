import Link from "next/link"
import type { BlogPostMeta } from "@/lib/mdx"
import { getCategoryStyle } from "@/lib/category-colors"

/**
 * Compact card for the "Related Articles" section at the bottom of
 * article pages. Matches the old site's `.related-card` design:
 * - smaller padding & text
 * - category badge, title, 2-line description
 * - simple text-only meta line (read time + difficulty, no icons)
 * - no border-top separator, no date
 */
export function RelatedArticleCard({
  post,
  index,
}: {
  post: BlogPostMeta
  index?: number
}) {
  const catStyle = getCategoryStyle(post.category)

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="article-card-animated group flex flex-col gap-2 rounded-xl border border-gray-100 bg-white p-5 text-inherit no-underline transition-all duration-300 hover:-translate-y-[3px] hover:border-amber-200 hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)]"
      style={{ "--card-index": index ?? 0 } as React.CSSProperties}
    >
      {/* Category badge */}
      <span
        className="inline-block w-fit rounded-full px-2 py-0.5 text-[0.675rem] font-semibold"
        style={catStyle}
      >
        {post.category}
      </span>

      {/* Title */}
      <h3 className="text-[0.9375rem] font-semibold leading-snug text-gray-900 line-clamp-2">
        {post.title}
      </h3>

      {/* Description - 2-line clamp */}
      <p className="text-[0.8125rem] leading-normal text-gray-500 line-clamp-2">
        {post.description}
      </p>

      {/* Meta - simple text, no icons, matching old site */}
      <span className="text-xs text-gray-400">
        {post.readTime} &middot;{" "}
        <span className="capitalize">{post.difficulty}</span>
      </span>
    </Link>
  )
}
