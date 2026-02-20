import Link from "next/link"
import { Linkedin, Github, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 px-6 py-12 text-gray-400">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 md:flex-row md:justify-between">
        <span className="font-semibold text-white">Hélain Zimmermann</span>

        <div className="flex items-center gap-6">
          <Link
            href="https://www.linkedin.com/in/helain-zimmermann/"
            target="_blank"
            className="hover:text-white transition-colors"
          >
            <Linkedin className="size-5" />
          </Link>
          <Link
            href="https://github.com/L1ZGitHub"
            target="_blank"
            className="hover:text-white transition-colors"
          >
            <Github className="size-5" />
          </Link>
          <Link
            href="mailto:helain.login@protonmail.com"
            className="hover:text-white transition-colors"
          >
            <Mail className="size-5" />
          </Link>
        </div>

        <p className="text-sm">© 2025-2026 Hélain Zimmermann. All rights reserved.</p>
      </div>
    </footer>
  )
}
