// Kanban column container.
import type { ReactNode } from 'react'

export function Column({
  title,
  count,
  children,
  isOver,
}: {
  title: string
  count: number
  children: ReactNode
  isOver: boolean
}) {
  return (
    <section
      className={`flex min-w-[220px] max-h-[70vh] flex-col rounded-[18px] border bg-white p-3 ${
        isOver ? 'shadow-[0_0_0_2px_rgba(37,99,235,0.3)]' : 'border-black/10'
      }`}
    >
      <header className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        <span className="text-sm text-slate-500">{count}</span>
      </header>
      <div className="overflow-auto pr-1.5">{children}</div>
    </section>
  )
}
