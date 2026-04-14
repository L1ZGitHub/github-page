import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  Mail,
  Linkedin,
  Github,
  GraduationCap,
  Briefcase,
  FileText,
  MapPin,
  ExternalLink,
} from "lucide-react"

export const metadata: Metadata = {
  title: "About",
  description:
    "Hélain Zimmermann — Co-Founder & CTO at Ailog. MSc Machine Learning at KTH, alongside an engineering degree at ENSIMAG. Former INRIA researcher on privacy-preserving NLP.",
  alternates: { canonical: "https://helain-zimmermann.com/about" },
  openGraph: {
    title: "About Hélain Zimmermann",
    description:
      "AI Engineer building production systems. Co-Founder & CTO at Ailog. MSc ML at KTH + engineering degree at ENSIMAG. Former INRIA researcher.",
    url: "https://helain-zimmermann.com/about",
    type: "profile",
  },
}

const education = [
  {
    date: "2025 – 2026",
    degree: "MSc Machine Learning",
    institution: "KTH Royal Institute of Technology",
    location: "Stockholm",
    url: "https://www.kth.se/",
    note: "Joint cursus with ENSIMAG",
  },
  {
    date: "2023 – 2026",
    degree: "Engineering Degree",
    institution: "ENSIMAG - Grenoble INP",
    location: "Grenoble",
    url: "https://ensimag.grenoble-inp.fr/",
    note: "Applied Mathematics & Computer Science",
  },
  {
    date: "2021 – 2023",
    degree: "Cycle Préparatoire Polytechnique (CPP)",
    institution: "Grenoble INP",
    location: "Valence",
    url: "https://www.grenoble-inp.fr/fr/formation/la-prepa-des-inp",
    note: "Integrated engineering preparatory cycle",
  },
]

const experience = [
  {
    date: "Mar 2025 – Present",
    role: "Co-Founder & CTO",
    company: "Ailog",
    url: "https://www.ailog.fr",
    description:
      "Consulting and SaaS in AI, automation, and applied mathematics for European companies. I lead engineering: RAG systems, LLM agents, privacy-aware pipelines.",
  },
  {
    date: "Mar 2025 – Present",
    role: "Technical Consultant — RAG",
    company: "Nsigma Junior-Enterprise",
    location: "Grenoble",
    description:
      "RAG systems for student-run consulting projects. Previously Technical Director (Nov 2023 – Mar 2025).",
  },
  {
    date: "Jun – Sep 2024",
    role: "Research Intern",
    company: "INRIA Grenoble",
    url: "https://www.inria.fr/",
    description:
      "Privacy-preserving NLP. Co-authored arXiv:2501.02407 on text anonymization and memorization risks in language models across French and English.",
  },
  {
    date: "May – Jun 2023",
    role: "IT Technician Intern",
    company: "IE-Concept",
    description: "IoT and embedded systems.",
  },
]

