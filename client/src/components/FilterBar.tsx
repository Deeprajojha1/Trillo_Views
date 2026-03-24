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
    <section className="flex flex-wrap items-end gap-4 rounded-2xl border border-black/10 bg-white p-4">
      <div className="flex items-center gap-3">
        <label className="flex flex-col gap-1.5 text-[13px] text-slate-500">
          Status
          <select
            value={filters.status}
            onChange={(event) =>
              onChange({ status: event.target.value as Filters['status'] })
            }
            className="rounded-[10px] border border-black/15 px-3 py-1.5"
          >
            <option value="all">All</option>
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="review">In Review</option>
            <option value="done">Done</option>
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-[13px] text-slate-500">
          Priority
          <select
            value={filters.priority}
            onChange={(event) =>
              onChange({
                priority: event.target.value as Filters['priority'],
              })
            }
            className="rounded-[10px] border border-black/15 px-3 py-1.5"
          >
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-[13px] text-slate-500">
          Assignee
          <select
            value={filters.assigneeId}
            onChange={(event) =>
              onChange({ assigneeId: event.target.value as string })
            }
            className="rounded-[10px] border border-black/15 px-3 py-1.5"
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
      <div className="flex items-center gap-3">
        <label className="flex flex-col gap-1.5 text-[13px] text-slate-500">
          From
          <input
            type="date"
            value={filters.from ?? ''}
            onChange={(event) => onChange({ from: event.target.value })}
            className="rounded-[10px] border border-black/15 px-3 py-1.5"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-[13px] text-slate-500">
          To
          <input
            type="date"
            value={filters.to ?? ''}
            onChange={(event) => onChange({ to: event.target.value })}
            className="rounded-[10px] border border-black/15 px-3 py-1.5"
          />
        </label>
        <button
          className="mt-1.5 inline-flex items-center gap-2 rounded-[10px] border border-dashed border-black/20 bg-transparent px-3 py-2"
          type="button"
          onClick={onClear}
        >
          <span className="inline-flex h-4 w-4" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="h-4 w-4">
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



