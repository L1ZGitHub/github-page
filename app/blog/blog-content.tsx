"use client"

import { useState, useEffect, useRef } from "react"
import { BlogCard } from "@/components/blog-card"
import type { BlogPostMeta } from "@/lib/mdx"

interface BlogContentProps {
  posts: BlogPostMeta[]
  categories: string[]
}

export function BlogContent({ posts, categories }: BlogContentProps) {
  const [activeCategory, setActiveCategory] = useState("All")
  const gridRef = useRef<HTMLDivElement>(null)

  const filteredPosts = posts.filter((post) => {
    return activeCategory === "All" || post.category === activeCategory
  })

  /* Staggered scroll-in animation (matching old site's IntersectionObserver) */
  useEffect(() => {
    if (!gridRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: "0px", threshold: 0.1 }
    )

    const cards = gridRef.current.querySelectorAll(".article-card-animated")
    cards.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [filteredPosts])

  return (
    <>
      {/* Category filter pills - matching old site exactly */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        <button
          onClick={() => setActiveCategory("All")}
          className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200 ${
            activeCategory === "All"
              ? "border-amber-500 bg-amber-500 text-white"
              : "border-gray-200 bg-white text-gray-600 hover:border-amber-400 hover:text-amber-600"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200 ${
              activeCategory === category
                ? "border-amber-500 bg-amber-500 text-white"
                : "border-gray-200 bg-white text-gray-600 hover:border-amber-400 hover:text-amber-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Articles grid */}
      <div ref={gridRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))
        ) : (
          <div className="col-span-full py-16 text-center">
            <div className="mb-4 text-5xl text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700">
              No articles found
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              No articles match the selected category. Try a different filter.
            </p>
          </div>
        )}
      </div>
    </>
  )
}
