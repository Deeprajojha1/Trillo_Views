// Reusable empty state.
export function EmptyState({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      <p>{subtitle}</p>
    </div>
  )
}
