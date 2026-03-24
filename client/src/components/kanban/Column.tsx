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
    <section className={`kanban-column ${isOver ? 'is-over' : ''}`}>
      <header>
        <h3>{title}</h3>
        <span>{count}</span>
      </header>
      <div className="column-body">{children}</div>
    </section>
  )
}
