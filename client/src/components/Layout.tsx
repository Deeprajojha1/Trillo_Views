// App shell layout.
import type { ReactNode } from 'react'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="px-4 pb-10 pt-6 sm:px-6 lg:px-12 lg:pt-8">{children}</div>
  )
}
