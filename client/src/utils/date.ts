// Date helpers used across views.
export const MS_PER_DAY = 24 * 60 * 60 * 1000

export function toDateOnly(value: string | Date): Date {
  const d = typeof value === 'string' ? new Date(value) : value
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

export function formatDate(value: string | Date): string {
  const d = typeof value === 'string' ? new Date(value) : value
  return d.toLocaleDateString(undefined, {
    month: 'short',
    day: '2-digit',
  })
}

export function formatFullDate(value: string | Date): string {
  const d = typeof value === 'string' ? new Date(value) : value
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })
}

export function addDays(value: Date, days: number): Date {
  return new Date(value.getTime() + days * MS_PER_DAY)
}

export function diffDays(from: Date, to: Date): number {
  const a = toDateOnly(from).getTime()
  const b = toDateOnly(to).getTime()
  return Math.round((b - a) / MS_PER_DAY)
}

export function isSameDay(a: Date, b: Date): boolean {
  return toDateOnly(a).getTime() === toDateOnly(b).getTime()
}
