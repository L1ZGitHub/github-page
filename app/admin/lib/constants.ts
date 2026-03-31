export const categoryColors: Record<string, string> = {
  "AI & ML": "bg-amber-100 text-amber-800",
  "AI Agents": "bg-cyan-100 text-cyan-800",
  "RAG Systems": "bg-violet-100 text-violet-800",
  "AI Security": "bg-emerald-100 text-emerald-800",
  "Engineering": "bg-blue-100 text-blue-800",
  "Getting Started": "bg-orange-100 text-orange-800",
  "Industry": "bg-rose-100 text-rose-800",
  "Strategy": "bg-slate-200 text-slate-800",
}

export const statusConfig = {
  draft: { label: "Draft", classes: "bg-yellow-100 text-yellow-800" },
  scheduled: { label: "Scheduled", classes: "bg-blue-100 text-blue-800" },
  published: { label: "Published", classes: "bg-green-100 text-green-800" },
} as const
