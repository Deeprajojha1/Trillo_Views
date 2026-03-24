// Reusable empty state.
export function EmptyState({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="rounded-xl border border-dashed border-black/10 bg-[#fdf6ea] p-4 text-center">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-slate-600">{subtitle}</p>
    </div>
  )
}
