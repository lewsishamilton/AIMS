import { useEffect } from "react"
import { useLocation } from "react-router-dom"

// Browsers restore scroll on SPA navigation; reset it on every route change.
// A link with a #hash (e.g. /#admissions-enquiry) scrolls to that element instead,
// waiting briefly because lazily loaded pages render it a moment later.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    let tries = 0
    const timer = setInterval(() => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el || ++tries > 30) {
        clearInterval(timer)
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
        else window.scrollTo(0, 0)
      }
    }, 100)
    return () => clearInterval(timer)
  }, [pathname, hash])

  return null
}
