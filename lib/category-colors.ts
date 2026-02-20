/**
 * Category color mappings matching the old site exactly.
 *
 * Old-site CSS classes:
 *   .category-ai-ml      { background: var(--amber-50);   color: var(--amber-600); }
 *   .category-rag        { background: var(--violet-50);  color: var(--violet-600); }
 *   .category-nlp-privacy{ background: var(--emerald-50); color: var(--emerald-600); }
 *   .category-engineering { background: var(--blue-50);   color: var(--blue-600); }
 *   .category-tutorials  { background: var(--amber-100);  color: var(--amber-600); }
 */

export interface CategoryColors {
  bg: string
  text: string
  /** Tailwind classes for the category badge */
  classes: string
}

const categoryColorMap: Record<string, CategoryColors> = {
  "AI & ML": {
    bg: "bg-amber-50",
    text: "text-amber-600",
    classes: "bg-amber-50 text-amber-600",
  },
  "RAG Systems": {
    bg: "bg-violet-50",
    text: "text-violet-600",
    classes: "bg-violet-50 text-violet-600",
  },
  "NLP & Privacy": {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    classes: "bg-emerald-50 text-emerald-600",
  },
  Engineering: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    classes: "bg-blue-50 text-blue-600",
  },
  Tutorials: {
    bg: "bg-amber-100",
    text: "text-amber-600",
    classes: "bg-amber-100 text-amber-600",
  },
}

/** Default fallback colors (amber, same as AI & ML) */
const defaultColors: CategoryColors = {
  bg: "bg-amber-50",
  text: "text-amber-600",
  classes: "bg-amber-50 text-amber-600",
}

/**
 * Get the Tailwind color classes for a category badge.
 */
export function getCategoryColors(category: string): CategoryColors {
  return categoryColorMap[category] || defaultColors
}

/**
 * Get CSS-variable-based inline style for a category badge,
 * matching the old site's style attribute approach.
 */
export function getCategoryStyle(category: string): React.CSSProperties {
  const map: Record<string, React.CSSProperties> = {
    "AI & ML": { background: "#fffbeb", color: "#d97706" },
    "RAG Systems": { background: "#f5f3ff", color: "#7c3aed" },
    "NLP & Privacy": { background: "#ecfdf5", color: "#059669" },
    Engineering: { background: "#eff6ff", color: "#2563eb" },
    Tutorials: { background: "#fef3c7", color: "#d97706" },
  }
  return map[category] || { background: "#fffbeb", color: "#d97706" }
}

/**
 * Difficulty badge colors matching the old site exactly.
 *
 * Old-site CSS:
 *   .difficulty-beginner      { background: var(--emerald-50); color: var(--emerald-600); }
 *   .difficulty-intermediate   { background: var(--amber-50);   color: var(--amber-600); }
 *   .difficulty-advanced       { background: #fef2f2;          color: #dc2626; }
 */
export interface DifficultyColors {
  /** Tailwind classes */
  classes: string
  /** Inline CSS style */
  style: React.CSSProperties
}

const difficultyColorMap: Record<string, DifficultyColors> = {
  beginner: {
    classes: "bg-emerald-50 text-emerald-600",
    style: { background: "#ecfdf5", color: "#059669" },
  },
  intermediate: {
    classes: "bg-amber-50 text-amber-600",
    style: { background: "#fffbeb", color: "#d97706" },
  },
  advanced: {
    classes: "bg-red-50 text-red-600",
    style: { background: "#fef2f2", color: "#dc2626" },
  },
}

const defaultDifficulty: DifficultyColors = {
  classes: "bg-amber-50 text-amber-600",
  style: { background: "#fffbeb", color: "#d97706" },
}

/** Get Tailwind classes for a difficulty badge. */
export function getDifficultyColors(difficulty: string): DifficultyColors {
  return difficultyColorMap[difficulty?.toLowerCase()] || defaultDifficulty
}

/** Get inline CSS style for a difficulty badge (article page). */
export function getDifficultyStyle(difficulty: string): React.CSSProperties {
  return (difficultyColorMap[difficulty?.toLowerCase()] || defaultDifficulty).style
}
