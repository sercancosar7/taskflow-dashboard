import { clsx } from 'clsx'
import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: number | string
  icon: LucideIcon
  change?: string
  changeType?: 'up' | 'down' | 'neutral'
  color: string // tailwind color class like 'blue' or 'green'
}

export default function StatCard({ title, value, icon: Icon, change, changeType = 'neutral', color }: StatCardProps) {
  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400 mb-1">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
        <div className={clsx(
          'w-10 h-10 rounded-lg flex items-center justify-center',
          color === 'blue' && 'bg-blue-500/10 text-blue-400',
          color === 'green' && 'bg-emerald-500/10 text-emerald-400',
          color === 'yellow' && 'bg-amber-500/10 text-amber-400',
          color === 'red' && 'bg-red-500/10 text-red-400',
          color === 'purple' && 'bg-purple-500/10 text-purple-400',
        )}>
          <Icon size={20} />
        </div>
      </div>
      {change && (
        <p className={clsx(
          'text-xs mt-3',
          changeType === 'up' && 'text-emerald-400',
          changeType === 'down' && 'text-red-400',
          changeType === 'neutral' && 'text-gray-500',
        )}>
          {change}
        </p>
      )}
    </div>
  )
}
