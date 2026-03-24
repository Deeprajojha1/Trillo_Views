// Small pill badge.
export function Badge({ label, tone }: { label: string; tone: 'neutral' | 'danger' | 'warning' | 'success' }) {
  return <span className={`badge badge-${tone}`}>{label}</span>
}
