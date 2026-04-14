import Image from "next/image"
import Link from "next/link"
import { Mail, Linkedin, Github } from "lucide-react"

interface AuthorBioProps {
  clusterExpertise?: string
}

export function AuthorBio({ clusterExpertise }: AuthorBioProps) {
  const bio =
    clusterExpertise ||
    "I build production AI systems: RAG pipelines, autonomous agents, privacy-preserving NLP. I write about what I ship, not what I read."

  return (
    <section
      aria-label="About the author"
      className="mx-auto my-12 flex max-w-[800px] flex-col gap-5 rounded-2xl border border-gray-100 bg-gray-50 p-6 sm:flex-row sm:items-start sm:gap-6"
    >
      <div className="shrink-0">
        <Image
          src="/images/helain-avatar-192.webp"
          alt="Hélain Zimmermann"
          width={96}
          height={96}
          className="size-24 rounded-full object-cover ring-2 ring-white"
        />
      </div>

      <div className="flex-1">
        <p className="text-base font-bold text-gray-900">Hélain Zimmermann</p>
        <p className="text-sm font-medium text-amber-600">
          Co-Founder &amp; CTO @ Ailog
        </p>
        <p className="mt-0.5 text-xs text-gray-600">
          MSc Machine Learning @ KTH · ENSIMAG · ex-INRIA researcher
        </p>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">{bio}</p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link
            href="https://www.linkedin.com/in/helain-zimmermann/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-gray-500 transition-colors hover:text-amber-600"
          >
            <Linkedin className="size-5" />
          </Link>
          <Link
            href="https://github.com/L1ZGitHub"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-gray-500 transition-colors hover:text-amber-600"
          >
            <Github className="size-5" />
          </Link>
          <Link
            href="https://scholar.google.fr/citations?hl=fr&user=MXMobs8AAAAJ"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Google Scholar"
            className="text-gray-500 transition-colors hover:text-amber-600"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="size-5 fill-current"
            >
              <path d="M5.242 13.769L0.18 9.729 12 0l11.82 9.729-5.062 4.04C17.35 10.19 13.98 7.7 12 7.7s-5.35 2.49-6.758 6.069zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
            </svg>
          </Link>
          <Link
            href="https://dev.to/helain"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="dev.to"
            className="text-gray-500 transition-colors hover:text-amber-600"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="size-5 fill-current"
            >
              <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.3.25-.3 1.88-.33l1.64-.03v1.35zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.86.04.14.23-.5.52-1.7l.46-1.92.43-1.64v-.04l.74-.03c.61-.02.73 0 .73.15 0 .12-.5 2.08-1.09 4.36-1.01 3.88-1.09 4.15-1.32 4.67z" />
            </svg>
          </Link>
          <Link
            href="https://medium.com/@helain.zimmermann"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Medium"
            className="text-gray-500 transition-colors hover:text-amber-600"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="size-5 fill-current"
            >
              <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
            </svg>
          </Link>
          <a
            href="mailto:contact@helain-zimmermann.com"
            aria-label="Email"
            className="text-gray-500 transition-colors hover:text-amber-600"
          >
            <Mail className="size-5" />
          </a>
        </div>
      </div>
    </section>
  )
}
