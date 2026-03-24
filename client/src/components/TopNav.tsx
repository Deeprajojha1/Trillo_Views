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
    <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.12em] text-[#7a6f61]">
          Project Tracker
        </p>
        <h1 className="mt-1 font-['Space_Grotesk'] text-[28px]">
          Frontend Engineering Stress Test
        </h1>
      </div>
      <div className="flex gap-1 rounded-[14px] bg-white p-1 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]">
        {(['kanban', 'list', 'timeline'] as ViewMode[]).map((mode) => (
          <button
            key={mode}
            className={`rounded-[10px] px-4 py-2 font-semibold ${
              view === mode ? 'bg-[#111827] text-white' : 'text-[#111827]'
            }`}
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



