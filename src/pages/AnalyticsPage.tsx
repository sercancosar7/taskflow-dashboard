import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell,
} from 'recharts'
import { TrendingUp, Clock, Target, Users } from 'lucide-react'
import {
  monthlyData, sprintBurndown, priorityDistribution, teamPerformance,
} from '../data/mockData'
import { useTaskStats } from '../hooks/useTaskStats'
import StatCard from '../components/StatCard'

const tooltipStyle = {
  backgroundColor: '#1f2937',
  border: '1px solid #374151',
  borderRadius: '8px',
  fontSize: '12px',
}

export default function AnalyticsPage() {
  const stats = useTaskStats()

  // velocity = completed tasks per week on avg
  const avgVelocity = Math.round(
    monthlyData.reduce((sum, w) => sum + w.completed, 0) / monthlyData.length
  )

  return (
    <div className="space-y-6">
      {/* Summary stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Avg. Velocity"
          value={`${avgVelocity}/wk`}
          icon={TrendingUp}
          change="+12% from last month"
          changeType="up"
          color="blue"
        />
        <StatCard
          title="Completion Rate"
          value={`${stats.completionRate}%`}
          icon={Target}
          color="green"
        />
        <StatCard
          title="Avg. Cycle Time"
          value="3.2 days"
          icon={Clock}
          change="-0.5 days from last sprint"
          changeType="up"
          color="purple"
        />
        <StatCard
          title="Team Members"
          value={5}
          icon={Users}
          color="yellow"
        />
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sprint burndown */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
          <h3 className="text-sm font-medium text-gray-200 mb-4">Sprint Burndown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sprintBurndown}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="day" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: '#9ca3af' }} />
                <Line type="monotone" dataKey="ideal" stroke="#374151" strokeDasharray="5 5" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="remaining" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-0.5 bg-blue-500" />
              <span className="text-xs text-gray-400">Actual</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-0.5 bg-gray-600 border-dashed" style={{ borderTop: '2px dashed #4b5563' }} />
              <span className="text-xs text-gray-400">Ideal</span>
            </div>
          </div>
        </div>

        {/* Priority dist */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
          <h3 className="text-sm font-medium text-gray-200 mb-4">Priority Distribution</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={priorityDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {priorityDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-4 mt-2">
            {priorityDistribution.map(p => (
              <div key={p.name} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                <span className="text-xs text-gray-400">{p.name} ({p.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly trend */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
          <h3 className="text-sm font-medium text-gray-200 mb-4">Monthly Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: '#9ca3af' }} />
                <Bar dataKey="completed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="created" fill="#374151" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Team performance */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
          <h3 className="text-sm font-medium text-gray-200 mb-4">Team Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teamPerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" horizontal={false} />
                <XAxis type="number" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: '#9ca3af', fontSize: 12 }} axisLine={false} tickLine={false} width={60} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: '#9ca3af' }} />
                <Bar dataKey="completed" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                <Bar dataKey="inProgress" stackId="a" fill="#3b82f6" />
                <Bar dataKey="todo" stackId="a" fill="#6b7280" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-4 mt-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-xs text-gray-400">Completed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span className="text-xs text-gray-400">In Progress</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-gray-500" />
              <span className="text-xs text-gray-400">To Do</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
