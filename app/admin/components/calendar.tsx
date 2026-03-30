"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"

const API_BASE = "/api/blog"

interface CalendarArticle {
  slug: string
  title: string
  category: string
  status: "draft" | "scheduled" | "published"
}

type CalendarData = Record<string, CalendarArticle[]>

const statusDot: Record<string, string> = {
  draft: "bg-yellow-400",
  scheduled: "bg-blue-500",
  published: "bg-green-500",
}

const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

function getMonthGrid(year: number, month: number): (number | null)[][] {
  const firstDay = new Date(year, month, 1)
  // Monday = 0, Sunday = 6
  const startWeekday = (firstDay.getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells: (number | null)[] = []
  for (let i = 0; i < startWeekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  const weeks: (number | null)[][] = []
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7))
  }
  return weeks
}

function dateKey(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}

export default function AdminCalendar() {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [data, setData] = useState<CalendarData>({})
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_BASE}/calendar`, { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => setData({}))
      .finally(() => setLoading(false))
  }, [])

  function prev() {
    if (month === 0) {
      setMonth(11)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
    setSelectedDay(null)
  }

  function next() {
    if (month === 11) {
      setMonth(0)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
    setSelectedDay(null)
  }

  const weeks = getMonthGrid(year, month)
  const monthLabel = new Date(year, month).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  })

  const todayKey = dateKey(today.getFullYear(), today.getMonth(), today.getDate())
  const selectedArticles = selectedDay ? data[selectedDay] ?? [] : []

  return (
    <div className="mb-8 rounded-xl border border-gray-200 bg-gray-50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="size-4 text-gray-400" />
          <h2 className="text-sm font-semibold text-gray-900">Calendar</h2>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={prev}
            className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700"
          >
            <ChevronLeft className="size-4" />
          </button>
          <span className="min-w-[140px] text-center text-sm font-medium text-gray-700">
            {monthLabel}
          </span>
          <button
            onClick={next}
            className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      {loading ? (
        <p className="py-6 text-center text-sm text-gray-400">Loading calendar...</p>
      ) : (
        <>
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-px text-center">
            {DAY_NAMES.map((d) => (
              <div key={d} className="py-1 text-xs font-medium text-gray-400">
                {d}
              </div>
            ))}
          </div>

          {/* Weeks */}
          <div className="grid grid-cols-7 gap-px">
            {weeks.map((week, wi) =>
              week.map((day, di) => {
                if (day === null) {
                  return <div key={`${wi}-${di}`} className="h-9" />
                }

                const key = dateKey(year, month, day)
                const articles = data[key] ?? []
                const isToday = key === todayKey
                const isSelected = key === selectedDay

                return (
                  <button
                    key={key}
                    onClick={() => setSelectedDay(isSelected ? null : key)}
                    className={`relative flex h-9 flex-col items-center justify-center rounded text-sm transition-colors ${
                      isSelected
                        ? "bg-gray-200 font-semibold text-gray-900"
                        : isToday
                          ? "font-semibold text-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className="font-mono text-xs">{day}</span>
                    {articles.length > 0 && (
                      <div className="flex gap-0.5">
                        {articles.slice(0, 3).map((a, i) => (
                          <span
                            key={i}
                            className={`size-1.5 rounded-full ${statusDot[a.status]}`}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                )
              }),
            )}
          </div>

          {/* Selected day details */}
          {selectedDay && (
            <div className="mt-3 border-t border-gray-200 pt-3">
              <p className="mb-2 text-xs font-medium text-gray-500">
                {new Date(selectedDay + "T00:00:00").toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              {selectedArticles.length === 0 ? (
                <p className="text-xs text-gray-400">No articles on this day.</p>
              ) : (
                <ul className="space-y-1">
                  {selectedArticles.map((a) => (
                    <li key={a.slug}>
                      <Link
                        href={`/admin/${a.slug}`}
                        className="flex items-center gap-2 rounded px-2 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-100"
                      >
                        <span className={`size-2 shrink-0 rounded-full ${statusDot[a.status]}`} />
                        <span className="truncate">{a.title}</span>
                        <span className="ml-auto shrink-0 text-xs text-gray-400">{a.category}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Legend */}
          <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-green-500" /> Published
            </span>
            <span className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-blue-500" /> Scheduled
            </span>
            <span className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-yellow-400" /> Draft
            </span>
          </div>
        </>
      )}
    </div>
  )
}
