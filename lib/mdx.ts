import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

const CONTENT_DIR = path.join(process.cwd(), "content", "blog")

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  category: string
  tags: string[]
  difficulty: string
  readTime: string
  author: string
  content: string // HTML string
}

export interface BlogPostMeta {
  slug: string
  title: string
  description: string
  date: string
  category: string
  tags: string[]
  difficulty: string
  readTime: string
  author: string
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
  const fileContents = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(fileContents)

  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    category: data.category,
    tags: data.tags || [],
    difficulty: data.difficulty,
    readTime: data.readTime,
    author: data.author,
    content: contentHtml,
  }
}

export function getPostMetaBySlug(slug: string): BlogPostMeta {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
  const fileContents = fs.readFileSync(filePath, "utf-8")
  const { data } = matter(fileContents)

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    category: data.category,
    tags: data.tags || [],
    difficulty: data.difficulty,
    readTime: data.readTime,
    author: data.author,
  }
}

export function getAllSlugs(): string[] {
  const files = fs.readdirSync(CONTENT_DIR)
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
}
