// Sync filters with the URL query string.
import { useEffect } from 'react'
import type { Filters } from '../store/TaskStore'

export function readFiltersFromUrl(): Partial<Filters> {
  const params = new URLSearchParams(window.location.search)
  const status = params.get('status')
  const priority = params.get('priority')
  const assigneeId = params.get('assignee')
  const from = params.get('from')
  const to = params.get('to')
  const filters: Partial<Filters> = {}
  if (status) filters.status = status as Filters['status']
  if (priority) filters.priority = priority as Filters['priority']
  if (assigneeId) filters.assigneeId = assigneeId
  if (from) filters.from = from
  if (to) filters.to = to

  return filters
}

export function useUrlFilters(filters: Filters, enabled = true) {
  useEffect(() => {
    if (!enabled) return
    const params = new URLSearchParams()
    if (filters.status !== 'all') params.set('status', filters.status)
    if (filters.priority !== 'all') params.set('priority', filters.priority)
    if (filters.assigneeId !== 'all') params.set('assignee', filters.assigneeId)
    if (filters.from) params.set('from', filters.from)
    if (filters.to) params.set('to', filters.to)

    const query = params.toString()
    const url = query ? `${window.location.pathname}?${query}` : window.location.pathname
    window.history.replaceState({}, '', url)
  }, [filters])
}



