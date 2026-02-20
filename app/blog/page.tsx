import { Metadata } from "next"
import { getAllPosts } from "@/lib/blog"
import { BlogCard } from "@/components/blog-card"

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles on AI, machine learning, RAG systems, NLP, and more.",
}

export default function BlogIndex() {
  const posts = getAllPosts()

  return (
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-32">
      <div className="mb-12">
        <h1 className="mb-3 text-4xl font-bold text-gray-900">Blog</h1>
        <p className="text-lg text-gray-600">
          Articles on AI, machine learning, RAG systems, and more.
        </p>
        <p className="mt-2 text-sm text-gray-500">{posts.length} articles</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
