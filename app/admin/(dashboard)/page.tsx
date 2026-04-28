import { sql } from "@/lib/db"
import { getCurrentUser } from "@/lib/command/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, CheckCircle2, Clock, Users } from "lucide-react"
import Link from "next/link"

async function getDashboardStats() {
  const [properties] = await sql`
    SELECT 
      COUNT(*) FILTER (WHERE status = 'onboarding') as onboarding,
      COUNT(*) FILTER (WHERE status = 'active') as active,
      COUNT(*) as total
    FROM command_properties
  `
  
  const [tasks] = await sql`
    SELECT 
      COUNT(*) FILTER (WHERE status = 'pending') as pending,
      COUNT(*) FILTER (WHERE status = 'in_progress') as in_progress,
      COUNT(*) FILTER (WHERE status = 'completed') as completed,
      COUNT(*) as total
    FROM command_tasks
  `
  
  const [leads] = await sql`
    SELECT COUNT(*) as total FROM command_leads WHERE status = 'new'
  `
  
  return {
    properties: {
      onboarding: Number(properties.onboarding) || 0,
      active: Number(properties.active) || 0,
      total: Number(properties.total) || 0,
    },
    tasks: {
      pending: Number(tasks.pending) || 0,
      in_progress: Number(tasks.in_progress) || 0,
      completed: Number(tasks.completed) || 0,
      total: Number(tasks.total) || 0,
    },
    newLeads: Number(leads.total) || 0,
  }
}

async function getRecentActivity() {
  const activity = await sql`
    SELECT 
      a.id,
      a.action,
      a.details,
      a.created_at,
      u.name as user_name,
      p.name as property_name
    FROM command_activity a
    LEFT JOIN command_users u ON a.user_id = u.id
    LEFT JOIN command_properties p ON a.property_id = p.id
    ORDER BY a.created_at DESC
    LIMIT 10
  `
  return activity
}

async function getMyTasks(userId: number) {
  const tasks = await sql`
    SELECT 
      t.id,
      t.title,
      t.status,
      t.due_date,
      p.name as property_name,
      ph.name as phase_name,
      ph.color as phase_color
    FROM command_tasks t
    JOIN command_properties p ON t.property_id = p.id
    JOIN command_phases ph ON t.phase_id = ph.id
    WHERE t.assignee_id = ${userId}
      AND t.status != 'completed'
    ORDER BY t.due_date ASC NULLS LAST
    LIMIT 5
  `
  return tasks
}

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) return null
  
  const [stats, activity, myTasks] = await Promise.all([
    getDashboardStats(),
    getRecentActivity(),
    getMyTasks(user.id),
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600">Welcome back, {user.name}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Properties Onboarding</CardTitle>
            <Building2 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.properties.onboarding}</div>
            <p className="text-xs text-slate-500">
              {stats.properties.total} total properties
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Properties</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.properties.active}</div>
            <p className="text-xs text-slate-500">
              Fully onboarded
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.tasks.pending + stats.tasks.in_progress}</div>
            <p className="text-xs text-slate-500">
              {stats.tasks.completed} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">New Leads</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newLeads}</div>
            <p className="text-xs text-slate-500">
              Awaiting follow-up
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* My Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>My Tasks</CardTitle>
            <CardDescription>Your upcoming tasks</CardDescription>
          </CardHeader>
          <CardContent>
            {myTasks.length === 0 ? (
              <p className="text-sm text-slate-500">No pending tasks</p>
            ) : (
              <div className="space-y-3">
                {myTasks.map((task: any) => (
                  <Link
                    key={task.id}
                    href={`/admin/properties/${task.property_id}`}
                    className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: task.phase_color }}
                      />
                      <div>
                        <p className="font-medium text-slate-900">{task.title}</p>
                        <p className="text-sm text-slate-500">{task.property_name}</p>
                      </div>
                    </div>
                    {task.due_date && (
                      <span className="text-sm text-slate-500">
                        {new Date(task.due_date).toLocaleDateString()}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates across all properties</CardDescription>
          </CardHeader>
          <CardContent>
            {activity.length === 0 ? (
              <p className="text-sm text-slate-500">No recent activity</p>
            ) : (
              <div className="space-y-3">
                {activity.map((item: any) => (
                  <div key={item.id} className="flex items-start gap-3 text-sm">
                    <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                    <div className="flex-1">
                      <p className="text-slate-900">
                        <span className="font-medium">{item.user_name || 'System'}</span>{' '}
                        {item.action}
                        {item.property_name && (
                          <span className="text-slate-500"> on {item.property_name}</span>
                        )}
                      </p>
                      <p className="text-xs text-slate-500">
                        {new Date(item.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
