import type { Root, Text, Link, PhrasingContent } from "mdast"
import type { Plugin } from "unified"
import { visit } from "unist-util-visit"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

interface ArticleInfo {
  slug: string
  title: string
  keywords: string[]
}

interface MatchCandidate {
  start: number
  end: number
  matchedText: string
  slug: string
  priority: "exact" | "keyword"
}

const CONTENT_DIR = path.join(process.cwd(), "content", "blog")
const MAX_LINKS_PER_ARTICLE = 5

// Words too generic to be standalone keyword matches
const STOP_WORDS = new Set([
  "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for",
  "of", "with", "by", "from", "is", "are", "was", "were", "be", "been",
  "being", "have", "has", "had", "do", "does", "did", "will", "would",
  "could", "should", "may", "might", "can", "shall", "not", "no", "so",
  "if", "then", "than", "that", "this", "these", "those", "it", "its",
  "how", "what", "when", "where", "who", "why", "which", "your", "you",
  "we", "our", "my", "i", "me", "he", "she", "they", "them", "his", "her",
  "all", "each", "every", "both", "few", "more", "most", "other", "some",
  "such", "only", "own", "same", "just", "also", "very", "too", "quite",
  "getting", "started", "using", "building", "understanding", "introduction",
  "guide", "complete", "beyond", "new", "best", "practices", "top",
  "vs", "versus", "about", "into", "over", "after", "before",
])

// Single words too generic on their own (need multi-word context)
const GENERIC_SINGLE_WORDS = new Set([
  "ai", "ml", "data", "models", "model", "learning", "systems", "system",
  "agents", "agent", "python", "production", "performance", "search",
  "real", "time", "open", "source", "custom", "modern", "privacy",
  "chinese", "finance", "world", "security", "trends", "year",
  "memory", "design", "patterns", "combining", "comparing", "evaluation",
  "architectures", "architecture", "transformer",
])

/**
 * Load all article slugs, titles, and keywords from the blog content directory.
 * Cached at module level since articles don't change during a build.
 */
let cachedArticles: ArticleInfo[] | null = null

function extractKeywords(title: string): string[] {
  const keywords: string[] = []

  // Remove common filler words and split into meaningful phrases
  // Strategy: extract 2-3 word technical phrases from the title

  // First, normalize the title
  const normalized = title
    .replace(/[:\-\u2013\u2014]/g, " ")  // Replace colons, hyphens, dashes with spaces
    .replace(/\s+/g, " ")
    .trim()

  const words = normalized.split(" ")

  // Generate 2-word and 3-word sliding windows from ALL title words
  // (including stop words), then filter out phrases where ALL words are stop/generic.
  // This preserves phrases like "building RAG" where one word is a stop word.
  // Prioritize 2-word phrases over 3-word (2-word match prose better).
  for (let len = 2; len <= 3; len++) {
    for (let i = 0; i <= words.length - len; i++) {
      const phraseWords = words.slice(i, i + len)
      // Filter out phrases where ALL words are stop words or generic
      const allTrivial = phraseWords.every(
        (w) => STOP_WORDS.has(w.toLowerCase()) || GENERIC_SINGLE_WORDS.has(w.toLowerCase())
      )
      if (allTrivial) continue
      const phrase = phraseWords.join(" ")
      // Only include phrases with at least 6 characters total
      if (phrase.length >= 6) {
        keywords.push(phrase.toLowerCase())
      }
    }
  }

  // Add distinctive single words (technical terms that are unique enough)
  // Also allow ALL-CAPS acronyms of 3+ chars (like RAG, NLP, LLM)
  const significantWords = words.filter(
    (w) => !STOP_WORDS.has(w.toLowerCase())
  )
  for (const word of significantWords) {
    const lower = word.toLowerCase()
    if (
      !GENERIC_SINGLE_WORDS.has(lower) &&
      ((lower.length >= 7) || (word === word.toUpperCase() && word.length >= 3))
    ) {
      keywords.push(lower)
    }
  }

  // Deduplicate and limit to 5 keywords
  const unique = [...new Set(keywords)]
  return unique.slice(0, 5)
}

function getAllArticles(): ArticleInfo[] {
  if (cachedArticles) return cachedArticles

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"))
  cachedArticles = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "")
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8")
    const { data } = matter(raw)
    const title = data.title as string
    const keywords = extractKeywords(title)
    return { slug, title, keywords }
  })

  // Sort by title length descending so longer titles match first
  cachedArticles.sort((a, b) => b.title.length - a.title.length)

  return cachedArticles
}

/**
 * Escape special regex characters in a string.
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

/**
 * Build a boundary-aware pattern for matching text in prose.
 */
function buildMatchRegex(text: string): RegExp {
  return new RegExp(
    `(?<=^|[\\s""\u201C(])${escapeRegex(text)}(?=[\\s""\u201D).,;:!?]|$)`,
    "gi"
  )
}

