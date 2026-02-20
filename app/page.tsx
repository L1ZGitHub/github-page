import { Hero } from "@/components/hero"
import { StatsBanner } from "@/components/stats-banner"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
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
      <Research />
      <Resume />
      <Contact />
    </>
  )
}
