// View switcher and heading.
import type { ViewMode } from '../store/TaskStore'

export function TopNav({
  view,
  onChange,
}: {
  view: ViewMode
  onChange: (view: ViewMode) => void
}) {
  return (
    <header className="top-nav">
      <div>
        <p className="eyebrow">Project Tracker</p>
        <h1>Frontend Engineering Stress Test</h1>
      </div>
      <div className="view-toggle">
        {(['kanban', 'list', 'timeline'] as ViewMode[]).map((mode) => (
          <button
            key={mode}
            className={view === mode ? 'active' : ''}
            onClick={() => onChange(mode)}
            type="button"
          >
            {mode === 'kanban'
              ? 'Kanban'
              : mode === 'list'
                ? 'List'
                : 'Timeline'}
          </button>
        ))}
      </div>
    </header>
  )
}



