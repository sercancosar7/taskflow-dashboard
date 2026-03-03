import { useState, useMemo } from 'react'
import { ArrowUpDown, Filter, ChevronDown } from 'lucide-react'
import { clsx } from 'clsx'
import { tasks } from '../data/mockData'
import type { Priority, TaskStatus } from '../types'

type SortField = 'title' | 'priority' | 'dueDate' | 'status'
type SortDir = 'asc' | 'desc'

const priorityWeight: Record<Priority, number> = {
  urgent: 4,
  high: 3,
  medium: 2,
  low: 1,
}

const statusLabels: Record<TaskStatus, string> = {
  'todo': 'To Do',
  'in-progress': 'In Progress',
  'done': 'Done',
}

const statusColors: Record<TaskStatus, string> = {
  'todo': 'bg-gray-500',
  'in-progress': 'bg-blue-500',
  'done': 'bg-emerald-500',
}

const priorityColors: Record<Priority, string> = {
  urgent: 'text-red-400',
  high: 'text-orange-400',
  medium: 'text-blue-400',
  low: 'text-gray-400',
}

interface TasksPageProps {
  searchQuery: string
}

export default function TasksPage({ searchQuery }: TasksPageProps) {
  const [sortField, setSortField] = useState<SortField>('dueDate')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [filterStatus, setFilterStatus] = useState<TaskStatus | 'all'>('all')
  const [filterPriority, setFilterPriority] = useState<Priority | 'all'>('all')
  const [showFilters, setShowFilters] = useState(false)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDir('asc')
    }
  }

  const filtered = useMemo(() => {
    let result = [...tasks]

    // search
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.includes(q))
      )
    }

    // status filter
    if (filterStatus !== 'all') {
      result = result.filter(t => t.status === filterStatus)
    }

    // priority filter
    if (filterPriority !== 'all') {
      result = result.filter(t => t.priority === filterPriority)
    }

    // sort
    result.sort((a, b) => {
      let cmp = 0
      switch (sortField) {
        case 'title':
          cmp = a.title.localeCompare(b.title)
          break
        case 'priority':
          cmp = priorityWeight[b.priority] - priorityWeight[a.priority]
          break
        case 'dueDate':
          cmp = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
          break
        case 'status':
          cmp = a.status.localeCompare(b.status)
          break
      }
      return sortDir === 'asc' ? cmp : -cmp
    })

    return result
  }, [searchQuery, filterStatus, filterPriority, sortField, sortDir])

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">
          {filtered.length} of {tasks.length} tasks
        </p>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={clsx(
            'flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors',
            showFilters
              ? 'bg-blue-500/10 text-blue-400'
              : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
          )}
        >
          <Filter size={16} />
          Filters
          <ChevronDown size={14} className={clsx('transition-transform', showFilters && 'rotate-180')} />
        </button>
      </div>

      {/* Filter bar */}
      {showFilters && (
        <div className="flex items-center gap-4 p-4 bg-gray-800/50 border border-gray-700/50 rounded-xl">
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-500">Status:</label>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value as TaskStatus | 'all')}
              className="bg-gray-700 border border-gray-600 rounded-md px-2 py-1 text-sm text-gray-200 focus:outline-none"
            >
              <option value="all">All</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-500">Priority:</label>
            <select
              value={filterPriority}
              onChange={e => setFilterPriority(e.target.value as Priority | 'all')}
              className="bg-gray-700 border border-gray-600 rounded-md px-2 py-1 text-sm text-gray-200 focus:outline-none"
            >
              <option value="all">All</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700/50">
              {[
                { field: 'title' as SortField, label: 'Task' },
                { field: 'status' as SortField, label: 'Status' },
                { field: 'priority' as SortField, label: 'Priority' },
                { field: 'dueDate' as SortField, label: 'Due Date' },
              ].map(col => (
                <th
                  key={col.field}
                  onClick={() => handleSort(col.field)}
                  className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-300 select-none"
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    <ArrowUpDown size={12} className={clsx(
                      sortField === col.field ? 'text-blue-400' : 'text-gray-600'
                    )} />
                  </div>
                </th>
              ))}
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assignee
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/30">
            {filtered.map(task => {
              const overdue = task.status !== 'done' && new Date(task.dueDate) < new Date()
              return (
                <tr key={task.id} className="hover:bg-gray-800/80 transition-colors">
                  <td className="px-5 py-3.5">
                    <div>
                      <p className="text-sm text-gray-200 font-medium">{task.title}</p>
                      <div className="flex gap-1 mt-1">
                        {task.tags.map(tag => (
                          <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-gray-700/50 text-gray-500 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className={clsx('w-2 h-2 rounded-full', statusColors[task.status])} />
                      <span className="text-sm text-gray-300">{statusLabels[task.status]}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={clsx('text-sm capitalize', priorityColors[task.priority])}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={clsx('text-sm', overdue ? 'text-red-400' : 'text-gray-400')}>
                      {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-300">
                        {task.assignee.avatar}
                      </div>
                      <span className="text-sm text-gray-400">{task.assignee.name}</span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="px-5 py-12 text-center">
            <p className="text-sm text-gray-500">No tasks match your filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
