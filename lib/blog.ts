import { getAllSlugs, getPostMetaBySlug, type BlogPostMeta } from "./mdx"

export function getAllPosts(): BlogPostMeta[] {
  const slugs = getAllSlugs()
  const posts = slugs.map((slug) => getPostMetaBySlug(slug))

  // Sort by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
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
