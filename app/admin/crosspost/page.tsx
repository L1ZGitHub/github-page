"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Copy, Loader2, ExternalLink } from "lucide-react"

const API_BASE = "/api/blog"

interface Crosspost {
  id: string
  platform: string
  date: string
  status: string
  content: string
  source_slugs: string[]
  source_titles: string[]
  posted_date?: string
}

const platformMeta: Record<string, { label: string; color: string; bg: string }> = {
  "dev.to": { label: "dev.to", color: "text-black", bg: "bg-gray-100" },
  reddit: { label: "Reddit", color: "text-orange-700", bg: "bg-orange-50" },
  medium: { label: "Medium", color: "text-green-700", bg: "bg-green-50" },
}

export default function CrosspostPage() {
  const [crossposts, setCrossposts] = useState<Crosspost[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${API_BASE}/crossposts?t=${Date.now()}`, { credentials: "include" })
      .then((r) => r.json())
      .then((data: Crosspost[]) => {
        setCrossposts(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  async function handleCopy(id: string, content: string) {
    await navigator.clipboard.writeText(content)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  async function toggleStatus(id: string, currentStatus: string) {
    const newStatus = currentStatus === "posted" ? "draft" : "posted"
    setUpdating(id)
    try {
      const res = await fetch(`${API_BASE}/crossposts/${id}/status`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        setCrossposts((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
        )
      }
    } finally {
      setUpdating(null)
    }
  }

  const drafts = crossposts.filter((c) => c.status === "draft")
  const posted = crossposts.filter((c) => c.status === "posted")

  return (
    <div>
      <Link
        href="/admin"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-900"
      >
        <ArrowLeft className="size-3.5" />
        Back to dashboard
      </Link>

      <h1 className="mb-2 text-2xl font-bold text-gray-900">Cross-posts</h1>
      <p className="mb-6 text-sm text-gray-500">
        Generated every Tuesday. Rotate: dev.to, Reddit, Medium. Copy the content and post it on the platform.
      </p>

      {loading ? (
        <div className="flex items-center gap-2 py-12 text-sm text-gray-400">
          <Loader2 className="size-4 animate-spin" /> Loading...
        </div>
      ) : crossposts.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 py-12 text-center text-sm text-gray-400">
          No cross-posts yet. The first one will be generated next Tuesday.
        </div>
      ) : (
        <div className="space-y-8">
          {/* Drafts */}
          {drafts.length > 0 && (
            <section>
              <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-gray-500">
                Ready to post ({drafts.length})
              </h2>
              <div className="space-y-3">
                {drafts.map((c) => (
                  <CrosspostCard
                    key={c.id}
                    crosspost={c}
                    expanded={expanded === c.id}
                    onToggle={() => setExpanded(expanded === c.id ? null : c.id)}
                    onCopy={() => handleCopy(c.id, c.content)}
                    onMarkPosted={() => toggleStatus(c.id, c.status)}
                    copied={copied === c.id}
                    updating={updating === c.id}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Posted */}
          {posted.length > 0 && (
            <section>
              <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-gray-500">
                Already posted ({posted.length})
              </h2>
              <div className="space-y-3">
                {posted.map((c) => (
                  <CrosspostCard
                    key={c.id}
                    crosspost={c}
                    expanded={expanded === c.id}
                    onToggle={() => setExpanded(expanded === c.id ? null : c.id)}
                    onCopy={() => handleCopy(c.id, c.content)}
                    onMarkPosted={() => toggleStatus(c.id, c.status)}
                    copied={copied === c.id}
                    updating={updating === c.id}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}

function CrosspostCard({
  crosspost: c,
  expanded,
  onToggle,
  onCopy,
  onMarkPosted,
  copied,
  updating,
}: {
  crosspost: Crosspost
  expanded: boolean
  onToggle: () => void
  onCopy: () => void
  onMarkPosted: () => void
  copied: boolean
  updating: boolean
}) {
  const meta = platformMeta[c.platform] ?? { label: c.platform, color: "text-gray-700", bg: "bg-gray-50" }

  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-3">
          <span className={`rounded-md px-2.5 py-1 text-xs font-medium ${meta.color} ${meta.bg}`}>
            {meta.label}
          </span>
          <span className="text-sm text-gray-900">
            {new Date(c.date).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          {c.status === "posted" && (
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
              posted
            </span>
          )}
        </div>
        <span className="text-xs text-gray-400">
          {c.source_titles.length} article{c.source_titles.length > 1 ? "s" : ""} source
        </span>
      </button>

      {expanded && (
        <div className="border-t border-gray-100">
          {/* Source articles */}
          <div className="border-b border-gray-100 px-4 py-3">
            <p className="mb-1.5 text-xs font-medium text-gray-500">Based on:</p>
            <div className="flex flex-wrap gap-2">
              {c.source_slugs.map((slug, i) => (
                <Link
                  key={slug}
                  href={`/admin/${slug}`}
                  className="inline-flex items-center gap-1 rounded-md bg-gray-50 px-2 py-1 text-xs text-blue-600 hover:bg-blue-50"
                >
                  <ExternalLink className="size-3" />
                  {c.source_titles[i] || slug}
                </Link>
              ))}
            </div>
          </div>

          {/* Content preview */}
          <pre className="max-h-[400px] overflow-y-auto whitespace-pre-wrap px-4 py-4 font-sans text-sm leading-relaxed text-gray-800">
            {c.content}
          </pre>

          {/* Actions */}
          <div className="flex items-center gap-2 border-t border-gray-100 px-4 py-3">
            <button
              onClick={onCopy}
              className="inline-flex items-center gap-1.5 rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200"
            >
              {copied ? (
                <><Check className="size-3.5 text-green-600" /> Copied</>
              ) : (
                <><Copy className="size-3.5" /> Copy</>
              )}
            </button>
            <button
              onClick={onMarkPosted}
              disabled={updating}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                c.status === "posted"
                  ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                  : "bg-green-100 text-green-700 hover:bg-green-200"
              }`}
            >
              {updating ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : c.status === "posted" ? (
                "Revert to draft"
              ) : (
                <><Check className="size-3.5" /> Mark as posted</>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
