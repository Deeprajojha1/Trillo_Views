// Task data generator.
import { addDays, formatFullDate } from '../utils/date'
import { USERS } from './users'

export type Status = 'todo' | 'inprogress' | 'review' | 'done'
export type Priority = 'low' | 'medium' | 'high'

export type Task = {
  id: string
  title: string
  status: Status
  priority: Priority
  assigneeId: string
  dueDate: string
  startDate?: string
  endDate?: string
  order: number
}

const STATUSES: Status[] = ['todo', 'inprogress', 'review', 'done']
const PRIORITIES: Priority[] = ['low', 'medium', 'high']

const titles = [
  'Design login screen',
  'Write API contract',
  'Fix navbar spacing',
  'Implement filter logic',
  'Create onboarding flow',
  'Add analytics event',
  'Refactor task card',
  'Build timeline grid',
  'Review PR #42',
  'Update dashboard KPI',
  'Write unit tests',
  'Update docs',
  'Polish empty states',
  'Optimize list view',
  'Set up release notes',
]

function pseudoRandom(seed: number) {
  let value = seed % 2147483647
  return () => {
    value = (value * 16807) % 2147483647
    return (value - 1) / 2147483646
  }
}

export function generateTasks(count = 520): Task[] {
  const rand = pseudoRandom(42)
  const today = new Date()
  const tasks: Task[] = []

  for (let i = 0; i < count; i += 1) {
    const status = STATUSES[i % STATUSES.length]
    const priority = PRIORITIES[Math.floor(rand() * PRIORITIES.length)]
    const assignee = USERS[Math.floor(rand() * USERS.length)]
    const dueOffset = Math.floor(rand() * 40) - 10
    const dueDate = addDays(today, dueOffset)

    const startOffset = Math.floor(rand() * 20) - 5
    const duration = Math.floor(rand() * 10) + 1
    const hasStart = rand() > 0.2
    const startDate = hasStart ? addDays(today, startOffset) : undefined
    const endDate = startDate ? addDays(startDate, duration) : undefined

    tasks.push({
      id: `task-${i + 1}`,
      title: `${titles[i % titles.length]} ${i + 1}`,
      status,
      priority,
      assigneeId: assignee.id,
      dueDate: dueDate.toISOString(),
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
      order: i,
    })
  }

  return tasks
}

export function formatTaskDates(task: Task): string {
  return `Due ${formatFullDate(task.dueDate)}`
}
