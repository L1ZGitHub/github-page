"use client"

import { useEffect, useState } from "react"
import { Mail } from "lucide-react"

const API_BASE = "/api/blog"

interface ContactEntry {
  name: string
  email: string
  subject: string
  message: string
  timestamp: string
}

export default function ContactPage() {
  const [messages, setMessages] = useState<ContactEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_BASE}/contact`, { credentials: "include", cache: "no-store" })
      .then((r) => (r.ok ? r.json() : []))
      .then((data: ContactEntry[]) => setMessages(data.reverse()))
      .catch(() => setMessages([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <div className="mb-8 flex items-center gap-2">
        <Mail className="size-5 text-gray-400" />
        <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
        <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-medium text-violet-800">
          {loading ? "…" : messages.length}
        </span>
      </div>

      {loading ? (
        <p className="py-16 text-center text-gray-400">Loading...</p>
      ) : messages.length === 0 ? (
        <p className="py-16 text-center text-gray-400">No contact messages yet.</p>
      ) : (
        <div className="space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className="rounded-lg border border-gray-100 bg-white px-5 py-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-gray-900">{msg.name}</p>
                  <a href={`mailto:${msg.email}`} className="text-sm text-blue-600 hover:underline">
                    {msg.email}
                  </a>
                </div>
                <span className="shrink-0 text-xs text-gray-400">
                  {new Date(msg.timestamp).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              {msg.subject && (
                <p className="mt-2 text-sm font-medium text-gray-800">{msg.subject}</p>
              )}
              <p className="mt-1.5 whitespace-pre-wrap text-sm text-gray-600">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
