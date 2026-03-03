import { Search, Bell, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import type { Page } from '../types'

const pageTitles: Record<Page, string> = {
  dashboard: 'Dashboard',
  kanban: 'Kanban Board',
  tasks: 'Task List',
  analytics: 'Analytics',
}

interface TopBarProps {
  currentPage: Page
  searchQuery: string
  onSearchChange: (q: string) => void
}

export default function TopBar({ currentPage, searchQuery, onSearchChange }: TopBarProps) {
  const [showNotif, setShowNotif] = useState(false)

  return (
    <header className="h-16 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 flex items-center justify-between px-6 sticky top-0 z-20">
      <h1 className="text-lg font-semibold text-white">
        {pageTitles[currentPage]}
      </h1>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            className="w-64 pl-9 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40"
          />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotif(!showNotif)}
            className="relative p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full" />
          </button>

          {showNotif && (
            <div className="absolute right-0 top-12 w-72 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl p-4 space-y-3">
              <p className="text-sm font-medium text-gray-200">Notifications</p>
              <div className="text-xs text-gray-400 space-y-2">
                <p>Sophie completed "Audit third-party deps"</p>
                <p>James commented on your task</p>
                <p>New task assigned to you</p>
              </div>
            </div>
          )}
        </div>

        {/* User avatar */}
        <button className="flex items-center gap-2 hover:bg-gray-800 rounded-lg px-2 py-1.5 transition-colors">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
            SC
          </div>
          <span className="text-sm text-gray-300 hidden lg:block">Sercan</span>
          <ChevronDown size={14} className="text-gray-500" />
        </button>
      </div>
    </header>
  )
}
