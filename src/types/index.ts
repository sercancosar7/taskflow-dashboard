export type Priority = 'low' | 'medium' | 'high' | 'urgent'
export type TaskStatus = 'todo' | 'in-progress' | 'done'

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: Priority
  assignee: TeamMember
  dueDate: string
  tags: string[]
  createdAt: string
}

export interface TeamMember {
  id: string
  name: string
  avatar: string // initials or image url
  role: string
}

export interface Activity {
  id: string
  user: TeamMember
  action: string
  target: string
  timestamp: string
}

export interface ChartDataPoint {
  name: string
  completed: number
  created: number
}

// TODO: add notification type when we wire up the bell icon
export type Page = 'dashboard' | 'kanban' | 'tasks' | 'analytics'
