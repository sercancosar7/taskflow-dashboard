import { useState } from 'react'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import DashboardPage from './pages/DashboardPage'
import KanbanPage from './pages/KanbanPage'
import TasksPage from './pages/TasksPage'
import AnalyticsPage from './pages/AnalyticsPage'
import type { Page } from './types'

export default function App() {
  const [page, setPage] = useState<Page>('dashboard')
  const [search, setSearch] = useState('')

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return <DashboardPage />
      case 'kanban':
        return <KanbanPage />
      case 'tasks':
        return <TasksPage searchQuery={search} />
      case 'analytics':
        return <AnalyticsPage />
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Sidebar currentPage={page} onNavigate={setPage} />

      <div className="ml-64">
        <TopBar
          currentPage={page}
          searchQuery={search}
          onSearchChange={setSearch}
        />

        <main className="p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}
