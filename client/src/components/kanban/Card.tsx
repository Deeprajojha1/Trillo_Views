// Kanban task card.
import type { Task } from '../../data/tasks'
import { USERS } from '../../data/users'
import { Badge } from '../Badge'
import { diffDays, formatDate, isSameDay } from '../../utils/date'

export function Card({ task }: { task: Task }) {
  const assignee = USERS.find((user) => user.id === task.assigneeId)
  const dueDate = new Date(task.dueDate)
  const today = new Date()
  const daysLeft = diffDays(today, dueDate)
  const isOverdue = daysLeft < 0
  const isToday = isSameDay(today, dueDate)

  let dueLabel = formatDate(dueDate)
  if (isToday) dueLabel = 'Due today'
  if (isOverdue) dueLabel = `Overdue by ${Math.abs(daysLeft)}d`

  return (
    <article className={`card ${isOverdue ? 'overdue' : ''}`}>
      <div className="card-title">{task.title}</div>
      <div className="card-meta">
        <Badge
          label={task.priority}
          tone={task.priority === 'high' ? 'danger' : task.priority === 'medium' ? 'warning' : 'neutral'}
        />
        <span className="due-date">{dueLabel}</span>
      </div>
      <div className="card-footer">
        <div className="avatar" style={{ backgroundColor: assignee?.color }}>
          {assignee?.initials}
        </div>
        <span>{assignee?.name}</span>
      </div>
    </article>
  )
}
