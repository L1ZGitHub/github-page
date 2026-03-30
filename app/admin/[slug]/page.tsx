"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User, BarChart3, Tag, Link2 } from "lucide-react"
import ArticleActions from "../components/article-actions"

const API_BASE = "/api/blog"

interface Article {
  slug: string
  title: string
  description: string
  date: string
  dateModified: string
  status: "draft" | "scheduled" | "published"
  scheduledDate: string
  category: string
  difficulty: string
  readTime: string
  author: string
  tags: string[]
  outgoing_links: string[]
  body?: string
}

const statusClasses: Record<string, string> = {
  draft: "bg-yellow-100 text-yellow-800",
  scheduled: "bg-blue-100 text-blue-800",
  published: "bg-green-100 text-green-800",
}

const categoryColors: Record<string, { bg: string; color: string }> = {
  "AI & ML": { bg: "#fffbeb", color: "#d97706" },
  "RAG Systems": { bg: "#f5f3ff", color: "#7c3aed" },
  "NLP & Privacy": { bg: "#ecfdf5", color: "#059669" },
  "Engineering": { bg: "#eff6ff", color: "#2563eb" },
  "Tutorials": { bg: "#fef3c7", color: "#d97706" },
}

const difficultyColors: Record<string, { bg: string; color: string }> = {
  beginner: { bg: "#ecfdf5", color: "#059669" },
  intermediate: { bg: "#fffbeb", color: "#d97706" },
  advanced: { bg: "#fef2f2", color: "#dc2626" },
}

export default function AdminArticleDetail() {
  const params = useParams()
  const slug = params.slug as string
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  function loadArticle() {
    setLoading(true)
    fetch(`${API_BASE}/articles/${slug}?content=true`, { credentials: "include" })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((data) => setArticle(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadArticle()
  }, [slug])

  if (loading) return <p className="py-16 text-center text-gray-400">Loading...</p>
  if (error) return <p className="py-16 text-center text-red-500">Error: {error}</p>
  if (!article) return <p className="py-16 text-center text-gray-400">Article not found</p>

  const catStyle = categoryColors[article.category] || { bg: "#f3f4f6", color: "#374151" }
  const diffStyle = difficultyColors[article.difficulty] || { bg: "#f3f4f6", color: "#374151" }

  return (
    <div>
      <Link
        href="/admin"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-900"
      >
        <ArrowLeft className="size-3.5" />
        Back to dashboard
      </Link>

      {/* Metadata panel */}
      <div className="mb-8 rounded-xl border border-gray-200 bg-gray-50 p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusClasses[article.status]}`}>
            {article.status}
          </span>
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-medium"
            style={{ backgroundColor: catStyle.bg, color: catStyle.color }}
          >
            {article.category}
          </span>
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-medium"
            style={{ backgroundColor: diffStyle.bg, color: diffStyle.color }}
          >
            <span className="flex items-center gap-1">
              <BarChart3 className="size-3" />
              {article.difficulty}
            </span>
          </span>
        </div>

        <h1 className="mb-4 text-2xl font-bold text-gray-900">{article.title}</h1>
        <p className="mb-4 text-sm text-gray-600">{article.description}</p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <Calendar className="size-4" />
            {new Date(article.date).toLocaleDateString("en-US", {
              year: "numeric", month: "long", day: "numeric",
            })}
          </span>
          {article.scheduledDate && (
            <span className="flex items-center gap-1.5 text-blue-600">
              <Clock className="size-4" />
              Scheduled: {new Date(article.scheduledDate).toLocaleDateString("en-US", {
                year: "numeric", month: "long", day: "numeric",
              })}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Clock className="size-4" />
            {article.readTime}
          </span>
          <span className="flex items-center gap-1.5">
            <User className="size-4" />
            {article.author}
          </span>
        </div>

        {article.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Tag className="size-3.5 text-gray-400" />
            {article.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                {tag}
              </span>
            ))}
          </div>
        )}

        <ArticleActions
          slug={slug}
          status={article.status as "draft" | "scheduled" | "published"}
          scheduledDate={article.scheduledDate || undefined}
          onAction={loadArticle}
        />

        {article.outgoing_links.length > 0 && (
          <div className="mt-4 border-t border-gray-200 pt-4">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-gray-500">
              <Link2 className="size-3.5" />
              Outgoing cross-references ({article.outgoing_links.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {article.outgoing_links.map((ref) => (
                <Link
                  key={ref}
                  href={`/admin/${ref}`}
                  className="rounded-md bg-white px-2.5 py-1 text-xs text-blue-600 ring-1 ring-gray-200 transition-colors hover:bg-blue-50 hover:ring-blue-300"
                >
                  {ref}
                </Link>
              ))}
            </div>
          </div>
        )}

        {article.status === "published" && (
          <div className="mt-4 border-t border-gray-200 pt-4">
            <a
              href={`/blog/${slug}`}
              target="_blank"
              className="text-sm text-blue-600 hover:underline"
            >
              View published article →
            </a>
          </div>
        )}
      </div>

      {/* Article preview (raw markdown) */}
      {article.body && (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-sm font-semibold text-gray-500">Article Preview (Markdown)</h2>
          <div className="prose prose-sm max-w-none">
            <pre className="whitespace-pre-wrap rounded-lg bg-gray-50 p-4 text-sm leading-relaxed text-gray-800">
              {article.body}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}
