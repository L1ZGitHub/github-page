import { getAllPosts } from "@/lib/blog"

export async function GET() {
  const posts = getAllPosts()
  const baseUrl = "https://helain-zimmermann.com"

  // Group posts by category. Order: descending by post count (largest category first),
  // ties broken alphabetically. Categories are derived from data so new ones self-register.
  const grouped = new Map<string, typeof posts>()
  for (const post of posts) {
    const list = grouped.get(post.category) ?? []
    list.push(post)
    grouped.set(post.category, list)
  }

  const orderedCategories = Array.from(grouped.entries())
    .sort((a, b) => {
      if (b[1].length !== a[1].length) return b[1].length - a[1].length
      return a[0].localeCompare(b[0])
    })
    .map(([category]) => category)

  const sections = orderedCategories
    .map((category) => {
      const items = grouped
        .get(category)!
        .slice()
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map(
          (post) =>
            `- [${post.title}](${baseUrl}/blog/${post.slug}): ${post.description}`
        )
        .join("\n")
      return `### ${category}\n\n${items}`
    })
    .join("\n\n")

  const body = `# Helain Zimmermann - AI & ML Engineering Blog

> Technical blog about AI, automation, RAG systems, NLP, privacy-preserving AI, and applied mathematics by Helain Zimmermann, Co-Founder & CTO at Ailog.

## About the Author
Helain Zimmermann is an AI Engineer and Co-Founder & CTO at Ailog, specializing in RAG systems, privacy-preserving NLP, and machine learning. Alumni of ENSIMAG and KTH Royal Institute of Technology.

## Blog Articles

${sections}

## Contact
- Website: https://helain-zimmermann.com
- LinkedIn: https://www.linkedin.com/in/helain-zimmermann/
- GitHub: https://github.com/L1ZGitHub
`

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
