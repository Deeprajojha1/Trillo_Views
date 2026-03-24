// Context provider and live simulation.
import { useEffect, useMemo, useReducer, useRef } from 'react'
import type { ReactNode } from 'react'
import { USERS } from '../data/users'
import type { Status } from '../data/tasks'
import { initialState, taskReducer } from './TaskStore'
import { TaskContext } from './TaskContext'

export function TaskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialState)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (timerRef.current) return

    timerRef.current = window.setInterval(() => {
      const randomTask =
        state.tasks[Math.floor(Math.random() * state.tasks.length)]
      const nextStatus: Status =
        randomTask.status === 'done'
          ? 'review'
          : randomTask.status === 'review'
            ? 'done'
            : randomTask.status === 'todo'
              ? 'inprogress'
              : 'review'

      const viewerCount = 2 + Math.floor(Math.random() * 3)
      const activeUsers = USERS.map((user) => user.id).slice(0, viewerCount)
      dispatch({
        type: 'setActiveUsers',
        users: activeUsers,
        message: `${viewerCount} people are viewing this board`,
      })

      dispatch({
        type: 'moveTask',
        taskId: randomTask.id,
        status: nextStatus,
        index: 0,
      })
    }, 6500)

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [state.tasks])

  const value = useMemo(() => ({ state, dispatch }), [state])

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}
