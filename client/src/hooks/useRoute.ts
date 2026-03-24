// Tiny client-side router.
import { useEffect, useState } from 'react'

export type Route = '/' | '/board'

export function useRoute() {
  const [path, setPath] = useState<Route>(() => {
    return window.location.pathname === '/board' ? '/board' : '/'
  })

  useEffect(() => {
    const onPop = () => {
      setPath(window.location.pathname === '/board' ? '/board' : '/')
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = (next: Route) => {
    if (next === path) return
    window.history.pushState({}, '', next)
    setPath(next)
  }

  return { path, navigate }
}
