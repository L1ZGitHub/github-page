import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getAllPosts } from "@/lib/blog"
import { BlogContent } from "../../blog-content"

// Category slug → display name mapping
const CATEGORIES: Record<string, string> = {
  "ai-ml": "AI & ML",
  "ai-agents": "AI Agents",
  "rag-systems": "RAG Systems",
  "ai-security": "AI Security",
  "engineering": "Engineering",
  "getting-started": "Getting Started",
  "industry": "Industry",
  "strategy": "Strategy",
}

// SEO descriptions per category
const DESCRIPTIONS: Record<string, string> = {
  "ai-ml":
    "Models, architectures, benchmarks. What works, what doesn't, what the papers get wrong.",
  "ai-agents":
    "Multi-agent systems, orchestration, tool use, Model Context Protocol. Built, broken, shipped.",
  "rag-systems":
    "Retrieval-augmented generation: chunking, vector stores, hybrid search, eval. Notes from production.",
  "ai-security":
    "Privacy-preserving AI, differential privacy, federated learning, ZKP, FHE. Threat models for real systems.",
  "engineering":
    "MLOps, CI/CD, deployment, monitoring. How AI actually runs in production.",
  "getting-started":
    "Tutorials for people starting with AI, ML, and RAG. No fluff.",
  "industry":
    "Where AI pays off and where it doesn't: finance, healthcare, and more. Written from experience.",
  "strategy":
    "Build vs buy, team shape, roadmaps. Written from the chair of someone shipping.",
}

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const categoryName = CATEGORIES[slug]
  if (!categoryName) return {}

  return {
    title: `${categoryName} Articles | Helain Zimmermann`,
    description:
      DESCRIPTIONS[slug] ||
      `Articles about ${categoryName} by Helain Zimmermann.`,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const categoryName = CATEGORIES[slug]
  if (!categoryName) notFound()

  const allPosts = getAllPosts()
  const posts = allPosts.filter((p) => p.category === categoryName)
  const categories = [categoryName] // Only show current category

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <Link
        href="/blog"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-900"
      >
        <ArrowLeft className="size-3.5" />
        All articles
      </Link>

      <h1 className="mb-2 text-3xl font-bold text-gray-900">{categoryName}</h1>
      <p className="mb-10 text-lg text-gray-600">{DESCRIPTIONS[slug]}</p>

      <BlogContent posts={posts} categories={categories} />
    </div>
  )
}
