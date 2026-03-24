// Kanban view with custom drag and drop.
import { useMemo, useState, useEffect } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import type { Task, Status } from '../data/tasks'
import { useTasks } from '../store/useTasks'
import { Column } from '../components/kanban/Column'
import { Card } from '../components/kanban/Card'
import { EmptyState } from '../components/EmptyState'

const STATUS_LABEL: Record<Status, string> = {
  todo: 'To Do',
  inprogress: 'In Progress',
  review: 'In Review',
  done: 'Done',
}

type DragState = {
  taskId: string
  offsetX: number
  offsetY: number
  width: number
  height: number
  x: number
  y: number
}

export function KanbanView({ tasks }: { tasks: Task[] }) {
  const { dispatch } = useTasks()
  const [drag, setDrag] = useState<DragState | null>(null)
  const [over, setOver] = useState<{ status: Status; index: number } | null>(
    null,
  )

  const grouped = useMemo(() => {
    const map: Record<Status, Task[]> = {
      todo: [],
      inprogress: [],
      review: [],
      done: [],
    }
    tasks
      .slice()
      .sort((a, b) => a.order - b.order)
      .forEach((task) => map[task.status].push(task))
    return map
  }, [tasks])

  useEffect(() => {
    if (!drag) return

    const onMove = (event: PointerEvent) => {
      setDrag((current) =>
        current
          ? {
              ...current,
              x: event.clientX - current.offsetX,
              y: event.clientY - current.offsetY,
            }
          : null,
      )

      const target = document.elementFromPoint(
        event.clientX,
        event.clientY,
      ) as HTMLElement | null
      const column = target?.closest('[data-column]') as HTMLElement | null

      if (!column) {
        setOver(null)
        return
      }

      const status = column.dataset.column as Status
      const card = target?.closest('[data-card]') as HTMLElement | null
      const index = card ? Number(card.dataset.index ?? 0) : column.querySelectorAll('[data-card]').length

      setOver({ status, index })
    }

    const onUp = () => {
      if (over) {
        dispatch({
          type: 'moveTask',
          taskId: drag.taskId,
          status: over.status,
          index: over.index,
        })
      }
      setDrag(null)
      setOver(null)
      document.body.classList.remove('is-dragging')
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [drag, over, dispatch])

  const onPointerDown = (
    event: ReactPointerEvent<HTMLDivElement>,
    taskId: string,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect()
    document.body.classList.add('is-dragging')
    event.currentTarget.setPointerCapture(event.pointerId)

    setDrag({
      taskId,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
      width: rect.width,
      height: rect.height,
      x: rect.left,
      y: rect.top,
    })
  }

  return (
    <section className="grid grid-cols-1 gap-4 overflow-x-auto pb-2 md:grid-cols-2 xl:grid-cols-4">
      {(Object.keys(STATUS_LABEL) as Status[]).map((status) => {
        const list = grouped[status]
        const isOver = over?.status === status
        return (
          <Column key={status} title={STATUS_LABEL[status]} count={list.length} isOver={isOver}>
            <div className="flex flex-col gap-3" data-column={status}>
              {list.length === 0 && (
                <EmptyState title="No tasks" subtitle="Drag a card here." />
              )}
              {list.map((task, index) => {
                const showPlaceholder =
                  drag && over?.status === status && over?.index === index
                return (
                  <div key={task.id} data-card data-index={index} className="relative">
                    {showPlaceholder && (
                      <div className="mb-3 h-[70px] rounded-[16px] border-2 border-dashed border-blue-400/60 bg-blue-500/10" />
                    )}
                    <div onPointerDown={(event) => onPointerDown(event, task.id)}>
                      <div className="cursor-grab">
                        <Card task={task} />
                      </div>
                    </div>
                  </div>
                )
              })}
              {drag && over?.status === status && over?.index === list.length && (
                <div className="mb-3 h-[70px] rounded-[16px] border-2 border-dashed border-blue-400/60 bg-blue-500/10" />
              )}
            </div>
          </Column>
        )
      })}

      {drag && (
        <div
          className="pointer-events-none fixed left-0 top-0 z-50 opacity-90"
          style={{
            width: drag.width,
            height: drag.height,
            transform: `translate(${drag.x}px, ${drag.y}px)`,
          }}
        >
          <Card task={tasks.find((task) => task.id === drag.taskId)!} />
        </div>
      )}
    </section>
  )
}



