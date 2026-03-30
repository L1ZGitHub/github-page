"use client"

import { memo } from "react"
import { useDraggable } from "@dnd-kit/core"
import { Clock } from "lucide-react"
import Link from "next/link"
import { categoryColors } from "../lib/constants"

export interface DraftArticle {
  slug: string
  title: string
  category: string
  readTime: string
}

const DraftCard = memo(function DraftCard({ article }: { article: DraftArticle }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: article.slug,
    data: { article },
  })

  const catClass = categoryColors[article.category] || "bg-gray-100 text-gray-800"

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`w-[280px] touch-none select-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 shadow-sm transition-shadow hover:shadow-md ${
        isDragging ? "cursor-grabbing opacity-30" : "cursor-grab"
      }`}
    >
      <Link
        href={`/admin/${article.slug}`}
        className="block truncate text-sm font-medium text-gray-900 hover:text-blue-600"
        onClick={(e) => {
          if (isDragging) e.preventDefault()
        }}
      >
        {article.title}
      </Link>
      <div className="mt-1.5 flex items-center gap-2">
        <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${catClass}`}>
          {article.category}
        </span>
        <span className="flex items-center gap-0.5 text-[10px] text-gray-400">
          <Clock className="size-2.5" />
          {article.readTime}
        </span>
      </div>
    </div>
  )
})

export default DraftCard

export function DraftCardOverlay({ article }: { article: DraftArticle }) {
  const catClass = categoryColors[article.category] || "bg-gray-100 text-gray-800"

  return (
    <div className="w-[280px] rotate-2 rounded-lg border border-blue-300 bg-white px-3 py-2.5 shadow-xl">
      <p className="truncate text-sm font-medium text-gray-900">{article.title}</p>
      <div className="mt-1.5 flex items-center gap-2">
        <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${catClass}`}>
          {article.category}
        </span>
        <span className="flex items-center gap-0.5 text-[10px] text-gray-400">
          <Clock className="size-2.5" />
          {article.readTime}
        </span>
      </div>
    </div>
  )
}
