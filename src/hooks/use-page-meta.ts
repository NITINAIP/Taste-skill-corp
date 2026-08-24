import { useEffect } from "react"

const SITE_NAME = "อารักษ์ โบรกเกอร์"

function setMeta(name: string, content: string) {
  let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement("meta")
    tag.name = name
    document.head.appendChild(tag)
  }
  tag.content = content
}

/**
 * Per-route title and description.
 *
 * A single-page app keeps one document, so without this every route shares the
 * homepage title in the browser tab, in bookmarks and in share previews.
 */
export function usePageMeta({
  title,
  description,
}: {
  title: string
  description: string
}) {
  useEffect(() => {
    document.title = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`
    setMeta("description", description)
  }, [title, description])
}
