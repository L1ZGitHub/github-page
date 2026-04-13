import { Hero } from "@/components/hero"
import { StatsBanner } from "@/components/stats-banner"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { LatestArticles } from "@/components/latest-articles"
import { Research } from "@/components/research"
import { Resume } from "@/components/resume"
import { Contact } from "@/components/contact"

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBanner />
      <About />
      <Projects />
      <LatestArticles />
      <Research />
      <Resume />
      <Contact />
    </>
  )
}
