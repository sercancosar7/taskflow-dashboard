import { useState } from 'react'
import { Plus, MoreHorizontal } from 'lucide-react'
import { clsx } from 'clsx'
import TaskCard from '../components/TaskCard'
import { tasks as allTasks } from '../data/mockData'
import type { Task, TaskStatus } from '../types'

interface Column {
  id: TaskStatus
  title: string
  color: string
}

const columns: Column[] = [
  { id: 'todo', title: 'To Do', color: 'bg-gray-500' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-blue-500' },
  { id: 'done', title: 'Done', color: 'bg-emerald-500' },
]

export default function KanbanPage() {
  // In a real app this would be in a store or context
  const [tasks, setTasks] = useState<Task[]>(allTasks)
  const [draggedTask, setDraggedTask] = useState<string | null>(null)

  const getColumnTasks = (status: TaskStatus) =>
    tasks.filter(t => t.status === status)

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (status: TaskStatus) => {
    if (!draggedTask) return

    setTasks(prev =>
      prev.map(t =>
        t.id === draggedTask ? { ...t, status } : t
      )
    )
    setDraggedTask(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">
          {tasks.length} tasks across {columns.length} columns
        </p>
        {/* TODO: wire up the add task modal */}
        <button className="flex items-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors">
          <Plus size={16} />
          Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {columns.map(col => {
          const colTasks = getColumnTasks(col.id)
          return (
            <div
              key={col.id}
              className="kanban-col"
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(col.id)}
            >
              {/* Column header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={clsx('w-2.5 h-2.5 rounded-full', col.color)} />
                  <h3 className="text-sm font-medium text-gray-200">{col.title}</h3>
                  <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">
                    {colTasks.length}
                  </span>
                </div>
                <button className="text-gray-500 hover:text-gray-300">
                  <MoreHorizontal size={16} />
                </button>
              </div>

              {/* Cards */}
              <div className="space-y-3">
                {colTasks.map(task => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => handleDragStart(task.id)}
                    className={clsx(
                      'transition-opacity',
                      draggedTask === task.id && 'opacity-40'
                    )}
                  >
                    <TaskCard task={task} showDragHandle />
                  </div>
                ))}

                {colTasks.length === 0 && (
                  <div className="border-2 border-dashed border-gray-800 rounded-lg p-8 text-center">
                    <p className="text-sm text-gray-600">Drop tasks here</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
