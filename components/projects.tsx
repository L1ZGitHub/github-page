import Link from "next/link"
import { Bot, Shield, Cpu, Brain, Flame, ImageIcon, MemoryStick, FileImage, ArrowRight } from "lucide-react"

const projects = [
  {
    icon: Bot,
    title: "Ailog – Custom AI Agents",
    description:
      "Co-founded the startup helping companies unlock AI through tailored solutions: custom LLM development, RAG systems, business process automation, and AI training programs.",
    tags: ["RAG", "LLM", "Automation", "Data Science"],
    link: { href: "https://www.ailog.fr/fr/landing", label: "Visit Website" },
  },
  {
    icon: Shield,
    title: "Privacy-Preserving NLP",
    description:
      "Research at INRIA comparing sensitive information leaks in NLP models across French and English. Analyzed how language structures impact memorization risks in LLMs.",
    tags: ["NLP", "Privacy", "Research", "AI"],
    link: { href: "https://arxiv.org/html/2501.02407v2", label: "View Paper" },
  },
  {
    icon: Cpu,
    title: "IoT Home-Automation Hub",
    description:
      "ESP32-based system controlling HVAC, 3D printers, and cameras via Home-Assistant. Arduino programming, Docker containers, and 3D modeling for custom enclosures.",
    tags: ["IoT", "ESP32", "Docker", "3D Printing"],
  },
  {
    icon: Brain,
    title: "RAG-as-Service Platform",
    description:
      "Full-stack platform enabling businesses to deploy custom RAG solutions with document management, multi-language support, and analytics.",
    tags: ["Full-Stack", "SaaS", "AI"],
    link: { href: "https://www.ailog.fr/fr/landing", label: "Visit Website" },
  },
  {
    icon: Flame,
    title: "Autonomous Firefighting Robots",
    description:
      "Java simulation of autonomous firefighting robots with A* pathfinding, event-driven simulation, and graphical interface for terrain visualization and robot coordination.",
    tags: ["Java", "OOP", "Algorithms"],
  },
  {
    icon: ImageIcon,
    title: "Image Seam Carving",
    description:
      "Content-aware image resizing using dynamic programming and GPU acceleration with Numba. Achieved 10-100x speedup through vectorized GPU operations.",
    tags: ["Python", "GPU", "Image Processing"],
  },
  {
    icon: MemoryStick,
    title: "RISC-V Processor Design",
    description:
      "Designed a RISC-V processor in VHDL with custom extensions, interrupt handling, and peripheral integration (LEDs, HDMI). Validated on FPGA hardware.",
    tags: ["VHDL", "FPGA", "Assembly"],
  },
  {
    icon: FileImage,
    title: "JPEG Encoder in C",
    description:
      "Implemented a JPEG encoder from scratch: color space conversion (RGB to YCbCr), DCT, quantization, and Huffman entropy coding for image compression.",
    tags: ["C", "Compression", "Algorithms"],
  },
]

export function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden px-6 py-24 bg-gradient-to-b from-slate-50 to-white">
      {/* Decorative blob */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-amber-100/25 blur-[64px]" />

      <div className="relative">
        <div className="mb-16 text-center scroll-mt-24">
          <div className="mx-auto mb-6 h-px w-16 bg-gray-300" />
          <h2 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">Selected Projects</h2>
          <p className="text-lg text-gray-600">From startup ventures to research innovations</p>
        </div>

        <div className="mx-auto grid max-w-[1000px] gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group relative rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-xl"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-gray-50 transition-colors group-hover:bg-amber-50">
                <project.icon className="size-5 text-amber-500" />
              </div>

              <h3 className="mb-2 text-lg font-bold text-gray-900">{project.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{project.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-gray-100 px-3 py-1 text-xs text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.link && (
                <Link
                  href={project.link.href}
                  target="_blank"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
                >
                  {project.link.label}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
