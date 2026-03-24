// List view with virtual scrolling.
import { useMemo, useState } from 'react'
import type { Task, Status } from '../../data/tasks'
import { useTasks } from '../../store/useTasks'
import { applySort } from '../../store/TaskStore'
import { useVirtualScroll } from '../../hooks/useVirtualScroll'
import { USERS } from '../../data/users'
import { Badge } from '../Badge'
import { formatDate } from '../../utils/date'

const ROW_HEIGHT = 64

export function ListView({ tasks }: { tasks: Task[] }) {
  const { state, dispatch } = useTasks()
  const [scrollTop, setScrollTop] = useState(0)

  const sorted = useMemo(() => applySort(tasks, state.sort), [tasks, state.sort])

  const { sliced, topSpacer, bottomSpacer } = useVirtualScroll(
    sorted,
    scrollTop,
    520,
    ROW_HEIGHT,
  )

  return (
    <section>
      <div className="overflow-hidden rounded-[18px] border border-black/10 bg-white">
        <div className="grid grid-cols-[1.5fr_1fr_1fr] gap-3 bg-slate-100 px-4 py-3 font-semibold sm:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
          <button
            type="button"
            onClick={() =>
              dispatch({
                type: 'setSort',
                sort: {
                  key: 'title',
                  direction:
                    state.sort.key === 'title' && state.sort.direction === 'asc'
                      ? 'desc'
                      : 'asc',
                },
              })
            }
          >
            Title
          </button>
          <button
            type="button"
            onClick={() =>
              dispatch({
                type: 'setSort',
                sort: {
                  key: 'priority',
                  direction:
                    state.sort.key === 'priority' &&
                    state.sort.direction === 'asc'
                      ? 'desc'
                      : 'asc',
                },
              })
            }
          >
            Priority
          </button>
          <button
            type="button"
            onClick={() =>
              dispatch({
                type: 'setSort',
                sort: {
                  key: 'dueDate',
                  direction:
                    state.sort.key === 'dueDate' && state.sort.direction === 'asc'
                      ? 'desc'
                      : 'asc',
                },
              })
            }
          >
            Due Date
          </button>
          <span className="hidden sm:block">Status</span>
          <span className="hidden sm:block">Assignee</span>
        </div>

        <div
          className="max-h-[520px] overflow-auto"
          onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
        >
          <div style={{ height: topSpacer }} />
          {sliced.map((task) => {
            const assignee = USERS.find((user) => user.id === task.assigneeId)
            return (
              <div
                className="grid grid-cols-[1.5fr_1fr_1fr] items-center gap-3 border-b border-black/5 px-4 sm:grid-cols-[2fr_1fr_1fr_1fr_1fr]"
                key={task.id}
                style={{ height: ROW_HEIGHT }}
              >
                <div className="flex items-center gap-2 text-sm font-semibold">
                  {task.title}
                </div>
                <div className="flex items-center gap-2 text-sm">
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
                <div className="text-sm">{formatDate(task.dueDate)}</div>
                <div className="hidden sm:flex sm:items-center sm:gap-2">
                  <select
                    value={task.status}
                    onChange={(event) =>
                      dispatch({
                        type: 'updateStatus',
                        taskId: task.id,
                        status: event.target.value as Status,
                      })
                    }
                    className="cursor-pointer appearance-none rounded-[10px] border border-black/20 bg-white px-3 py-1.5 text-[13px] shadow-none outline-none"
                  >
                    <option value="todo">To Do</option>
                    <option value="inprogress">In Progress</option>
                    <option value="review">In Review</option>
                    <option value="done">Done</option>
                  </select>
                </div>
                <div className="hidden sm:flex sm:items-center sm:gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-semibold text-white"
                      style={{ backgroundColor: assignee?.color }}
                    >
                      {assignee?.initials}
                    </div>
                    <span>{assignee?.name}</span>
                  </div>
                </div>
              </div>
            )
          })}
          <div style={{ height: bottomSpacer }} />
        </div>
      </div>
    </section>
  )
}





