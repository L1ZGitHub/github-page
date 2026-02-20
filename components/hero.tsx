import Image from "next/image"
import Link from "next/link"
import { Linkedin, ArrowRight, Mail } from "lucide-react"

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-6 pb-16 pt-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-amber-50/30" />

      {/* Decorative blobs */}
      <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-amber-100/30 blur-[64px]" />
      <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-violet-100/30 blur-[64px]" />

      <div className="relative mx-auto max-w-3xl text-center">
        <Image
          src="/images/avatar1.jpg"
          alt="Hélain Zimmermann"
          width={150}
          height={150}
          className="mx-auto mb-8 rounded-full border-4 border-white shadow-xl animate-[float_6s_ease-in-out_infinite]"
          priority
        />

        <h1 className="mb-2 text-4xl font-bold text-gray-900 md:text-6xl">
          Hélain Zimmermann
        </h1>
        <p className="mb-4 text-xl font-semibold text-amber-600">
          Co-Founder &amp; CTO @ Ailog
        </p>
        <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-gray-600">
          AI Engineer specializing in machine learning systems, RAG architectures,
          and privacy-preserving NLP. Currently pursuing a Master&apos;s in Machine
          Learning at KTH Stockholm.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="https://www.linkedin.com/in/helain-zimmermann/"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-7 py-3.5 font-medium text-white transition-all hover:bg-amber-600 hover:shadow-lg hover:shadow-amber-500/30 hover:scale-105"
          >
            <Linkedin className="size-5" />
            Connect on LinkedIn
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-7 py-3.5 font-medium text-white transition-all hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-600/30 hover:scale-105"
          >
            <Mail className="size-5" />
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  )
}
