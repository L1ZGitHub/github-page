import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Editorial Policy",
  description:
    "How this blog operates: who writes, AI assistance policy, sources, corrections, and contact.",
  alternates: {
    canonical: "https://helain-zimmermann.com/editorial-policy",
  },
}

export default function EditorialPolicyPage() {
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

      <section className="relative pt-32 pb-16 text-center">
        <div className="relative mx-auto max-w-3xl px-6">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-[3.5rem] leading-tight">
            Editorial Policy
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
            This is a personal technical blog. I write about AI engineering,
            privacy-preserving NLP, and building production systems on
            constrained infrastructure. Here&apos;s how this blog operates.
          </p>
        </div>
      </section>

      <section className="relative px-6 pb-24">
        <article className="relative mx-auto max-w-3xl text-gray-800">
          <div className="space-y-10 text-base leading-relaxed">
            <section>
              <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                Who writes
              </h2>
              <p>
                Every article here is written by me, Hélain Zimmermann.
                I&apos;m Co-Founder &amp; CTO of Ailog, finishing my MSc in
                Machine Learning at KTH Royal Institute of Technology in
                Stockholm, with an engineering degree from ENSIMAG (Grenoble)
                and a research stint at INRIA Grenoble on privacy-preserving
                NLP. I don&apos;t host guest posts or ghostwritten content.
                More context on the{" "}
                <Link
                  href="/#about"
                  className="text-amber-700 underline underline-offset-2 hover:text-amber-800"
                >
                  about section
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                AI assistance
              </h2>
              <p>
                Some articles use Claude as a writing assistant, mostly for
                research synthesis, outlining, and first-draft scaffolding.
                That is not the same as auto-generated content. Every article
                published here is substantively reviewed and edited by a
                human (me) before it goes live: technical claims are
                verified, examples are run, opinions are mine. If an article
                is heavily AI-assisted, it&apos;s still only published when I
                can defend every sentence in it.
              </p>
              <p className="mt-3">
                When I publish a detailed post-mortem on the pipeline
                powering this blog, I&apos;ll link it here.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                Sources and citations
              </h2>
              <p>
                I cite primary sources when I reference external work:
                papers, RFCs, official documentation. If I mention a
                benchmark, I link the original paper or run it myself with
                published code. I don&apos;t paraphrase other blogs and
                present the result as my own insight. When I build on
                someone else&apos;s idea, I name them and link them.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                Corrections
              </h2>
              <p>
                If you find an error (factual, technical, or otherwise),
                email me at{" "}
                <a
                  href="mailto:contact@helain-zimmermann.com"
                  className="text-amber-700 underline underline-offset-2 hover:text-amber-800"
                >
                  contact@helain-zimmermann.com
                </a>
                . I&apos;ll update the article and add a dated changelog
                entry if the correction is substantive. I don&apos;t
                silently rewrite history: typos get fixed quietly, but
                anything that changes the meaning of a claim is flagged.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                Conflicts of interest
              </h2>
              <p>
                I&apos;m Co-Founder &amp; CTO of Ailog. When I write about
                tools, frameworks, or methods we use at Ailog, I disclose
                it in the article. I never receive payment, affiliate fees,
                or free products in exchange for coverage. If that ever
                changes, it will be disclosed prominently on the article
                itself and documented here.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                Privacy and data
              </h2>
              <p>
                This site uses Google Analytics for basic traffic
                measurement. No other tracking, no ad network, no newsletter
                yet, no comments system. I don&apos;t sell or share visitor
                data. Articles are served over HTTPS via Cloudflare.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-gray-900">
                Contact
              </h2>
              <p>
                For anything editorial (corrections, questions, feedback,
                professional inquiries), email{" "}
                <a
                  href="mailto:contact@helain-zimmermann.com"
                  className="text-amber-700 underline underline-offset-2 hover:text-amber-800"
                >
                  contact@helain-zimmermann.com
                </a>
                . Full contact options on the{" "}
                <Link
                  href="/contact"
                  className="text-amber-700 underline underline-offset-2 hover:text-amber-800"
                >
                  contact page
                </Link>
                .
              </p>
            </section>
          </div>
        </article>
      </section>
    </div>
  )
}
