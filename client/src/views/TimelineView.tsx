// Timeline/Gantt view.
import type { Task } from '../data/tasks'
import { buildTimelineBounds } from '../store/TaskStore'
import { diffDays, formatDate } from '../utils/date'
import { Badge } from '../components/Badge'

export function TimelineView({ tasks }: { tasks: Task[] }) {
  const { start, end, today } = buildTimelineBounds(tasks)
  const totalDays = Math.max(diffDays(start, end), 1)
  const todayOffset = Math.max(diffDays(start, today), 0)

  return (
    <section className="timeline-view">
      <div className="timeline-header">
        <div>Task</div>
        <div className="timeline-range">
          <span>{formatDate(start)}</span>
          <span>{formatDate(end)}</span>
        </div>
      </div>
      <div className="timeline-body">
        <div
          className="today-line"
          style={{ left: `${(todayOffset / totalDays) * 100}%` }}
        >
          <span>Today</span>
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
            <div className="timeline-row" key={task.id}>
              <div className="timeline-title">
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
              <div className="timeline-track">
                {hasStart ? (
                  <div
                    className="timeline-bar"
                    style={{ left: `${left}%`, width: `${width}%` }}
                  >
                    <span>
                      {startDate ? formatDate(startDate) : ''} - {endDate ? formatDate(endDate) : ''}
                    </span>
                  </div>
                ) : (
                  <div className="timeline-dot" style={{ left: `${left}%` }}>
                    <span>Needs start date</span>
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



