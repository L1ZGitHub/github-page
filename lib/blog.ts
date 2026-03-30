import { getAllSlugs, getPostMetaBySlug, type BlogPostMeta, type ArticleStatus } from "./mdx"

/** All posts with status "published" — used by public pages, sitemap, RSS */
export function getAllPosts(): BlogPostMeta[] {
  return getAllPostsUnfiltered().filter((p) => p.status === "published")
}

/** All posts regardless of status — used by admin dashboard */
export function getAllPostsUnfiltered(): BlogPostMeta[] {
  const slugs = getAllSlugs()
  const posts = slugs.map((slug) => getPostMetaBySlug(slug))
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/** Posts filtered by status */
export function getPostsByStatus(status: ArticleStatus): BlogPostMeta[] {
  return getAllPostsUnfiltered().filter((p) => p.status === status)
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
  return getAllPosts().filter((post) => post.category === category)
}

export function getPostsByTag(tag: string): BlogPostMeta[] {
  return getAllPosts().filter((post) => post.tags.includes(tag))
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPostMeta[] {
  const allPosts = getAllPosts()
  const currentPost = allPosts.find((p) => p.slug === currentSlug)
  if (!currentPost) return []

  // Score based on shared tags and same category
  const scored = allPosts
    .filter((p) => p.slug !== currentSlug)
    .map((post) => {
      let score = 0
      // Shared tags
      const sharedTags = post.tags.filter((tag) => currentPost.tags.includes(tag))
      score += sharedTags.length * 2
      // Same category
      if (post.category === currentPost.category) score += 3

      return { post, score }
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, limit).map((item) => item.post)
}

export function getAllCategories(): string[] {
  const posts = getAllPosts()
  const categories = new Set(posts.map((p) => p.category))
  return Array.from(categories).sort()
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tags = new Set(posts.flatMap((p) => p.tags))
  return Array.from(tags).sort()
}
