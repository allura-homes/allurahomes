import { sql } from "@/lib/db"
import { getCurrentUser } from "@/lib/command/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

async function getMyTasks(userId: number) {
  const tasks = await sql`
    SELECT 
      t.*,
      p.name as property_name,
      p.address as property_address,
      ph.name as phase_name,
      ph.color as phase_color
    FROM command_tasks t
    JOIN command_properties p ON t.property_id = p.id
    JOIN command_phases ph ON t.phase_id = ph.id
    WHERE t.assignee_id = ${userId}
    ORDER BY 
      CASE t.status 
        WHEN 'in_progress' THEN 1 
        WHEN 'pending' THEN 2 
        WHEN 'completed' THEN 3 
      END,
      t.due_date ASC NULLS LAST
  `

  // Get subtasks
  const taskIds = tasks.map((t: any) => t.id)
  const subtasks = taskIds.length > 0 
    ? await sql`
        SELECT * FROM command_subtasks 
        WHERE task_id = ANY(${taskIds})
        ORDER BY subtask_order
      `
    : []

  return tasks.map((task: any) => ({
    ...task,
    subtasks: subtasks.filter((s: any) => s.task_id === task.id),
  }))
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

export default async function TasksPage() {
  const user = await getCurrentUser()
  if (!user) return null

  const tasks = await getMyTasks(user.id)
  
  const pendingTasks = tasks.filter((t: any) => t.status !== 'completed')
  const completedTasks = tasks.filter((t: any) => t.status === 'completed')

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
              {pendingTasks.map((task: any) => (
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
                      {task.subtasks.map((subtask: any) => (
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
              {completedTasks.slice(0, 10).map((task: any) => (
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
