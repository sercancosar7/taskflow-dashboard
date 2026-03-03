import { Calendar, GripVertical } from 'lucide-react'
import { clsx } from 'clsx'
import type { Task } from '../types'

const priorityStyles = {
  urgent: 'bg-red-500/10 text-red-400 border-red-500/20',
  high: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  medium: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  low: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
}

interface TaskCardProps {
  task: Task
  showDragHandle?: boolean
}

export default function TaskCard({ task, showDragHandle = false }: TaskCardProps) {
  const isOverdue = task.status !== 'done' && new Date(task.dueDate) < new Date()

  return (
    <div className="task-card bg-gray-800 border border-gray-700/50 rounded-lg p-4 cursor-pointer hover:border-gray-600">
      <div className="flex items-start gap-2">
        {showDragHandle && (
          <GripVertical size={16} className="text-gray-600 mt-0.5 flex-shrink-0 cursor-grab" />
        )}
        <div className="flex-1 min-w-0">
          {/* Priority badge */}
          <span className={clsx(
            'inline-block text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded border mb-2',
            priorityStyles[task.priority]
          )}>
            {task.priority}
          </span>

          <h4 className="text-sm font-medium text-gray-200 mb-1 truncate">
            {task.title}
          </h4>
          <p className="text-xs text-gray-500 mb-3 line-clamp-2">
            {task.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {task.tags.map(tag => (
              <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-gray-700/50 text-gray-400 rounded">
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Calendar size={12} />
              <span className={isOverdue ? 'text-red-400' : ''}>
                {formatDate(task.dueDate)}
              </span>
            </div>
            <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-300" title={task.assignee.name}>
              {task.assignee.avatar}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
