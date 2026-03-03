import { useMemo } from 'react'
import { tasks } from '../data/mockData'

export function useTaskStats() {
  return useMemo(() => {
    const total = tasks.length
    const inProgress = tasks.filter(t => t.status === 'in-progress').length
    const completed = tasks.filter(t => t.status === 'done').length
    const todo = tasks.filter(t => t.status === 'todo').length

    // count overdue (due date in the past and not done)
    const now = new Date()
    const overdue = tasks.filter(t => {
      if (t.status === 'done') return false
      return new Date(t.dueDate) < now
    }).length

    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

    return { total, inProgress, completed, todo, overdue, completionRate }
  }, [])
}
