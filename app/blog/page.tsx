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
      {/* Hero section with gradient background matching old site */}
      <section className="relative overflow-hidden pt-32 pb-16 text-center">
        {/* Background gradient (old site: linear-gradient to bottom-right from slate-50 via white to amber-50/30) */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-amber-50/30" />

        {/* Decorative blobs matching old site positions */}
        <div className="absolute top-[20%] left-[20%] h-96 w-96 rounded-full bg-amber-100/30 blur-[64px]" />
        <div className="absolute bottom-[20%] right-[20%] h-80 w-80 rounded-full bg-violet-100/30 blur-[64px]" />

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

      {/* Filter pills section (old site: margin-top -1rem relative to hero, margin-bottom 3rem) */}
      <section className="relative -mt-4 mb-0 px-6">
        <div className="mx-auto max-w-[1200px]">
          {/* Content rendered client-side with filters + grid */}
        </div>
      </section>

      {/* Articles section with subtle background gradient */}
      <section className="relative px-6 pb-24" style={{ background: "linear-gradient(to bottom, white, #f8fafc)" }}>
        {/* Background blob matching old site */}
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-100/15 blur-[64px]" />

        <div className="relative mx-auto max-w-[1200px]">
          <BlogContent posts={posts} categories={categories} />
        </div>
      </section>
    </div>
  )
}
