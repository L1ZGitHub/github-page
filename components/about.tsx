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
            Building AI systems that respect privacy and deliver real value
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <p className="mb-4 leading-relaxed text-gray-700">
            AI Engineer and entrepreneur building intelligent systems that create real
            business impact. As{" "}
            <strong className="text-gray-900">Co-Founder &amp; CTO of Ailog</strong>, I lead
            the development of RAG-powered solutions, custom LLM integrations, and
            automation pipelines for companies seeking to leverage AI effectively.
          </p>
          <p className="leading-relaxed text-gray-700">
            My background combines rigorous engineering training at{" "}
            <strong className="text-gray-900">ENSIMAG</strong> with research experience at{" "}
            <strong className="text-gray-900">INRIA</strong> on privacy-preserving NLP.
            Currently pursuing a{" "}
            <strong className="text-gray-900">
              Master&apos;s in Machine Learning at KTH Stockholm
            </strong>{" "}
            to deepen my expertise in scalable AI systems.
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
