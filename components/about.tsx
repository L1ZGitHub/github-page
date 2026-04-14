import Link from "next/link"
import { Badge } from "@/components/ui/badge"

const skills = [
  "Python", "PyTorch", "LangChain", "RAG Systems", "NLP",
  "FastAPI", "Docker", "PostgreSQL", "Next.js", "TypeScript",
]

export function About() {
  return (
    <section id="about" className="relative overflow-hidden px-6 py-24 bg-gradient-to-b from-white to-slate-50">
      {/* Decorative blob */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-violet-200/40 blur-[64px]" />

      <div className="relative mx-auto max-w-3xl">
        <div className="mb-16 text-center scroll-mt-24">
          <div className="mx-auto mb-6 h-px w-16 bg-gray-300" />
          <h2 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">About Me</h2>
          <p className="text-lg text-gray-600">
            Shipping code, not slides. Papers only when they exist.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <p className="mb-4 leading-relaxed text-gray-700">
            I&apos;m <strong className="text-gray-900">Co-Founder &amp; CTO at Ailog</strong>, where we build AI features for small and mid-sized teams: retrieval over messy internal documents, agent workflows that replace brittle scripts, automation around the tools clients already pay for.
          </p>
          <p className="leading-relaxed text-gray-700">
            Before Ailog I spent a summer at <strong className="text-gray-900">INRIA Grenoble</strong> on privacy-preserving NLP, which became <Link href="https://arxiv.org/abs/2501.02407" target="_blank" className="text-amber-600 hover:underline">arXiv:2501.02407</Link>. I&apos;m finishing an MSc in Machine Learning at <strong className="text-gray-900">KTH Stockholm</strong> alongside an engineering degree at <strong className="text-gray-900">ENSIMAG Grenoble</strong>. My research keeps going on the side: multi-expert LoRA with learned routing, and a validation framework for LLM-based social simulations (SimValid).
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="rounded-lg border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 hover:-translate-y-0.5 transition-transform"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
