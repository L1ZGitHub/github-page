import { Metadata } from "next"
import { getAllPosts, getAllCategories } from "@/lib/blog"
import { BlogContent } from "./blog-content"

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles on AI, machine learning, RAG systems, NLP, and more.",
}

export default function BlogIndex() {
  const posts = getAllPosts()
  const categories = getAllCategories()

  return (
    <div className="relative" style={{ background: "linear-gradient(to bottom right, #f8fafc, white 40%, rgba(255,251,235,0.3) 60%, white 75%, #f8fafc)" }}>
      {/* Decorative blobs spanning full height */}
      <div className="pointer-events-none absolute top-[10%] left-[20%] h-96 w-96 rounded-full bg-amber-100/30 blur-[64px]" />
      <div className="pointer-events-none absolute top-[25%] right-[20%] h-80 w-80 rounded-full bg-violet-100/30 blur-[64px]" />
      <div className="pointer-events-none absolute top-[60%] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-amber-100/15 blur-[64px]" />

      {/* Hero section */}
      <section className="relative pt-32 pb-16 text-center">
        <div className="relative mx-auto max-w-3xl px-6">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-[3.5rem] leading-tight">
            Blog
          </h1>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-gray-600">
            Insights on AI, Machine Learning, RAG Systems, and the future of
            intelligent software
          </p>
        </div>
      </section>

      {/* Filters + articles grid */}
      <section className="relative px-6 pb-24">
        <div className="relative mx-auto max-w-[1200px]">
          <BlogContent posts={posts} categories={categories} />
        </div>
      </section>
    </div>
  )
}
