// Small pill badge.
const TONE_CLASS: Record<
  'neutral' | 'danger' | 'warning' | 'success',
  string
> = {
  neutral: 'bg-slate-200 text-slate-900',
  warning: 'bg-amber-100 text-amber-800',
  danger: 'bg-red-100 text-red-700',
  success: 'bg-emerald-100 text-emerald-700',
}

export function Badge({
  label,
  tone,
}: {
  label: string
  tone: 'neutral' | 'danger' | 'warning' | 'success'
}) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] ${TONE_CLASS[tone]}`}
    >
      {label}
    </span>
  )
}
