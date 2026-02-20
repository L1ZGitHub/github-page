import Link from "next/link"
import { Briefcase, GraduationCap, Download } from "lucide-react"

const experience = [
  {
    date: "Mar 2025 – Present",
    role: "Co-Founder & CTO",
    company: "Ailog • Hybrid",
  },
  {
    date: "Mar 2025 – Present",
    role: "Technical Consultant – RAG",
    company: "Nsigma Junior-Enterprise • Grenoble",
    extra: { date: "Nov 2023 – Mar 2025", role: "Technical Director" },
  },
  {
    date: "Jun – Sep 2024",
    role: "Research Intern",
    company: "INRIA • Privacy-Preserving NLP",
  },
  {
    date: "May – Jun 2023",
    role: "IT Technician Intern",
    company: "IE-Concept • IoT & Embedded",
  },
]

const education = [
  {
    date: "2025 – 2026",
    role: "MSc Machine Learning",
    company: "KTH Royal Institute of Technology • Stockholm",
  },
  {
    date: "2023 – 2026",
    role: "Engineering Degree",
    company: "ENSIMAG • Grenoble INP",
  },
  {
    date: "2021 – 2023",
    role: "Preparatory Cycle",
    company: "CPP • Valence",
  },
]

export function Resume() {
  return (
    <section id="resume" className="relative overflow-hidden px-6 py-24 bg-gradient-to-b from-slate-50 to-white">
      {/* Decorative blob */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-blue-50/40 blur-[64px]" />

      <div className="relative mx-auto max-w-[900px]">
        <div className="mb-16 text-center scroll-mt-24">
          <div className="mx-auto mb-6 h-px w-16 bg-gray-300" />
          <h2 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">Resume</h2>
          <p className="text-lg text-gray-600">Experience and education journey</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Experience */}
          <div>
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-900">
              <Briefcase className="size-5 text-blue-600" />
              Experience
            </h3>
            <div className="space-y-4">
              {experience.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-gray-100 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                >
                  <p className="text-xs font-semibold text-blue-600">{item.date}</p>
                  <p className="font-semibold text-gray-900">{item.role}</p>
                  {item.extra && (
                    <>
                      <p className="mt-3 text-xs font-semibold text-blue-600">{item.extra.date}</p>
                      <p className="font-semibold text-gray-900">{item.extra.role}</p>
                    </>
                  )}
                  <p className="text-sm text-gray-500">{item.company}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-900">
              <GraduationCap className="size-5 text-blue-600" />
              Education
            </h3>
            <div className="space-y-4">
              {education.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-gray-100 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                >
                  <p className="text-xs font-semibold text-blue-600">{item.date}</p>
                  <p className="font-semibold text-gray-900">{item.role}</p>
                  <p className="text-sm text-gray-500">{item.company}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/files/ZIMMERMANN_Helain_Resume_en.pdf"
            target="_blank"
            download
            className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-200 px-6 py-3 font-medium text-gray-700 transition-all hover:border-gray-900 hover:bg-gray-900 hover:text-white"
          >
            <Download className="size-4" />
            Download Full CV
          </Link>
        </div>
      </div>
    </section>
  )
}
