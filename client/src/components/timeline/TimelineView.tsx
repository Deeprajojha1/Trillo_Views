// Timeline/Gantt view.
import type { Task } from '../../data/tasks'
import { buildTimelineBounds } from '../../store/TaskStore'
import { diffDays, formatDate } from '../../utils/date'
import { Badge } from '../Badge'

export function TimelineView({ tasks }: { tasks: Task[] }) {
  const { start, end, today } = buildTimelineBounds(tasks)
  const totalDays = Math.max(diffDays(start, end), 1)
  const todayOffset = Math.max(diffDays(start, today), 0)

  return (
    <section className="rounded-[18px] border border-black/10 bg-white p-4">
      <div className="mb-2.5 flex items-center justify-between font-semibold">
        <div>Task</div>
        <div className="flex gap-3 text-slate-500">
          <span>{formatDate(start)}</span>
          <span>{formatDate(end)}</span>
        </div>
      </div>
      <div className="relative flex max-h-[520px] flex-col gap-3 overflow-y-auto pr-1.5">
        <div
          className="absolute -top-1.5 bottom-[-6px] w-[2px] bg-red-600"
          style={{ left: `${(todayOffset / totalDays) * 100}%` }}
        >
          <span className="absolute -top-4 left-2 text-[11px] text-red-700">
            Today
          </span>
        </div>
        {tasks.map((task) => {
          const hasStart = !!task.startDate && !!task.endDate
          const startDate = task.startDate ? new Date(task.startDate) : null
          const endDate = task.endDate ? new Date(task.endDate) : null
          const dotDate = startDate ?? new Date(task.dueDate)
          const startOffset = diffDays(start, dotDate)
          const spanDays = hasStart && startDate && endDate ? diffDays(startDate, endDate) + 1 : 1
          const left = (startOffset / totalDays) * 100
          const width = Math.max((spanDays / totalDays) * 100, 1)

          return (
            <div className="grid items-center gap-4 lg:grid-cols-[240px_1fr]" key={task.id}>
              <div className="flex flex-col gap-1.5 font-semibold">
                <span>{task.title}</span>
                <Badge
                  label={task.priority}
                  tone={
                    task.priority === 'high'
                      ? 'danger'
                      : task.priority === 'medium'
                        ? 'warning'
                        : 'neutral'
                  }
                />
              </div>
              <div className="relative h-8 overflow-hidden rounded-full bg-slate-100">
                {hasStart ? (
                  <div
                    className="absolute top-1 flex h-6 items-center rounded-full bg-gradient-to-br from-blue-700 to-blue-600 px-2.5 text-[11px] text-white"
                    style={{ left: `${left}%`, width: `${width}%` }}
                  >
                    <span>
                      {startDate ? formatDate(startDate) : ''} - {endDate ? formatDate(endDate) : ''}
                    </span>
                  </div>
                ) : (
                  <div
                    className="absolute top-2.5 h-3 w-3 rounded-full bg-orange-500"
                    style={{ left: `${left}%` }}
                  >
                    <span className="absolute -top-5 left-4 text-[11px] text-slate-500">
                      Needs start date
                    </span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}




