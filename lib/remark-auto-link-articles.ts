import type { Root, Text, Link, PhrasingContent } from "mdast"
import type { Plugin } from "unified"
import { visit } from "unist-util-visit"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

interface ArticleInfo {
  slug: string
  title: string
}

const CONTENT_DIR = path.join(process.cwd(), "content", "blog")
const MAX_LINKS_PER_ARTICLE = 5

/**
 * Load all article slugs and titles from the blog content directory.
 * Cached at module level since articles don't change during a build.
 */
let cachedArticles: ArticleInfo[] | null = null

function getAllArticles(): ArticleInfo[] {
  if (cachedArticles) return cachedArticles

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"))
  cachedArticles = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "")
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8")
    const { data } = matter(raw)
    return { slug, title: data.title as string }
  })

  // Sort by title length descending so longer titles match first
  // (prevents partial matches on shorter titles when a longer one applies)
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
 * Remark plugin that auto-links the first occurrence of other article titles
 * found in text nodes. Limits to MAX_LINKS_PER_ARTICLE per article.
 *
 * Usage: remark().use(remarkAutoLinkArticles, { currentSlug: "my-article" })
 */
const remarkAutoLinkArticles: Plugin<[{ currentSlug: string }], Root> =
  function ({ currentSlug }) {
    return (tree: Root) => {
      const articles = getAllArticles().filter((a) => a.slug !== currentSlug)

      // Track which article titles have already been linked in this document
      const linked = new Set<string>()
      let linkCount = 0

      // Build regex patterns for each article title (case-insensitive, word-boundary)
      const patterns = articles.map((article) => ({
        article,
        regex: new RegExp(
          `(?<=^|[\\s""\u201C(])${escapeRegex(article.title)}(?=[\\s""\u201D).,;:!?]|$)`,
          "i"
        ),
      }))

      visit(tree, "text", (node: Text, index, parent) => {
        if (linkCount >= MAX_LINKS_PER_ARTICLE) return
        if (!parent || index === undefined) return

        // Skip text inside links (don't nest links)
        if (parent.type === "link") return

        // Skip text inside headings (don't auto-link in headings)
        if (parent.type === "heading") return

        const originalText = node.value

        // Try each article pattern against this text node
        for (const { article, regex } of patterns) {
          if (linked.has(article.slug)) continue
          if (linkCount >= MAX_LINKS_PER_ARTICLE) break

          const match = regex.exec(originalText)
          if (!match) continue

          // Found a match — split the text node and insert a link
          const matchStart = match.index
          const matchEnd = matchStart + match[0].length
          const matchedText = originalText.slice(matchStart, matchEnd)

          const newNodes: PhrasingContent[] = []

          // Text before the match
          if (matchStart > 0) {
            newNodes.push({ type: "text", value: originalText.slice(0, matchStart) })
          }

          // The link
          const linkNode: Link = {
            type: "link",
            url: `/blog/${article.slug}`,
            children: [{ type: "text", value: matchedText }],
          }
          newNodes.push(linkNode)

          // Text after the match
          if (matchEnd < originalText.length) {
            newNodes.push({ type: "text", value: originalText.slice(matchEnd) })
          }

          // Replace the text node in the parent's children
          parent.children.splice(index, 1, ...newNodes)

          linked.add(article.slug)
          linkCount++

          // Stop processing this text node (it's been replaced)
          // The remaining text after the match may contain more titles,
          // but visit will naturally process the new nodes
          return
        }
      })
    }
  }

export default remarkAutoLinkArticles
