interface ChangelogEntry {
  date: string
  note: string
}

interface ArticleChangelogProps {
  entries: ChangelogEntry[]
}

export function ArticleChangelog({ entries }: ArticleChangelogProps) {
  if (!entries || entries.length === 0) return null

  return (
    <details className="mx-auto mt-8 max-w-[800px] border-t border-gray-200 px-6 pt-4 text-sm text-gray-500">
      <summary className="cursor-pointer font-medium text-gray-600 hover:text-gray-900">
        Changelog ({entries.length} {entries.length === 1 ? "update" : "updates"})
      </summary>
      <ul className="mt-3 space-y-1.5 pl-4">
        {entries.map((entry, i) => (
          <li key={i} className="list-disc text-gray-500">
            <time dateTime={entry.date} className="font-mono text-xs text-gray-600">
              {entry.date}
            </time>
            {" · "}
            <span>{entry.note}</span>
          </li>
        ))}
      </ul>
    </details>
  )
}
