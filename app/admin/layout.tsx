import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog Admin",
  robots: { index: false, follow: false },
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <style>{`
        header, footer { display: none !important; }
        main { padding-top: 0 !important; }
      `}</style>
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-900"
          >
            <ArrowLeft className="size-3.5" />
            Back to site
          </Link>
        </div>
        <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
          {children}
        </div>
      </div>
    </>
  )
}
