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
    <div className="relative overflow-hidden">
      {/* Full-page background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white via-30% to-slate-50" />

      {/* Decorative blobs spanning hero + cards */}
      <div className="absolute top-[10%] left-[15%] h-[500px] w-[500px] rounded-full bg-amber-100/30 blur-3xl" />
      <div className="absolute top-[30%] right-[10%] h-[400px] w-[400px] rounded-full bg-violet-100/25 blur-3xl" />
      <div className="absolute bottom-[10%] left-[40%] h-[500px] w-[500px] rounded-full bg-amber-100/15 blur-3xl" />

      {/* Hero section */}
      <section className="relative pt-32 pb-16 text-center">
        <div className="relative mx-auto max-w-3xl px-6">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Blog
          </h1>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-gray-600">
            Insights on AI, Machine Learning, RAG Systems, and the future of
            intelligent software
          </p>
          <p className="mt-3 text-sm text-gray-400">
            {posts.length} article{posts.length !== 1 ? "s" : ""}
          </p>
        </div>
      </section>

      {/* Articles section */}
      <section className="relative px-6 pb-24">
        <div className="relative mx-auto max-w-[1200px]">
          <BlogContent posts={posts} categories={categories} />
        </div>
      </section>
    </div>
  )
}