/**
 * Find all non-overlapping matches in a text string.
 * Returns matches sorted by position. Exact title matches have higher priority.
 */
function findAllMatches(
  text: string,
  patterns: { slug: string; regex: RegExp; priority: "exact" | "keyword" }[],
  linked: Set<string>,
  linkCount: number,
  maxLinks: number
): MatchCandidate[] {
  const allMatches: MatchCandidate[] = []

  for (const { slug, regex, priority } of patterns) {
    if (linked.has(slug)) continue

    // Reset regex state
    regex.lastIndex = 0
    let match: RegExpExecArray | null
    while ((match = regex.exec(text)) !== null) {
      allMatches.push({
        start: match.index,
        end: match.index + match[0].length,
        matchedText: match[0],
        slug,
        priority,
      })
    }
  }

  // Sort: exact matches first, then by position
  allMatches.sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority === "exact" ? -1 : 1
    }
    return a.start - b.start
  })

  // Select non-overlapping matches, respecting the link limit
  // Process in priority order, only keep first match per slug
  const selectedBySlug = new Map<string, MatchCandidate>()
  for (const m of allMatches) {
    if (!selectedBySlug.has(m.slug)) {
      selectedBySlug.set(m.slug, m)
    }
  }

  // Now collect and sort by position
  const candidates = [...selectedBySlug.values()].sort(
    (a, b) => a.start - b.start
  )

  // Filter out overlapping matches (keep earlier / higher-priority ones)
  const result: MatchCandidate[] = []
  let usedCount = linkCount

  for (const candidate of candidates) {
    if (usedCount >= maxLinks) break
    if (linked.has(candidate.slug)) continue

    // Check for overlap with already selected matches
    const overlaps = result.some(
      (r) => candidate.start < r.end && candidate.end > r.start
    )
    if (overlaps) continue

    result.push(candidate)
    usedCount++
  }

  // Return sorted by position for correct splicing
  return result.sort((a, b) => a.start - b.start)
}

/**
 * Remark plugin that auto-links the first occurrence of other article titles
 * and keyword phrases found in text nodes. Limits to MAX_LINKS_PER_ARTICLE per article.
 *
 * Features:
 * - Exact title matching (high priority)
 * - Keyword phrase matching (lower priority)
 * - Collects all matches in a text node before splicing (no splice-during-visit bug)
 * - Max 5 links per article
 *
 * Usage: remark().use(remarkAutoLinkArticles, { currentSlug: "my-article" })
 */
const remarkAutoLinkArticles: Plugin<[{ currentSlug: string }], Root> =
  function ({ currentSlug }) {
    return (tree: Root) => {
      const articles = getAllArticles().filter((a) => a.slug !== currentSlug)

      // Track which article slugs have already been linked in this document
      const linked = new Set<string>()
      let linkCount = 0

      // Build regex patterns for exact title matches
      const exactPatterns = articles.map((article) => ({
        slug: article.slug,
        regex: buildMatchRegex(article.title),
        priority: "exact" as const,
      }))

      // Build regex patterns for keyword matches
      const keywordPatterns: {
        slug: string
        regex: RegExp
        priority: "keyword"
      }[] = []
      for (const article of articles) {
        for (const keyword of article.keywords) {
          keywordPatterns.push({
            slug: article.slug,
            regex: buildMatchRegex(keyword),
            priority: "keyword" as const,
          })
        }
      }

      // Combine all patterns (exact first, then keywords)
      const allPatterns = [...exactPatterns, ...keywordPatterns]

      visit(tree, "text", (node: Text, index, parent) => {
        if (linkCount >= MAX_LINKS_PER_ARTICLE) return
        if (!parent || index === undefined) return

        // Skip text inside links (don't nest links)
        if (parent.type === "link") return

        // Skip text inside headings (don't auto-link in headings)
        if (parent.type === "heading") return

        const text = node.value

        // Find all matches in this text node at once
        const matches = findAllMatches(
          text,
          allPatterns,
          linked,
          linkCount,
          MAX_LINKS_PER_ARTICLE
        )

        if (matches.length === 0) return

        // Build the replacement nodes by splitting the text at all match positions
        const newNodes: PhrasingContent[] = []
        let cursor = 0

        for (const match of matches) {
          // Text before the match
          if (match.start > cursor) {
            newNodes.push({
              type: "text",
              value: text.slice(cursor, match.start),
            })
          }

          // The link node
          const linkNode: Link = {
            type: "link",
            url: `/blog/${match.slug}`,
            children: [{ type: "text", value: match.matchedText }],
          }
          newNodes.push(linkNode)

          linked.add(match.slug)
          linkCount++

          cursor = match.end
        }

        // Text after the last match
        if (cursor < text.length) {
          newNodes.push({ type: "text", value: text.slice(cursor) })
        }

        // Replace the original text node with all the new nodes at once
        parent.children.splice(index, 1, ...newNodes)
      })
    }
  }

export default remarkAutoLinkArticles
