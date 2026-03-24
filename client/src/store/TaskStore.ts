// Task types, reducer, and selectors.
import type { Task, Status, Priority } from '../data/tasks'
import { generateTasks } from '../data/tasks'
import { USERS } from '../data/users'
import { addDays, diffDays, toDateOnly } from '../utils/date'

export type Filters = {
  status: Status | 'all'
  priority: Priority | 'all'
  assigneeId: string | 'all'
  from?: string
  to?: string
}

export type SortKey = 'title' | 'priority' | 'dueDate'
export type SortDirection = 'asc' | 'desc'

export type SortState = {
  key: SortKey
  direction: SortDirection
}

export type ViewMode = 'kanban' | 'list' | 'timeline'

export type TaskState = {
  tasks: Task[]
  filters: Filters
  sort: SortState
  view: ViewMode
  activeUsers: string[]
  liveMessage: string
}

type Action =
  | { type: 'setView'; view: ViewMode }
  | { type: 'setFilters'; filters: Partial<Filters> }
  | { type: 'setSort'; sort: SortState }
  | { type: 'moveTask'; taskId: string; status: Status; index: number }
  | { type: 'updateStatus'; taskId: string; status: Status }
  | { type: 'setActiveUsers'; users: string[]; message: string }

export const initialState: TaskState = {
  tasks: generateTasks(),
  filters: {
    status: 'all',
    priority: 'all',
    assigneeId: 'all',
  },
  sort: {
    key: 'title',
    direction: 'asc',
  },
  view: 'kanban',
  activeUsers: USERS.map((user) => user.id).slice(0, 3),
  liveMessage: '3 people are viewing this board',
}

function updateOrders(tasks: Task[], status: Status): Task[] {
  const filtered = tasks
    .filter((task) => task.status === status)
    .sort((a, b) => a.order - b.order)
    .map((task, index) => ({ ...task, order: index }))

  return tasks.map((task) => {
    const updated = filtered.find((item) => item.id === task.id)
    return updated ?? task
  })
}

export function taskReducer(state: TaskState, action: Action): TaskState {
  switch (action.type) {
    case 'setView':
      return { ...state, view: action.view }
    case 'setFilters':
      return { ...state, filters: { ...state.filters, ...action.filters } }
    case 'setSort':
      return { ...state, sort: action.sort }
    case 'updateStatus':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.taskId ? { ...task, status: action.status } : task,
        ),
      }
    case 'moveTask': {
      const task = state.tasks.find((item) => item.id === action.taskId)
      if (!task) return state

      const without = state.tasks.filter((item) => item.id !== action.taskId)
      const sameStatus = without.filter((item) => item.status === action.status)
      const before = sameStatus.slice(0, action.index)
      const after = sameStatus.slice(action.index)
      const inserted: Task = {
        ...task,
        status: action.status,
        order: action.index,
      }

      const merged = [
        ...without.filter((item) => item.status !== action.status),
        ...before,
        inserted,
        ...after,
      ]

      return {
        ...state,
        tasks: updateOrders(updateOrders(merged, task.status), action.status),
      }
    }
    case 'setActiveUsers':
      return {
        ...state,
        activeUsers: action.users,
        liveMessage: action.message,
      }
    default:
      return state
  }
}

export type TaskAction = Action

export function applyFilters(tasks: Task[], filters: Filters) {
  return tasks.filter((task) => {
    if (filters.status !== 'all' && task.status !== filters.status) return false
    if (filters.priority !== 'all' && task.priority !== filters.priority)
      return false
    if (filters.assigneeId !== 'all' && task.assigneeId !== filters.assigneeId)
      return false
    if (filters.from) {
      const from = toDateOnly(new Date(filters.from))
      if (toDateOnly(new Date(task.dueDate)) < from) return false
    }
    if (filters.to) {
      const to = toDateOnly(new Date(filters.to))
      if (toDateOnly(new Date(task.dueDate)) > to) return false
    }
    return true
  })
}

export function applySort(tasks: Task[], sort: SortState) {
  const sorted = [...tasks]
  sorted.sort((a, b) => {
    if (sort.key === 'title') {
      return a.title.localeCompare(b.title)
    }
    if (sort.key === 'priority') {
      const rank = { high: 0, medium: 1, low: 2 }
      return rank[a.priority] - rank[b.priority]
    }
    const dateA = new Date(a.dueDate).getTime()
    const dateB = new Date(b.dueDate).getTime()
    return dateA - dateB
  })
  if (sort.direction === 'desc') return sorted.reverse()
  return sorted
}

export function getStatusSummary(tasks: Task[]) {
  const today = new Date()
  const overdue = tasks.filter(
    (task) => diffDays(today, new Date(task.dueDate)) < 0,
  )
  const overdueByWeek = overdue.filter(
    (task) => diffDays(today, new Date(task.dueDate)) <= -7,
  )

  return {
    total: tasks.length,
    overdue: overdue.length,
    overdueWeek: overdueByWeek.length,
  }
}

export function buildTimelineBounds(tasks: Task[]) {
  const today = new Date()
  const dates = tasks.flatMap((task) => {
    const list = []
    if (task.startDate) list.push(new Date(task.startDate))
    if (task.endDate) list.push(new Date(task.endDate))
    return list
  })

  const min = dates.length
    ? new Date(Math.min(...dates.map((d) => d.getTime())))
    : addDays(today, -7)
  const max = dates.length
    ? new Date(Math.max(...dates.map((d) => d.getTime())))
    : addDays(today, 14)

  return {
    start: addDays(min, -3),
    end: addDays(max, 3),
    today,
  }
}
