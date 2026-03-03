import {
  LayoutDashboard,
  Columns3,
  ListTodo,
  BarChart3,
  Settings,
  LogOut,
  CheckSquare,
} from 'lucide-react'
import { clsx } from 'clsx'
import type { Page } from '../types'

interface SidebarProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

const navItems: { icon: typeof LayoutDashboard; label: string; page: Page }[] = [
  { icon: LayoutDashboard, label: 'Dashboard', page: 'dashboard' },
  { icon: Columns3, label: 'Kanban Board', page: 'kanban' },
  { icon: ListTodo, label: 'Tasks', page: 'tasks' },
  { icon: BarChart3, label: 'Analytics', page: 'analytics' },
]

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-950 border-r border-gray-800 flex flex-col z-30">
      {/* Logo area */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-800">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
          <CheckSquare size={18} className="text-white" />
        </div>
        <span className="text-lg font-semibold text-white tracking-tight">
          TaskFlow
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(item => {
          const Icon = item.icon
          const active = currentPage === item.page
          return (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={clsx(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                active
                  ? 'bg-blue-500/10 text-blue-400'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
              )}
            >
              <Icon size={20} />
              {item.label}
            </button>
          )
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-3 py-4 border-t border-gray-800 space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 transition-colors">
          <Settings size={20} />
          Settings
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 transition-colors">
          <LogOut size={20} />
          Log out
        </button>
      </div>
    </aside>
  )
}
