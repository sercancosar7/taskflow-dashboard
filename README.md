# TaskFlow – Real-Time Task Management Dashboard

A modern, full-stack task management application with real-time collaboration features, Kanban boards, and team analytics.

🔗 **Live Demo:** [sercod.com/demos/taskflow](https://sercod.com/demos/taskflow/)

## Features

- 📋 **Kanban Board** – Drag-and-drop task management across customizable columns
- 👥 **Team Collaboration** – Real-time updates via Socket.io for seamless teamwork
- 📊 **Analytics Dashboard** – Track task activity, completion rates, and team performance
- 🔔 **Notifications** – Live alerts for task assignments and status changes
- 🔐 **Authentication** – Secure JWT-based user auth with role management
- 🌙 **Dark Mode** – Fully responsive UI with dark/light theme support

## Tech Stack

**Frontend**
- React 18 + TypeScript
- Tailwind CSS
- Socket.io Client
- Recharts (analytics)

**Backend**
- Node.js + Express
- PostgreSQL + Prisma ORM
- Socket.io
- JWT Authentication

## Getting Started

```bash
# Clone the repo
git clone https://github.com/sercancosar7/taskflow-dashboard.git
cd taskflow-dashboard

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run development server
npm run dev
```

## Screenshots

![TaskFlow Dashboard](https://sercod.com/demos/taskflow/)

## License

MIT
