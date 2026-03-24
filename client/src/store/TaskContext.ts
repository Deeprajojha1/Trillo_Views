// Context instance only.
import { createContext } from 'react'
import type { TaskState, TaskAction } from './TaskStore'

export const TaskContext = createContext<
  { state: TaskState; dispatch: React.Dispatch<TaskAction> } | undefined
>(undefined)
