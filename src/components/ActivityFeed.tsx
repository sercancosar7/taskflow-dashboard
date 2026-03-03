import type { Activity } from '../types'

interface ActivityFeedProps {
  items: Activity[]
  limit?: number
}

export default function ActivityFeed({ items, limit }: ActivityFeedProps) {
  const visible = limit ? items.slice(0, limit) : items

  return (
    <div className="space-y-3">
      {visible.map(item => (
        <div key={item.id} className="flex items-start gap-3 py-2">
          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-300 flex-shrink-0">
            {item.user.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-300">
              <span className="font-medium text-gray-200">{item.user.name}</span>
              {' '}
              <span className="text-gray-500">{item.action}</span>
              {' '}
              <span className="text-gray-300">{item.target}</span>
            </p>
            <p className="text-xs text-gray-600 mt-0.5">{item.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
