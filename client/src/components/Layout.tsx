// App shell layout.
import type { ReactNode } from 'react'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="px-[48px] pt-[32px] pb-[60px]">{children}</div>
  )
}
