"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Copy, Loader2, Linkedin, Twitter, BookOpen, MessageSquare } from "lucide-react"

const API_BASE = "/api/blog"

interface Article {
  slug: string
  title: string
  category: string
  date: string
  status: string
}

type Platform = "linkedin" | "medium" | "reddit"

const platforms: { key: Platform; label: string; icon: typeof Linkedin }[] = [
  { key: "linkedin", label: "LinkedIn", icon: Linkedin },
  { key: "medium", label: "Medium", icon: BookOpen },
  { key: "reddit", label: "Reddit", icon: MessageSquare },
]

export default function CrosspostPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [platform, setPlatform] = useState<Platform>("linkedin")
  const [loading, setLoading] = useState(false)
  const [loadingArticles, setLoadingArticles] = useState(true)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [filterCategory, setFilterCategory] = useState<string>("all")

  useEffect(() => {
    fetch(`${API_BASE}/articles?t=${Date.now()}`, { credentials: "include" })
      .then((r) => r.json())
      .then((data: Article[]) => {
        setArticles(data.filter((a) => a.status === "published").sort((a, b) => b.date.localeCompare(a.date)))
        setLoadingArticles(false)
      })
      .catch(() => setLoadingArticles(false))
  }, [])

  const categories = [...new Set(articles.map((a) => a.category))].sort()

  const filtered = filterCategory === "all" ? articles : articles.filter((a) => a.category === filterCategory)

  function toggleSelect(slug: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(slug)) {
        next.delete(slug)
      } else if (next.size < 3) {
        next.add(slug)
      }
      return next
    })
  }

  async function generate() {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch(`${API_BASE}/crosspost/generate`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slugs: [...selected], platform }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: `HTTP ${res.status}` }))
        throw new Error(err.detail || `HTTP ${res.status}`)
      }

      const data = await res.json()
      setResult(data.content)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  async function handleCopy() {
    if (!result) return
    await navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <Link
        href="/admin"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-900"
      >
        <ArrowLeft className="size-3.5" />
        Back to dashboard
      </Link>

      <h1 className="mb-2 text-2xl font-bold text-gray-900">Cross-post Generator</h1>
      <p className="mb-6 text-sm text-gray-500">
        Select 1-3 published articles to generate a standalone post for external platforms with natural backlinks.
      </p>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* Left: article selection */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Select articles ({selected.size}/3)
            </p>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="rounded-md border border-gray-300 px-2 py-1 text-xs text-gray-700"
            >
              <option value="all">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {loadingArticles ? (
            <div className="flex items-center gap-2 py-8 text-sm text-gray-400">
              <Loader2 className="size-4 animate-spin" /> Loading articles...
            </div>
          ) : (
            <div className="max-h-[500px] space-y-1 overflow-y-auto rounded-lg border border-gray-200 p-2">
              {filtered.map((a) => {
                const isSelected = selected.has(a.slug)
                return (
                  <button
                    key={a.slug}
                    onClick={() => toggleSelect(a.slug)}
                    disabled={!isSelected && selected.size >= 3}
                    className={`flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors ${
                      isSelected
                        ? "bg-blue-50 ring-1 ring-blue-300"
                        : "hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border ${
                        isSelected ? "border-blue-500 bg-blue-500 text-white" : "border-gray-300"
                      }`}
                    >
                      {isSelected && <Check className="size-3" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{a.title}</p>
                      <p className="mt-0.5 text-xs text-gray-500">
                        {a.category} &middot; {new Date(a.date).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Right: platform + generate */}
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">Platform</p>
            <div className="flex gap-1.5">
              {platforms.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setPlatform(key)}
                  className={`inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    platform === key
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Icon className="size-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generate}
            disabled={selected.size === 0 || loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                Generating...
              </span>
            ) : (
              `Generate ${platforms.find((p) => p.key === platform)?.label} post`
            )}
          </button>

          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>
          )}

          {result && (
            <div className="rounded-lg border border-gray-200 bg-white">
              <div className="flex items-center justify-between border-b border-gray-100 px-4 py-2">
                <p className="text-xs font-medium text-gray-500">Generated draft</p>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200"
                >
                  {copied ? (
                    <><Check className="size-3.5 text-green-600" /> Copied</>
                  ) : (
                    <><Copy className="size-3.5" /> Copy</>
                  )}
                </button>
              </div>
              <pre className="max-h-[400px] overflow-y-auto whitespace-pre-wrap p-4 font-sans text-sm leading-relaxed text-gray-800">
                {result}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