const workAreas = [
  {
    title: "Ailog: consulting and SaaS",
    description:
      "RAG over whatever docs clients already have (PDFs, Notion dumps, ticket history). Agent orchestration for internal workflows. Glue between tools they already pay for. My job is to scope the problem, pick boring infrastructure when it fits, and ship something ops can actually run.",
    url: "https://www.ailog.fr",
  },
  {
    title: "Research: parameter-efficient fine-tuning",
    description:
      "Multi-expert LoRA with a learned router, in the spirit of Mixture-of-Experts but at the adapter level. The question: given 8 tasks (SQuAD, IMDB, CoNLL-2003, WikiText-2, GSM8K, XSum, CommonsenseQA, MNLI), does a gating network learn to send each task to the right expert without manual partitioning? Phi-2 (2.7B) is done across 7 configurations. Top-K sparse routing with k=2 shows the strongest specialization so far (task specialization score 0.0657, versus 0.0065 for a load-balanced baseline). Qwen2.5-0.5B is currently training. Llama-3.2-3B and Gemma-2-2B are queued for the same 7-config sweep.",
  },
  {
    title: "Research: validation of LLM-based social simulations",
    description:
      "SimValid is a multi-scale validation framework (micro, meso, macro) for social simulations driven by LLM agents. It is built on an open-source rewrite of MiroFish where Zep Cloud is replaced by a local NetworkX memory graph. 15 quantitative metrics, 5 per scale. Methodological goal: most published LLM simulations claim emergent behavior with no benchmarks. I want to show you can actually test those claims. Target venue: AAMAS 2027.",
  },
]

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-amber-50/20">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute left-1/4 top-[10%] h-96 w-96 rounded-full bg-amber-100/40 blur-[64px]" />
      <div className="pointer-events-none absolute right-1/4 top-[50%] h-80 w-80 rounded-full bg-violet-100/30 blur-[64px]" />

      <div className="relative mx-auto max-w-3xl px-6 py-24">
        {/* Hero */}
        <section className="mb-16 pt-16">
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
            <Image
              src="/images/helain-avatar-400.webp"
              alt="Hélain Zimmermann"
              width={160}
              height={160}
              className="size-40 shrink-0 rounded-full border-4 border-white object-cover shadow-xl"
              priority
            />
            <div className="text-center sm:text-left">
              <h1 className="mb-2 text-4xl font-bold text-gray-900 md:text-5xl">
                Hélain Zimmermann
              </h1>
              <p className="mb-3 text-xl font-semibold text-amber-600">
                Co-Founder &amp; CTO @ Ailog
              </p>
              <p className="flex items-center justify-center gap-1.5 text-sm text-gray-500 sm:justify-start">
                <MapPin className="size-4" />
                Stockholm, Sweden
              </p>
            </div>
          </div>

          <div className="mt-10 space-y-4 text-lg leading-relaxed text-gray-700">
            <p>
              I ship AI systems: RAG, agents, fine-tuning. Most of what I write
              here comes from code that actually runs in production.
            </p>
            <p>
              Right now I am finishing an{" "}
              <strong className="text-gray-900">
                MSc in Machine Learning
              </strong>{" "}
              at{" "}
              <Link
                href="https://www.kth.se/"
                target="_blank"
                className="text-amber-600 hover:underline"
              >
                KTH Stockholm
              </Link>
              , alongside an engineering degree at{" "}
              <Link
                href="https://ensimag.grenoble-inp.fr/"
                target="_blank"
                className="text-amber-600 hover:underline"
              >
                ENSIMAG Grenoble
              </Link>
              . Before Sweden I spent a summer at{" "}
              <Link
                href="https://www.inria.fr/"
                target="_blank"
                className="text-amber-600 hover:underline"
              >
                INRIA Grenoble
              </Link>{" "}
              working on how language models memorize personal data when
              fine-tuned on sensitive corpora. That work became arXiv:2501.02407,
              which I co-authored.
            </p>
            <p>
              In March 2025 I left the Nsigma Junior-Enterprise and co-founded{" "}
              <Link
                href="https://www.ailog.fr"
                target="_blank"
                className="text-amber-600 hover:underline"
              >
                Ailog
              </Link>
              . We build AI features for small and mid-sized teams: retrieval
              over whatever internal docs they already have, agent workflows
              that replace brittle scripts, automation glue between tools they
              already pay for. Constraints: GDPR when it applies, teams of 3 to
              20, tight budgets, and a demo that cannot survive a Monday morning
              is useless.
            </p>
          </div>
        </section>

        {/* Current work / themes */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            What I work on
          </h2>
          <div className="grid gap-4">
            {workAreas.map((w) => (
              <div
                key={w.title}
                className="rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {w.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      {w.description}
                    </p>
                  </div>
                  {w.url && (
                    <Link
                      href={w.url}
                      target="_blank"
                      className="shrink-0 text-gray-400 transition-colors hover:text-amber-600"
                      aria-label={`${w.title} link`}
                    >
                      <ExternalLink className="size-5" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-500">
            A broader list of projects (open-source, academic, personal) lives on
            the{" "}
            <Link href="/#projects" className="text-amber-600 hover:underline">
              homepage
            </Link>
            .
          </p>
        </section>

        {/* Research */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Research</h2>
          <div className="rounded-2xl border border-gray-100 bg-white p-6">
            <div className="flex items-start gap-3">
              <FileText className="mt-1 size-5 shrink-0 text-violet-600" />
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Towards the Anonymization of the Language Modeling
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  arXiv:2501.02407 · 2025 · INRIA Grenoble
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  With Antoine Boutet, Lucas Magnana, Juliette Sénéchal
                </p>
                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  Language models fine-tuned on sensitive corpora memorize
                  personal data and leak it under targeted prompts. We tested
                  two training schemes against this: a masked objective for
                  BERT-style models, a causal objective for GPT-style ones.
                  Both target direct identifiers (names, numbers) and indirect
                  ones (contextual hints that re-identify a person). We evaluated
                  on a medical dataset against several baselines. Privacy is
                  preserved; utility drops less than I expected. Numbers and
                  code are on the arXiv page.
                </p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  <Link
                    href="https://arxiv.org/abs/2501.02407"
                    target="_blank"
                    className="inline-flex items-center gap-1 font-medium text-amber-600 hover:underline"
                  >
                    arXiv <ExternalLink className="size-3.5" />
                  </Link>
                  <Link
                    href="https://scholar.google.fr/citations?hl=fr&user=MXMobs8AAAAJ"
                    target="_blank"
                    className="inline-flex items-center gap-1 font-medium text-amber-600 hover:underline"
                  >
                    Google Scholar <ExternalLink className="size-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience + Education */}
        <section className="mb-16 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-900">
              <Briefcase className="size-5 text-blue-600" />
              Experience
            </h2>
            <div className="space-y-4">
              {experience.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-gray-100 bg-white p-5"
                >
                  <p className="text-xs font-semibold text-blue-600">
                    {item.date}
                  </p>
                  <p className="mt-1 font-semibold text-gray-900">{item.role}</p>
                  <p className="text-sm text-gray-500">
                    {item.url ? (
                      <Link
                        href={item.url}
                        target="_blank"
                        className="hover:text-amber-600 hover:underline"
                      >
                        {item.company}
                      </Link>
                    ) : (
                      item.company
                    )}
                    {item.location && ` • ${item.location}`}
                  </p>
                  {item.description && (
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-900">
              <GraduationCap className="size-5 text-blue-600" />
              Education
            </h2>
            <div className="space-y-4">
              {education.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-gray-100 bg-white p-5"
                >
                  <p className="text-xs font-semibold text-blue-600">
                    {item.date}
                  </p>
                  <p className="mt-1 font-semibold text-gray-900">
                    {item.degree}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.url ? (
                      <Link
                        href={item.url}
                        target="_blank"
                        className="hover:text-amber-600 hover:underline"
                      >
                        {item.institution}
                      </Link>
                    ) : (
                      item.institution
                    )}
                    {item.location && ` • ${item.location}`}
                  </p>
                  {item.note && (
                    <p className="mt-2 text-xs italic text-gray-500">
                      {item.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-8">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Get in touch</h2>
          <div className="rounded-2xl border border-gray-100 bg-white p-6">
            <p className="mb-5 leading-relaxed text-gray-700">
              Consulting work (RAG, agents, AI engineering) goes through Ailog,
              or email me directly if you prefer. For editorial feedback on an
              article, same email, just mention which one.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:contact@helain-zimmermann.com"
                className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-gray-800"
              >
                <Mail className="size-4" />
                contact@helain-zimmermann.com
              </a>
              <Link
                href="https://www.linkedin.com/in/helain-zimmermann/"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-all hover:border-gray-900 hover:bg-gray-50"
              >
                <Linkedin className="size-4" />
                LinkedIn
              </Link>
              <Link
                href="https://github.com/L1ZGitHub"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-all hover:border-gray-900 hover:bg-gray-50"
              >
                <Github className="size-4" />
                GitHub
              </Link>
            </div>
          </div>
        </section>

        {/* Meta note */}
        <p className="text-center text-xs text-gray-400">
          Editorial policy and corrections →{" "}
          <Link href="/editorial-policy" className="underline hover:text-gray-600">
            /editorial-policy
          </Link>
        </p>
      </div>
    </div>
  )
}
