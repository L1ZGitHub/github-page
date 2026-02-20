"use client"

import { useEffect, useRef, type ReactNode } from "react"

/**
 * Wrapper that observes `.article-card-animated` children and adds
 * the `.visible` class when they scroll into view (staggered fade-in).
 *
 * Used on the article page for Related Articles cards. The blog listing
 * page has its own observer in blog-content.tsx.
 */
export function AnimatedCards({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: "0px", threshold: 0.1 }
    )

    const cards = ref.current.querySelectorAll(".article-card-animated")
    cards.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return <div ref={ref}>{children}</div>
}
