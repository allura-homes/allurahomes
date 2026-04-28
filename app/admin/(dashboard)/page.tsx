"use client"

import { useEffect, useState } from "react"
import { useUser } from "@/components/command/user-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, CheckCircle2, Clock, Users, Loader2 } from "lucide-react"
import Link from "next/link"

interface DashboardData {
  stats: {
    properties: { onboarding: number; active: number; total: number }
    tasks: { pending: number; in_progress: number; completed: number; total: number }
    newLeads: number
  }
  myTasks: any[]
  activity: any[]
}

export default function DashboardPage() {
  const user = useUser()
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const token = localStorage.getItem('command_session')
        const res = await fetch('/api/admin/dashboard', {
          credentials: 'include',
          headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        })
        
        if (res.ok) {
          const dashboardData = await res.json()
          setData(dashboardData)
        }
      } catch (error) {
        console.error('Failed to fetch dashboard:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchDashboard()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    )
  }

  const stats = data?.stats || {
    properties: { onboarding: 0, active: 0, total: 0 },
    tasks: { pending: 0, in_progress: 0, completed: 0, total: 0 },
    newLeads: 0,
  }
  const myTasks = data?.myTasks || []
  const activity = data?.activity || []

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
                        style={{ backgroundColor: task.phase_color || '#94a3b8' }}
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
