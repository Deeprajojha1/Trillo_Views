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
    <article
      className={`flex flex-col gap-2.5 rounded-[16px] border bg-slate-50 p-3.5 ${
        isOverdue
          ? 'border-red-400/60 shadow-[0_0_0_1px_rgba(239,68,68,0.2)]'
          : 'border-black/10'
      }`}
    >
      <div className="font-semibold">{task.title}</div>
      <div className="flex items-center justify-between text-xs text-slate-500">
        <Badge
          label={task.priority}
          tone={task.priority === 'high' ? 'danger' : task.priority === 'medium' ? 'warning' : 'neutral'}
        />
        <span>{dueLabel}</span>
      </div>
      <div className="flex items-center gap-2 text-xs text-slate-600">
        <div
          className="flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-semibold text-white"
          style={{ backgroundColor: assignee?.color }}
        >
          {assignee?.initials}
        </div>
        <span>{assignee?.name}</span>
      </div>
    </article>
  )
}
