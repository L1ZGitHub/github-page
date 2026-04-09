"use client"

import { useState } from "react"
import { Check, Copy, Linkedin, Twitter, BookOpen, MessageSquare } from "lucide-react"

interface CrosspostPreviewProps {
  title: string
  description: string
  slug: string
  tags: string[]
  excerpt: string
}

type Platform = "linkedin" | "twitter" | "medium" | "reddit"

function generateLinkedIn(title: string, description: string, url: string, tags: string[]): string {
  const hashtags = tags.slice(0, 4).map((t) => `#${t.replace(/[\s&]/g, "")}`).join(" ")
  return `${title}

${description}

${url}

${hashtags} #AI #MachineLearning`
}

function generateTwitter(title: string, url: string, tags: string[]): string {
  const hashtags = tags.slice(0, 2).map((t) => `#${t.replace(/[\s&]/g, "")}`).join(" ")
  const tweet = `${title}\n\n${url}\n\n${hashtags}`
  return tweet
}

function generateMedium(title: string, description: string, url: string, excerpt: string): string {
  return `# ${title}

${excerpt}

---

*This article was originally published on my blog. [Read the full article with code examples here](${url}).*`
}

function generateReddit(title: string, description: string, url: string, excerpt: string): string {
  return `**Title:** ${title}

${description}

${excerpt}

[Full article on my blog](${url})`
}

const platforms: { key: Platform; label: string; icon: typeof Linkedin; color: string }[] = [
  { key: "linkedin", label: "LinkedIn", icon: Linkedin, color: "bg-[#0A66C2]" },
  { key: "twitter", label: "Twitter/X", icon: Twitter, color: "bg-black" },
  { key: "medium", label: "Medium", icon: BookOpen, color: "bg-[#00AB6C]" },
  { key: "reddit", label: "Reddit", icon: MessageSquare, color: "bg-[#FF4500]" },
]

export default function CrosspostPreview({ title, description, slug, tags, excerpt }: CrosspostPreviewProps) {
  const [active, setActive] = useState<Platform>("linkedin")
  const [copied, setCopied] = useState(false)

  const url = `https://helain-zimmermann.com/blog/${slug}`

  const generators: Record<Platform, () => string> = {
    linkedin: () => generateLinkedIn(title, description, url, tags),
    twitter: () => generateTwitter(title, url, tags),
    medium: () => generateMedium(title, description, url, excerpt),
    reddit: () => generateReddit(title, description, url, excerpt),
  }

  const content = generators[active]()
  const charCount = content.length
  const limits: Record<Platform, number | null> = {
    linkedin: 3000,
    twitter: 280,
    medium: null,
    reddit: null,
  }
  const limit = limits[active]

  async function handleCopy() {
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mt-4 border-t border-gray-200 pt-4">
      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-500">
        Cross-posting
      </p>

      {/* Platform tabs */}
      <div className="mb-3 flex gap-1.5">
        {platforms.map(({ key, label, icon: Icon, color }) => (
          <button
            key={key}
            onClick={() => { setActive(key); setCopied(false) }}
            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
              active === key
                ? `${color} text-white`
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <Icon className="size-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Preview */}
      <div className="relative rounded-lg border border-gray-200 bg-white">
        <pre className="whitespace-pre-wrap p-4 text-sm text-gray-800 font-sans leading-relaxed">
          {content}
        </pre>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-100 px-4 py-2">
          <span className={`text-xs ${limit && charCount > limit ? "text-red-500 font-medium" : "text-gray-400"}`}>
            {charCount}{limit ? ` / ${limit}` : ""} chars
          </span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200"
          >
            {copied ? (
              <>
                <Check className="size-3.5 text-green-600" />
                Copied
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
