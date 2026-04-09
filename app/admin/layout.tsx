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
      {/* Hide site header/footer on admin pages.
          Route groups would be cleaner but require moving all public pages into (public)/. */}
      <style>{`
        header, footer { display: none !important; }
        main { padding-top: 0 !important; }
      `}</style>
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-900"
            >
              <ArrowLeft className="size-3.5" />
              Back to site
            </Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/admin" className="text-gray-500 transition-colors hover:text-gray-900">
                Dashboard
              </Link>
              <Link href="/admin/crosspost" className="text-gray-500 transition-colors hover:text-gray-900">
                Cross-post
              </Link>
              <Link href="/admin/contact" className="text-gray-500 transition-colors hover:text-gray-900">
                Contact
              </Link>
            </nav>
          </div>
        </div>
        <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
          {children}
        </div>
      </div>
    </>
  )
}
