import { ListTodo, TrendingUp, CheckCircle2, AlertTriangle } from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts'
import StatCard from '../components/StatCard'
import ActivityFeed from '../components/ActivityFeed'
import { useTaskStats } from '../hooks/useTaskStats'
import { activities, weeklyData } from '../data/mockData'

export default function DashboardPage() {
  const stats = useTaskStats()

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Tasks"
          value={stats.total}
          icon={ListTodo}
          change="+3 this week"
          changeType="up"
          color="blue"
        />
        <StatCard
          title="In Progress"
          value={stats.inProgress}
          icon={TrendingUp}
          change="2 started today"
          changeType="neutral"
          color="yellow"
        />
        <StatCard
          title="Completed"
          value={stats.completed}
          icon={CheckCircle2}
          change={`${stats.completionRate}% completion rate`}
          changeType="up"
          color="green"
        />
        <StatCard
          title="Overdue"
          value={stats.overdue}
          icon={AlertTriangle}
          change={stats.overdue > 0 ? 'Needs attention' : 'All on track'}
          changeType={stats.overdue > 0 ? 'down' : 'up'}
          color="red"
        />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-200">Task Activity</h3>
            <span className="text-xs text-gray-500">This week</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6b7280" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6b7280" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                  labelStyle={{ color: '#9ca3af' }}
                />
                <Area type="monotone" dataKey="completed" stroke="#3b82f6" fill="url(#colorCompleted)" strokeWidth={2} />
                <Area type="monotone" dataKey="created" stroke="#6b7280" fill="url(#colorCreated)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-6 mt-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-xs text-gray-400">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-500 rounded-full" />
              <span className="text-xs text-gray-400">Created</span>
            </div>
          </div>
        </div>

        {/* Activity */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
          <h3 className="text-sm font-medium text-gray-200 mb-4">Recent Activity</h3>
          <ActivityFeed items={activities} limit={6} />
        </div>
      </div>
    </div>
  )
}
