"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, Check, Clock, FileText } from "lucide-react"
import type { ArticleStatus } from "@/lib/mdx"

const API_BASE = "/api/blog"

interface ArticleActionsProps {
  slug: string
  status: ArticleStatus
  scheduledDate?: string
}

export default function ArticleActions({ slug, status, scheduledDate }: ArticleActionsProps) {
  const router = useRouter()
  const [date, setDate] = useState(scheduledDate ?? "")
  const [loading, setLoading] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  async function doAction(action: "schedule" | "publish" | "draft") {
    setLoading(action)
    setMessage(null)

    try {
      const url = `${API_BASE}/articles/${slug}/${action}`
      const body = action === "schedule" ? JSON.stringify({ date }) : undefined

      const res = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: body ? { "Content-Type": "application/json" } : {},
        body,
      })

      if (!res.ok) {
        const err = await res.text()
        throw new Error(err || `HTTP ${res.status}`)
      }

      setMessage({ type: "success", text: `Article ${action === "schedule" ? "scheduled" : action === "publish" ? "published" : "reverted to draft"} successfully.` })
      router.refresh()
    } catch (e) {
      setMessage({ type: "error", text: e instanceof Error ? e.message : "Unknown error" })
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="mt-4 border-t border-gray-200 pt-4">
      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-500">Actions</p>

      <div className="flex flex-wrap items-end gap-3">
        {/* Schedule — shown for draft and scheduled */}
        {(status === "draft" || status === "scheduled") && (
          <div className="flex items-end gap-2">
            <div>
              <label htmlFor="schedule-date" className="mb-1 block text-xs text-gray-500">
                Schedule date
              </label>
              <input
                id="schedule-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="rounded-md border border-gray-300 px-2.5 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => doAction("schedule")}
              disabled={!date || loading !== null}
              className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Calendar className="size-3.5" />
              {loading === "schedule" ? "Scheduling..." : "Schedule"}
            </button>
          </div>
        )}

        {/* Publish Now — shown for draft and scheduled */}
        {(status === "draft" || status === "scheduled") && (
          <button
            onClick={() => doAction("publish")}
            disabled={loading !== null}
            className="inline-flex items-center gap-1.5 rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Check className="size-3.5" />
            {loading === "publish" ? "Publishing..." : "Publish Now"}
          </button>
        )}

        {/* Revert to Draft — shown for scheduled and published */}
        {(status === "scheduled" || status === "published") && (
          <button
            onClick={() => doAction("draft")}
            disabled={loading !== null}
            className="inline-flex items-center gap-1.5 rounded-md bg-yellow-500 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-yellow-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FileText className="size-3.5" />
            {loading === "draft" ? "Reverting..." : "Revert to Draft"}
          </button>
        )}
      </div>

      {/* Current schedule indicator */}
      {status === "scheduled" && scheduledDate && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-blue-600">
          <Clock className="size-3" />
          Currently scheduled for{" "}
          {new Date(scheduledDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      )}

      {/* Feedback message */}
      {message && (
        <p
          className={`mt-3 rounded-md px-3 py-2 text-sm ${
            message.type === "success"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  )
}
