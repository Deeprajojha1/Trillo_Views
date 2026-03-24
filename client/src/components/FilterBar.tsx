// Filter controls.
import type { Filters } from '../store/TaskStore'
import { USERS } from '../data/users'

export function FilterBar({
  filters,
  onChange,
  onClear,
}: {
  filters: Filters
  onChange: (filters: Partial<Filters>) => void
  onClear: () => void
}) {
  return (
    <section className="filters">
      <div className="filter-group">
        <label>
          Status
          <select
            value={filters.status}
            onChange={(event) =>
              onChange({ status: event.target.value as Filters['status'] })
            }
          >
            <option value="all">All</option>
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="review">In Review</option>
            <option value="done">Done</option>
          </select>
        </label>
        <label>
          Priority
          <select
            value={filters.priority}
            onChange={(event) =>
              onChange({
                priority: event.target.value as Filters['priority'],
              })
            }
          >
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </label>
        <label>
          Assignee
          <select
            value={filters.assigneeId}
            onChange={(event) =>
              onChange({ assigneeId: event.target.value as string })
            }
          >
            <option value="all">All</option>
            {USERS.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="filter-group">
        <label>
          From
          <input
            type="date"
            value={filters.from ?? ''}
            onChange={(event) => onChange({ from: event.target.value })}
          />
        </label>
        <label>
          To
          <input
            type="date"
            value={filters.to ?? ''}
            onChange={(event) => onChange({ to: event.target.value })}
          />
        </label>
        <button className="ghost" type="button" onClick={onClear}>
          <span className="icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path
                d="M5 6h14l-5.5 6.5V18l-3 1v-6.5L5 6z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          Clear filters
        </button>
      </div>
    </section>
  )
}



