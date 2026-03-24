// List view with virtual scrolling.
import { useMemo, useState } from 'react'
import type { Task, Status } from '../data/tasks'
import { useTasks } from '../store/useTasks'
import { applySort } from '../store/TaskStore'
import { useVirtualScroll } from '../hooks/useVirtualScroll'
import { USERS } from '../data/users'
import { Badge } from '../components/Badge'
import { formatDate } from '../utils/date'

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
    <section className="list-view">
      <div className="table">
        <div className="table-header">
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
          <span>Status</span>
          <span>Assignee</span>
        </div>

        <div
          className="table-body"
          onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
        >
          <div style={{ height: topSpacer }} />
          {sliced.map((task) => {
            const assignee = USERS.find((user) => user.id === task.assigneeId)
            return (
              <div className="table-row" key={task.id} style={{ height: ROW_HEIGHT }}>
                <div className="cell title">{task.title}</div>
                <div className="cell">
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
                <div className="cell">{formatDate(task.dueDate)}</div>
                <div className="cell">
                  <select
                    value={task.status}
                    onChange={(event) =>
                      dispatch({
                        type: 'updateStatus',
                        taskId: task.id,
                        status: event.target.value as Status,
                      })
                    }
                  >
                    <option value="todo">To Do</option>
                    <option value="inprogress">In Progress</option>
                    <option value="review">In Review</option>
                    <option value="done">Done</option>
                  </select>
                </div>
                <div className="cell">
                  <div className="assignee">
                    <div className="avatar" style={{ backgroundColor: assignee?.color }}>
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




