/**
 * Category color mappings for blog badges.
 *
 * 8 categories:
 *   AI & ML        → amber
 *   AI Agents      → cyan
 *   RAG Systems    → violet
 *   AI Security    → emerald
 *   Engineering    → blue
 *   Getting Started → orange
 *   Industry       → rose
 *   Strategy       → slate
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
  "AI Agents": {
    bg: "bg-cyan-50",
    text: "text-cyan-600",
    classes: "bg-cyan-50 text-cyan-600",
  },
  "RAG Systems": {
    bg: "bg-violet-50",
    text: "text-violet-600",
    classes: "bg-violet-50 text-violet-600",
  },
  "AI Security": {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    classes: "bg-emerald-50 text-emerald-600",
  },
  Engineering: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    classes: "bg-blue-50 text-blue-600",
  },
  "Getting Started": {
    bg: "bg-orange-50",
    text: "text-orange-600",
    classes: "bg-orange-50 text-orange-600",
  },
  Industry: {
    bg: "bg-rose-50",
    text: "text-rose-600",
    classes: "bg-rose-50 text-rose-600",
  },
  Strategy: {
    bg: "bg-slate-100",
    text: "text-slate-600",
    classes: "bg-slate-100 text-slate-600",
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
    "AI Agents": { background: "#ecfeff", color: "#0891b2" },
    "RAG Systems": { background: "#f5f3ff", color: "#7c3aed" },
    "AI Security": { background: "#ecfdf5", color: "#059669" },
    Engineering: { background: "#eff6ff", color: "#2563eb" },
    "Getting Started": { background: "#fff7ed", color: "#ea580c" },
    Industry: { background: "#fff1f2", color: "#e11d48" },
    Strategy: { background: "#f8fafc", color: "#475569" },
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
