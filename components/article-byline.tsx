import Image from "next/image"
import Link from "next/link"

interface ArticleBylineProps {
  datePublished: string
  dateModified?: string
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function ArticleByline({
  datePublished,
  dateModified,
}: ArticleBylineProps) {
  const showUpdated =
    dateModified &&
    new Date(dateModified).toDateString() !==
      new Date(datePublished).toDateString()

  return (
    <div className="flex flex-row flex-wrap items-center gap-2 text-sm text-gray-600">
      <Image
        src="/images/helain-avatar-96.webp"
        alt="Hélain Zimmermann"
        width={32}
        height={32}
        className="size-8 rounded-full object-cover"
      />
      <span>
        By{" "}
        <Link
          href="/about"
          className="font-medium text-gray-900 hover:text-amber-600"
        >
          Hélain Zimmermann
        </Link>
      </span>
      <span aria-hidden="true" className="text-gray-400">
        ·
      </span>
      <span>Co-Founder &amp; CTO @ Ailog · ex-INRIA researcher</span>
      <span aria-hidden="true" className="text-gray-400">
        ·
      </span>
      <time dateTime={datePublished}>{formatDate(datePublished)}</time>
      {showUpdated && dateModified && (
        <>
          <span aria-hidden="true" className="text-gray-400">
            ·
          </span>
          <span className="text-gray-500">
            Updated <time dateTime={dateModified}>{formatDate(dateModified)}</time>
          </span>
        </>
      )}
    </div>
  )
}
