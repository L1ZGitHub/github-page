"use client"

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

export default function DraftCard({ article }: { article: DraftArticle }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: article.slug,
    data: { article },
  })

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined

  const catClass = categoryColors[article.category] || "bg-gray-100 text-gray-800"

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`w-[280px] cursor-grab select-none rounded-lg border border-gray-200 bg-white px-3 py-2.5 shadow-sm transition-shadow hover:shadow-md active:cursor-grabbing ${
        isDragging ? "opacity-40 shadow-lg" : ""
      }`}
    >
      <Link
        href={`/admin/${article.slug}`}
        className="block truncate text-sm font-medium text-gray-900 hover:text-blue-600"
        onClick={(e) => {
          // Prevent navigation when dragging
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
}

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
