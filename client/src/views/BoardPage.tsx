// Main board page and view switcher.
import { useEffect, useState } from 'react'
import { FilterBar } from '../components/FilterBar'
import { TopNav } from '../components/TopNav'
import { AvatarStack } from '../components/AvatarStack'
import { EmptyState } from '../components/EmptyState'
import { useTasks } from '../store/useTasks'
import { applyFilters, getStatusSummary } from '../store/TaskStore'
import { readFiltersFromUrl, useUrlFilters } from '../hooks/useUrlFilters'
import { KanbanView } from './KanbanView'
import { ListView } from '../components/list'
import { TimelineView } from '../components/timeline'

export function BoardPage() {
  const { state, dispatch } = useTasks()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const fromUrl = readFiltersFromUrl()
    if (Object.keys(fromUrl).length > 0) {
      dispatch({ type: 'setFilters', filters: fromUrl })
    }
    setReady(true)
  }, [dispatch])

  useUrlFilters(state.filters, ready)

  const filtered = applyFilters(state.tasks, state.filters)
  const summary = getStatusSummary(filtered)

  return (
    <div className="flex flex-col gap-5">
      <TopNav
        view={state.view}
        onChange={(view) => dispatch({ type: 'setView', view })}
      />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <AvatarStack ids={state.activeUsers} />
          <span className="text-sm text-slate-600">{state.liveMessage}</span>
        </div>
        <div className="flex flex-wrap gap-3 font-semibold">
          <span className="rounded-[10px] border border-black/10 bg-white px-2.5 py-1.5">
            {summary.total} tasks
          </span>
          <span
            className={`rounded-[10px] border border-black/10 bg-white px-2.5 py-1.5 ${
              summary.overdue ? 'text-red-700' : ''
            }`}
          >
            {summary.overdue} overdue
          </span>
          {summary.overdueWeek > 0 && (
            <span className="rounded-[10px] border border-black/10 bg-white px-2.5 py-1.5 text-amber-700">
              {summary.overdueWeek} overdue 7+ days
            </span>
          )}
        </div>
      </div>

      <FilterBar
        filters={state.filters}
        onChange={(filters) => dispatch({ type: 'setFilters', filters })}
        onClear={() =>
          dispatch({
            type: 'setFilters',
            filters: { status: 'all', priority: 'all', assigneeId: 'all', from: undefined, to: undefined },
          })
        }
      />

      {filtered.length === 0 ? (
        <EmptyState title="No tasks found" subtitle="Try clearing filters to see everything." />
      ) : state.view === 'kanban' ? (
        <KanbanView tasks={filtered} />
      ) : state.view === 'list' ? (
        <ListView tasks={filtered} />
      ) : (
        <TimelineView tasks={filtered} />
      )}
    </div>
  )
}






