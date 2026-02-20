"use client"

import { useState } from "react"
import { BlogCard } from "@/components/blog-card"
import type { BlogPostMeta } from "@/lib/mdx"

interface BlogContentProps {
  posts: BlogPostMeta[]
  categories: string[]
}

export function BlogContent({ posts, categories }: BlogContentProps) {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredPosts =
    activeCategory === "All"
      ? posts
      : posts.filter((post) => post.category === activeCategory)

  return (
    <>
      {/* Category filter pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        <button
          onClick={() => setActiveCategory("All")}
          className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
            activeCategory === "All"
              ? "bg-amber-500 text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
              activeCategory === category
                ? "bg-amber-500 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Articles grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))
        ) : (
          <div className="col-span-full py-16 text-center">
            <p className="text-lg font-semibold text-gray-700">
              No articles found
            </p>
            <p className="mt-1 text-sm text-gray-500">
              No articles match the selected category. Try a different filter.
            </p>
          </div>
        )}
      </div>
    </>
  )
}
