import { useEffect } from "react"
import { useLocation } from "react-router-dom"

// Browsers restore scroll on SPA navigation; reset it on every route change.
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
