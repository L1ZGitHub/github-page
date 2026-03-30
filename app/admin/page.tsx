"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { FileText, Calendar, Eye, Clock, Check } from "lucide-react"
import { DndContext, DragOverlay, type DragStartEvent, type DragEndEvent } from "@dnd-kit/core"
import AdminCalendar, { type CalendarData } from "./components/calendar"
import DraftCard, { DraftCardOverlay, type DraftArticle } from "./components/draft-card"

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

function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2500)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg">
      <Check className="size-4" />
      {message}
    </div>
  )
}

export default function AdminDashboard() {
  const [articles, setArticles] = useState<Article[]>([])
  const [calendarData, setCalendarData] = useState<CalendarData>({})
  const [loading, setLoading] = useState(true)
  const [calendarLoading, setCalendarLoading] = useState(true)
  const [activeDraft, setActiveDraft] = useState<DraftArticle | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const fetchArticles = useCallback(() => {
    fetch(`${API_BASE}/articles`, { credentials: "include" })
      .then((r) => r.json())
      .then((data) => setArticles(data))
      .catch(() => setArticles([]))
      .finally(() => setLoading(false))
  }, [])

  const fetchCalendar = useCallback(() => {
    fetch(`${API_BASE}/calendar`, { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setCalendarData(d))
      .catch(() => setCalendarData({}))
      .finally(() => setCalendarLoading(false))
  }, [])

  useEffect(() => {
    fetchArticles()
    fetchCalendar()
  }, [fetchArticles, fetchCalendar])

  const grouped: Record<Status, Article[]> = { draft: [], scheduled: [], published: [] }
  for (const a of articles) {
    grouped[a.status]?.push(a)
  }

  function handleDragStart(event: DragStartEvent) {
    const article = event.active.data.current?.article as DraftArticle | undefined
    if (article) setActiveDraft(article)
  }

  async function handleDragEnd(event: DragEndEvent) {
    setActiveDraft(null)
    const { active, over } = event
    if (!over) return

    const slug = active.id as string
    const dateStr = over.id as string

    // Validate it looks like a date string (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return

    try {
      const res = await fetch(`${API_BASE}/articles/${slug}/schedule`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: dateStr }),
      })

      if (!res.ok) {
        const err = await res.text()
        throw new Error(err || `HTTP ${res.status}`)
      }

      setToast(`Scheduled for ${new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`)

      // Optimistic update: move article from draft to scheduled locally
      setArticles((prev) =>
        prev.map((a) =>
          a.slug === slug ? { ...a, status: "scheduled" as Status, scheduledDate: dateStr } : a
        )
      )
      setCalendarData((prev) => {
        const updated = { ...prev }
        const article = articles.find((a) => a.slug === slug)
        if (article) {
          if (!updated[dateStr]) updated[dateStr] = []
          updated[dateStr] = [...updated[dateStr], { slug, title: article.title, category: article.category, status: "scheduled" }]
        }
        return updated
      })

      // Also refresh from API after a short delay (git push takes a moment)
      setTimeout(() => { fetchArticles(); fetchCalendar() }, 2000)
    } catch (e) {
      console.error("Failed to schedule article:", e)
    }
  }

  function handleRefresh() {
    fetchArticles()
    fetchCalendar()
  }

  async function handleUnschedule(slug: string) {
    try {
      const res = await fetch(`${API_BASE}/articles/${slug}/draft`, {
        method: "POST",
        credentials: "include",
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      setToast("Reverted to draft")

      // Optimistic update
      setArticles((prev) =>
        prev.map((a) =>
          a.slug === slug ? { ...a, status: "draft" as Status, scheduledDate: "" } : a
        )
      )
      setCalendarData((prev) => {
        const updated: CalendarData = {}
        for (const [date, arts] of Object.entries(prev)) {
          const filtered = arts.filter((a) => a.slug !== slug)
          if (filtered.length > 0) updated[date] = filtered
        }
        return updated
      })

      setTimeout(() => { fetchArticles(); fetchCalendar() }, 2000)
    } catch (e) {
      console.error("Failed to unschedule:", e)
    }
  }

  if (loading) {
    return <p className="py-16 text-center text-gray-400">Loading...</p>
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Blog Admin</h1>
          <p className="mt-1 text-sm text-gray-500">
            {articles.length} articles total —{" "}
            {grouped.draft.length} drafts, {grouped.scheduled.length} scheduled, {grouped.published.length} published
          </p>
        </div>

        {/* Drafts — draggable cards */}
        <section className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <FileText className="size-4 text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900">Drafts</h2>
            <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
              {grouped.draft.length}
            </span>
          </div>

          {grouped.draft.length === 0 ? (
            <p className="py-4 text-sm text-gray-400">No draft articles.</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {grouped.draft.map((article) => (
                <DraftCard
                  key={article.slug}
                  article={{
                    slug: article.slug,
                    title: article.title,
                    category: article.category,
                    readTime: article.readTime,
                  }}
                />
              ))}
            </div>
          )}
        </section>

        {/* Calendar with drop targets */}
        <AdminCalendar
          data={calendarData}
          loading={calendarLoading}
          onRefresh={handleRefresh}
          onUnschedule={handleUnschedule}
        />

        {/* Scheduled articles */}
        <section className="mb-10">
          <div className="mb-3 flex items-center gap-2">
            <Calendar className="size-4 text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900">Scheduled</h2>
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
              {grouped.scheduled.length}
            </span>
          </div>

          {grouped.scheduled.length === 0 ? (
            <p className="py-4 text-sm text-gray-400">No scheduled articles.</p>
          ) : (
            <div className="space-y-2">
              {grouped.scheduled.map((article) => (
                <ArticleRow key={article.slug} article={article} />
              ))}
            </div>
          )}
        </section>

        {/* Published articles */}
        <section>
          <div className="mb-3 flex items-center gap-2">
            <Eye className="size-4 text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900">Published</h2>
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
              {grouped.published.length}
            </span>
          </div>

          {grouped.published.length === 0 ? (
            <p className="py-4 text-sm text-gray-400">No published articles.</p>
          ) : (
            <div className="space-y-2">
              {grouped.published.map((article) => (
                <ArticleRow key={article.slug} article={article} />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Drag overlay — follows the cursor */}
      <DragOverlay>
        {activeDraft ? <DraftCardOverlay article={activeDraft} /> : null}
      </DragOverlay>

      {/* Success toast */}
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </DndContext>
  )
}
