"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { FileText, Calendar, Eye, Clock } from "lucide-react"
import AdminCalendar from "./components/calendar"

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
  outgoing_links: string[]
}

type Status = "draft" | "scheduled" | "published"

const statusConfig: Record<Status, { label: string; classes: string }> = {
  draft: { label: "Draft", classes: "bg-yellow-100 text-yellow-800" },
  scheduled: { label: "Scheduled", classes: "bg-blue-100 text-blue-800" },
  published: { label: "Published", classes: "bg-green-100 text-green-800" },
}

const categoryColors: Record<string, string> = {
  "AI & ML": "bg-amber-100 text-amber-800",
  "RAG Systems": "bg-violet-100 text-violet-800",
  "NLP & Privacy": "bg-emerald-100 text-emerald-800",
  "Engineering": "bg-blue-100 text-blue-800",
  "Tutorials": "bg-orange-100 text-orange-800",
}

const tabConfig: { status: Status; icon: typeof FileText }[] = [
  { status: "draft", icon: FileText },
  { status: "scheduled", icon: Calendar },
  { status: "published", icon: Eye },
]

function ArticleRow({ article }: { article: Article }) {
  const status = statusConfig[article.status]
  const catClass = categoryColors[article.category] || "bg-gray-100 text-gray-800"

  return (
    <Link
      href={`/admin/${article.slug}`}
      className="group flex items-center gap-3 rounded-lg border border-gray-100 px-4 py-3 transition-colors hover:border-gray-200 hover:bg-gray-50"
    >
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-gray-900 group-hover:text-gray-700">
          {article.title}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">
          <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${catClass}`}>
            {article.category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="size-3" />
            {new Date(article.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          {article.scheduledDate && (
            <span className="flex items-center gap-1 text-blue-600">
              <Clock className="size-3" />
              Scheduled: {new Date(article.scheduledDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock className="size-3" />
            {article.readTime}
          </span>
        </div>
      </div>
      <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${status.classes}`}>
        {status.label}
      </span>
    </Link>
  )
}

export default function AdminDashboard() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_BASE}/articles`, { credentials: "include" })
      .then((r) => r.json())
      .then((data) => setArticles(data))
      .catch(() => setArticles([]))
      .finally(() => setLoading(false))
  }, [])

  const grouped: Record<Status, Article[]> = { draft: [], scheduled: [], published: [] }
  for (const a of articles) {
    grouped[a.status]?.push(a)
  }

  if (loading) {
    return <p className="py-16 text-center text-gray-400">Loading...</p>
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Blog Admin</h1>
        <p className="mt-1 text-sm text-gray-500">
          {articles.length} articles total —{" "}
          {grouped.draft.length} drafts, {grouped.scheduled.length} scheduled, {grouped.published.length} published
        </p>
      </div>

      <AdminCalendar />

      <div className="space-y-10">
        {tabConfig.map(({ status, icon: Icon }) => {
          const posts = grouped[status]
          const config = statusConfig[status]

          return (
            <section key={status}>
              <div className="mb-3 flex items-center gap-2">
                <Icon className="size-4 text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-900">{config.label}</h2>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${config.classes}`}>
                  {posts.length}
                </span>
              </div>

              {posts.length === 0 ? (
                <p className="py-4 text-sm text-gray-400">No {status} articles.</p>
              ) : (
                <div className="space-y-2">
                  {posts.map((article) => (
                    <ArticleRow key={article.slug} article={article} />
                  ))}
                </div>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}
