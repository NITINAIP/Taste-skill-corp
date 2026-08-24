import { useEffect } from "react"
import { useLocation } from "react-router-dom"

/**
 * A single-page app keeps the scroll position across route changes, which reads
 * as a broken page: you click a product and land halfway down its detail page.
 * Navigation resets to the top; an in-page hash scrolls to its target instead.
 */
export function useScrollRestoration() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash)
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" })
        return
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }, [pathname, hash])
}
