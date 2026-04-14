import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getAllPosts } from "@/lib/blog"
import { BlogCard } from "@/components/blog-card"

export function LatestArticles() {
  const posts = getAllPosts().slice(0, 6)

  return (
    <section className="relative overflow-hidden px-6 py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-violet-100/20 blur-[64px]" />

      <div className="relative">
        <div className="mb-16 text-center">
          <div className="mx-auto mb-6 h-px w-16 bg-gray-300" />
          <h2 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">Latest Articles</h2>
          <p className="text-lg text-gray-600">Notes from production: RAG, agents, privacy-preserving NLP.</p>
        </div>

        <div className="mx-auto grid max-w-[1000px] gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-7 py-3.5 font-medium text-white transition-all hover:bg-gray-800 hover:shadow-lg hover:scale-105"
          >
            All Articles
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
