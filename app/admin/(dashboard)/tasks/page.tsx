"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

interface Subtask {
  id: number
  title: string
  completed: boolean
}

interface Task {
  id: number
  title: string
  description: string | null
  status: string
  due_date: string | null
  property_id: number
  property_name: string
  property_address: string
  phase_name: string
  phase_color: string
  subtasks: Subtask[]
}

function getStatusBadge(status: string) {
  switch (status) {
    case "pending":
      return <Badge variant="secondary" className="bg-slate-100 text-slate-700">Pending</Badge>
    case "in_progress":
      return <Badge variant="secondary" className="bg-blue-100 text-blue-700">In Progress</Badge>
    case "completed":
      return <Badge variant="secondary" className="bg-green-100 text-green-700">Completed</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('command_session')
      const res = await fetch("/api/admin/tasks", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        credentials: "include",
      })
      if (res.ok) {
        const data = await res.json()
        setTasks(data.tasks || [])
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const pendingTasks = tasks.filter((t) => t.status !== 'completed')
  const completedTasks = tasks.filter((t) => t.status === 'completed')

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-pulse text-slate-500">Loading tasks...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Tasks</h1>
        <p className="text-slate-600">Tasks assigned to you across all properties</p>
      </div>

      {/* Active Tasks */}
      <Card>
        <CardHeader>
          <CardTitle>Active Tasks</CardTitle>
          <CardDescription>{pendingTasks.length} tasks to complete</CardDescription>
        </CardHeader>
        <CardContent>
          {pendingTasks.length === 0 ? (
            <p className="text-sm text-slate-500">No active tasks. Great job!</p>
          ) : (
            <div className="space-y-4">
              {pendingTasks.map((task) => (
                <div key={task.id} className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div
                        className="mt-1 h-3 w-3 rounded-full"
                        style={{ backgroundColor: task.phase_color }}
                      />
                      <div>
                        <Link 
                          href={`/admin/properties/${task.property_id}`}
                          className="font-medium text-slate-900 hover:text-blue-600"
                        >
                          {task.title}
                        </Link>
                        <p className="text-sm text-slate-500">
                          {task.property_name} &middot; {task.phase_name}
                        </p>
                        {task.description && (
                          <p className="mt-1 text-sm text-slate-600">{task.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {task.due_date && (
                        <span className="text-sm text-slate-500">
                          Due {new Date(task.due_date).toLocaleDateString()}
                        </span>
                      )}
                      {getStatusBadge(task.status)}
                    </div>
                  </div>

                  {/* Subtasks */}
                  {task.subtasks.length > 0 && (
                    <div className="mt-3 ml-6 space-y-2">
                      {task.subtasks.map((subtask) => (
                        <div key={subtask.id} className="flex items-center gap-2">
                          <Checkbox 
                            checked={subtask.completed} 
                            disabled
                            className="h-4 w-4"
                          />
                          <span className={`text-sm ${subtask.completed ? 'text-slate-400 line-through' : 'text-slate-600'}`}>
                            {subtask.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Completed</CardTitle>
            <CardDescription>{completedTasks.length} tasks completed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {completedTasks.slice(0, 10).map((task) => (
                <div key={task.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: task.phase_color }}
                    />
                    <span className="text-slate-500 line-through">{task.title}</span>
                  </div>
                  <span className="text-sm text-slate-400">
                    {task.property_name}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
