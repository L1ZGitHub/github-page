"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { BlogCard } from "@/components/blog-card"
import type { BlogPostMeta } from "@/lib/mdx"

interface BlogContentProps {
  posts: BlogPostMeta[]
  categories: string[]
}

export function BlogContent({ posts, categories }: BlogContentProps) {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory

    if (!searchQuery.trim()) return matchesCategory

    const query = searchQuery.toLowerCase()
    const matchesSearch =
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query) ||
      post.tags.some((tag) => tag.toLowerCase().includes(query))

    return matchesCategory && matchesSearch
  })

  return (
    <>
      {/* Search bar */}
      <div className="mx-auto mb-6 max-w-md">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full rounded-full border border-gray-200 bg-white/80 py-2.5 pl-10 pr-4 text-sm text-gray-700 placeholder-gray-400 backdrop-blur-sm transition-all duration-200 focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-200/50"
          />
        </div>
      </div>

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
              No articles match your search. Try different keywords or filters.
            </p>
          </div>
        )}
      </div>
    </>
  )
}
