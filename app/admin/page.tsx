"use client"

import { memo, useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { FileText, Calendar, Eye, Clock, Check, AlertCircle, Loader2 } from "lucide-react"
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core"
import AdminCalendar, { type CalendarData } from "./components/calendar"
import DraftCard, { DraftCardOverlay, type DraftArticle } from "./components/draft-card"
import { categoryColors, statusConfig } from "./lib/constants"

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

const ArticleRow = memo(function ArticleRow({ article }: { article: Article }) {
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
})

interface ToastData {
  message: string
  type: "success" | "error"
}

function Toast({ toast, onDone }: { toast: ToastData; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2500)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white shadow-lg ${
        toast.type === "error" ? "bg-red-600" : "bg-green-600"
      }`}
    >
      {toast.type === "error" ? <AlertCircle className="size-4" /> : <Check className="size-4" />}
      {toast.message}
    </div>
  )
}

export default function AdminDashboard() {
  const [articles, setArticles] = useState<Article[]>([])
  const [calendarData, setCalendarData] = useState<CalendarData>({})
  const [loading, setLoading] = useState(true)
  const [calendarLoading, setCalendarLoading] = useState(true)
  const [activeDraft, setActiveDraft] = useState<DraftArticle | null>(null)
  const [toast, setToast] = useState<ToastData | null>(null)
  const [busy, setBusy] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { distance: 8 } }),
  )

  const refreshAll = useCallback(async () => {
    try {
      const t = Date.now()
      const [artRes, calRes] = await Promise.all([
        fetch(`${API_BASE}/articles?t=${t}`, { credentials: "include", cache: "no-store" }),
        fetch(`${API_BASE}/calendar?t=${t}`, { credentials: "include", cache: "no-store" }),
      ])
      if (artRes.ok) setArticles(await artRes.json())
      if (calRes.ok) setCalendarData(await calRes.json())
    } catch (e) {
      console.error("[admin] refresh failed:", e)
    } finally {
      setLoading(false)
      setCalendarLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshAll()
  }, [refreshAll])

  const categories = useMemo(() => {
    const cats = new Set(articles.map((a) => a.category))
    return ["All", ...Array.from(cats).sort()]
  }, [articles])

  const grouped = useMemo(() => {
    const filtered = activeCategory === "All"
      ? articles
      : articles.filter((a) => a.category === activeCategory)
    const g: Record<Status, Article[]> = { draft: [], scheduled: [], published: [] }
    for (const a of filtered) {
      g[a.status]?.push(a)
    }
    return g
  }, [articles, activeCategory])

  const draftCards = useMemo(
    () =>
      grouped.draft.map((article) => ({
        slug: article.slug,
        title: article.title,
        category: article.category,
        readTime: article.readTime,
      })),
    [grouped.draft],
  )

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const article = event.active.data.current?.article as DraftArticle | undefined
    if (article) setActiveDraft(article)
  }, [])

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      setActiveDraft(null)
      if (busy) return

      const { active, over } = event
      if (!over) return

      const slug = active.id as string
      const dateStr = over.id as string

      if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return

      // Optimistic update
      const prevArticles = articles
      const prevCalendar = calendarData
      const article = articles.find((a) => a.slug === slug)

      if (article) {
        setArticles((prev) =>
          prev.map((a) =>
            a.slug === slug ? { ...a, status: "scheduled" as const, scheduledDate: dateStr } : a,
          ),
        )
        setCalendarData((prev) => ({
          ...prev,
          [dateStr]: [
            ...(prev[dateStr] ?? []),
            { slug: article.slug, title: article.title, category: article.category, status: "scheduled" as const },
          ],
        }))
      }

      setBusy(true)
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

        setToast({ message: `Scheduled for ${new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`, type: "success" })
      } catch (e) {
        setArticles(prevArticles)
        setCalendarData(prevCalendar)
        setToast({ message: "Failed to schedule: " + (e instanceof Error ? e.message : "Unknown error"), type: "error" })
      } finally {
        setBusy(false)
      }
    },
    [articles, calendarData, busy],
  )

  const handleUnschedule = useCallback(
    async (slug: string) => {
      const prevArticles = articles
      const prevCalendar = calendarData
      const article = articles.find((a) => a.slug === slug)

      if (article) {
        setArticles((prev) =>
          prev.map((a) =>
            a.slug === slug ? { ...a, status: "draft" as const, scheduledDate: "" } : a,
          ),
        )
        if (article.scheduledDate) {
          setCalendarData((prev) => {
            const updated = { ...prev }
            const dayArticles = updated[article.scheduledDate]
            if (dayArticles) {
              updated[article.scheduledDate] = dayArticles.filter((a) => a.slug !== slug)
            }
            return updated
          })
        }
      }

      setBusy(true)
      try {
        const res = await fetch(`${API_BASE}/articles/${slug}/draft`, {
          method: "POST",
          credentials: "include",
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)

        setToast({ message: "Reverted to draft", type: "success" })
      } catch (e) {
        setArticles(prevArticles)
        setCalendarData(prevCalendar)
        setToast({ message: "Failed to unschedule: " + (e instanceof Error ? e.message : "Unknown error"), type: "error" })
      } finally {
        setBusy(false)
      }
    },
    [articles, calendarData],
  )

  const clearToast = useCallback(() => setToast(null), [])

  if (loading) {
    return <p className="py-16 text-center text-gray-400">Loading...</p>
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="relative">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Blog Admin</h1>
          {busy && (
            <span className="ml-2 inline-flex items-center gap-1.5 text-xs text-gray-400">
              <Loader2 className="size-3 animate-spin" />
              Saving...
            </span>
          )}
          <p className="mt-1 text-sm text-gray-500">
            {articles.length} articles total —{" "}
            {grouped.draft.length} drafts, {grouped.scheduled.length} scheduled, {grouped.published.length} published
          </p>
        </div>

        {/* Category filter pills */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = cat === activeCategory
            const colorClass =
              cat === "All"
                ? isActive
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                : isActive
                  ? (categoryColors[cat] || "bg-gray-100 text-gray-800") + " ring-2 ring-offset-1 ring-gray-400"
                  : (categoryColors[cat] || "bg-gray-100 text-gray-800") + " opacity-60 hover:opacity-100"
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${colorClass}`}
              >
                {cat}
              </button>
            )
          })}
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
              {draftCards.map((article) => (
                <DraftCard key={article.slug} article={article} />
              ))}
            </div>
          )}
        </section>

        {/* Calendar with drop targets */}
        <AdminCalendar
          data={calendarData}
          loading={calendarLoading}
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
      <DragOverlay dropAnimation={null} style={{ pointerEvents: "none", zIndex: 1000 }}>
        {activeDraft ? <DraftCardOverlay article={activeDraft} /> : null}
      </DragOverlay>

      {/* Toast notification */}
      {toast && <Toast toast={toast} onDone={clearToast} />}
    </DndContext>
  )
}
