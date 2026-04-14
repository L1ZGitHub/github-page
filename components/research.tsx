import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function Research() {
  return (
    <section id="research" className="relative overflow-hidden px-6 py-24 bg-gradient-to-b from-white to-slate-50">
      {/* Decorative blob */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-emerald-50/40 blur-[64px]" />

      <div className="relative mx-auto max-w-3xl">
        <div className="mb-16 text-center scroll-mt-24">
          <div className="mx-auto mb-6 h-px w-16 bg-gray-300" />
          <h2 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">Research</h2>
          <p className="text-lg text-gray-600">Research on privacy-preserving NLP, done at INRIA Grenoble.</p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-8 transition-all hover:-translate-y-1 hover:border-emerald-400 hover:shadow-xl">
          <span className="mb-4 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
            2024 – INRIA
          </span>
          <h3 className="mb-2 text-xl font-bold text-gray-900">
            Towards the Anonymization of the Language Modeling
          </h3>
          <p className="mb-4 text-sm text-gray-500">arXiv • INRIA Grenoble</p>
          <p className="leading-relaxed text-gray-600">
            Two training schemes against memorization in fine-tuned language models: a masked objective for BERT-style models, a causal one for GPT-style. Both target direct and indirect identifiers. Evaluated on a medical dataset against several baselines.
          </p>
          <Link
            href="https://arxiv.org/html/2501.02407v2"
            target="_blank"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            View Paper
            <ArrowRight className="size-4 transition-transform hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
