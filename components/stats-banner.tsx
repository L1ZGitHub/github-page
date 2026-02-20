export function StatsBanner() {
  const stats = [
    { value: "3+", label: "Years Experience" },
    { value: "8+", label: "Projects" },
    { value: "1", label: "Research Publication" },
    { value: "2", label: "Master's Degrees" },
  ]

  // Repeat 4 times for seamless marquee
  const repeated = [...stats, ...stats, ...stats, ...stats]

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-amber-50/40 to-slate-50 py-6">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-slate-50 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-slate-50 to-transparent" />

      <div className="flex w-fit animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused]">
        {repeated.map((stat, i) => (
          <div key={i} className="flex shrink-0 items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-semibold text-amber-600">{stat.value}</span>
              <span className="whitespace-nowrap text-sm uppercase tracking-wider text-gray-500">
                {stat.label}
              </span>
            </div>
            <span className="shrink-0 px-14 text-lg text-amber-200">—</span>
          </div>
        ))}
      </div>
    </section>
  )
}
