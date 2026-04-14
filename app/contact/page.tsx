import { Metadata } from "next"
import Link from "next/link"
import { Linkedin, Github, Mail, BookOpen, PenLine, GraduationCap } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Hélain Zimmermann — email, professional inquiries, press, social profiles.",
  alternates: {
    canonical: "https://helain-zimmermann.com/contact",
  },
}

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/helain-zimmermann/",
    icon: Linkedin,
    handle: "helain-zimmermann",
  },
  {
    label: "GitHub",
    href: "https://github.com/L1ZGitHub",
    icon: Github,
    handle: "L1ZGitHub",
  },
  {
    label: "dev.to",
    href: "https://dev.to/helain",
    icon: PenLine,
    handle: "@helain",
  },
  {
    label: "Medium",
    href: "https://medium.com/@helain.zimmermann",
    icon: BookOpen,
    handle: "@helain.zimmermann",
  },
  {
    label: "Google Scholar",
    href: "https://scholar.google.fr/citations?hl=fr&user=MXMobs8AAAAJ",
    icon: GraduationCap,
    handle: "Hélain Zimmermann",
  },
]

export default function ContactPage() {
  return (
    <div
      className="relative"
      style={{
        background:
          "linear-gradient(to bottom right, #f8fafc, white 40%, rgba(255,251,235,0.3) 60%, white 75%, #f8fafc)",
      }}
    >
      <div className="pointer-events-none absolute top-[10%] left-[20%] h-96 w-96 rounded-full bg-amber-100/30 blur-[64px]" />
      <div className="pointer-events-none absolute top-[25%] right-[20%] h-80 w-80 rounded-full bg-violet-100/30 blur-[64px]" />

      <section className="relative pt-32 pb-12 text-center">
        <div className="relative mx-auto max-w-3xl px-6">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-[3.5rem] leading-tight">
            Contact
          </h1>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-gray-600">
            The fastest way to reach me is email. I read everything, I reply
            to most things within a few days.
          </p>
        </div>
      </section>

      <section className="relative px-6 pb-24">
        <div className="relative mx-auto max-w-3xl space-y-12 text-gray-800">
          <div>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              Email
            </h2>
            <a
              href="mailto:contact@helain-zimmermann.com"
              className="inline-flex items-center gap-3 rounded-xl border border-amber-200 bg-white/70 px-5 py-4 text-lg font-medium text-amber-800 shadow-sm transition-colors hover:bg-amber-50 md:text-xl"
            >
              <Mail className="size-5" />
              contact@helain-zimmermann.com
            </a>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              Elsewhere
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white/70 px-4 py-3 transition-colors hover:border-amber-200 hover:bg-amber-50"
                  >
                    <s.icon className="size-5 text-gray-700" />
                    <span className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">
                        {s.label}
                      </span>
                      <span className="text-xs text-gray-500">
                        {s.handle}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">
              Professional inquiries
            </h2>
            <p className="leading-relaxed">
              I&apos;m available for consulting through Ailog on AI
              engineering, RAG systems, and privacy-preserving NLP. For press
              or speaking opportunities, email with context: topic, format,
              timeline.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold text-gray-900">
              About the blog
            </h2>
            <p className="leading-relaxed">
              For editorial corrections or feedback, same email. Mention
              which article. See the{" "}
              <Link
                href="/editorial-policy"
                className="text-amber-700 underline underline-offset-2 hover:text-amber-800"
              >
                editorial policy
              </Link>{" "}
              for how I handle corrections.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
