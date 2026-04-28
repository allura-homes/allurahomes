"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Subtask {
  id: number
  title: string
  completed: boolean
  subtask_order: number
}

interface Task {
  id: number
  title: string
  description: string | null
  status: string
  due_date: string | null
  assigned_to_name: string | null
  subtasks: Subtask[]
}

interface Phase {
  id: number
  name: string
  color: string
  phase_order: number
  tasks: Task[]
}

interface TaskListProps {
  phases: Phase[]
  propertyId: number
}

export function TaskList({ phases, propertyId }: TaskListProps) {
  const [expandedPhases, setExpandedPhases] = useState<number[]>(
    phases.filter(p => p.tasks.some(t => t.status !== 'completed')).map(p => p.id)
  )
  const [expandedTasks, setExpandedTasks] = useState<number[]>([])

  const togglePhase = (phaseId: number) => {
    setExpandedPhases(prev =>
      prev.includes(phaseId)
        ? prev.filter(id => id !== phaseId)
        : [...prev, phaseId]
    )
  }

  const toggleTask = (taskId: number) => {
    setExpandedTasks(prev =>
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    )
  }

  const handleSubtaskToggle = async (subtaskId: number, isCompleted: boolean) => {
    try {
      await fetch(`/api/admin/subtasks/${subtaskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: isCompleted }),
      })
      // Refresh the page to show updated state
      window.location.reload()
    } catch (error) {
      console.error('Failed to update subtask:', error)
    }
  }

  const handleTaskToggle = async (taskId: number, status: string) => {
    try {
      await fetch(`/api/admin/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      window.location.reload()
    } catch (error) {
      console.error('Failed to update task:', error)
    }
  }

  const getStatusBadge = (status: string) => {
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

  return (
    <div className="space-y-4">
      {phases.map((phase) => {
        const isExpanded = expandedPhases.includes(phase.id)
        const completedTasks = phase.tasks.filter(t => t.status === 'completed').length
        const totalTasks = phase.tasks.length

        return (
          <Card key={phase.id}>
            <CardHeader
              className="cursor-pointer"
              onClick={() => togglePhase(phase.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isExpanded ? (
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-slate-400" />
                  )}
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: phase.color }}
                  />
                  <CardTitle className="text-lg">{phase.name}</CardTitle>
                </div>
                <span className="text-sm text-slate-500">
                  {completedTasks}/{totalTasks} tasks
                </span>
              </div>
            </CardHeader>

            {isExpanded && (
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {phase.tasks.map((task) => {
                    const isTaskExpanded = expandedTasks.includes(task.id)
                    const hasSubtasks = task.subtasks.length > 0
                    const completedSubtasks = task.subtasks.filter(s => s.completed).length

                    return (
                      <div
                        key={task.id}
                        className={cn(
                          "rounded-lg border p-3",
                          task.status === 'completed' && "bg-slate-50 opacity-75"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          {!hasSubtasks && (
                            <Checkbox
                              checked={task.status === 'completed'}
                              onCheckedChange={(checked) =>
                                handleTaskToggle(task.id, checked ? 'completed' : 'pending')
                              }
                              className="mt-1"
                            />
                          )}
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div
                                className={cn(
                                  "cursor-pointer",
                                  hasSubtasks && "cursor-pointer"
                                )}
                                onClick={() => hasSubtasks && toggleTask(task.id)}
                              >
                                <div className="flex items-center gap-2">
                                  {hasSubtasks && (
                                    isTaskExpanded ? (
                                      <ChevronDown className="h-4 w-4 text-slate-400" />
                                    ) : (
                                      <ChevronRight className="h-4 w-4 text-slate-400" />
                                    )
                                  )}
                                  <span className={cn(
                                    "font-medium",
                                    task.status === 'completed' && "line-through text-slate-500"
                                  )}>
                                    {task.title}
                                  </span>
                                </div>
                                {task.description && (
                                  <p className="mt-1 text-sm text-slate-500 ml-6">
                                    {task.description}
                                  </p>
                                )}
                              </div>
                              
                              <div className="flex items-center gap-2">
                                {hasSubtasks && (
                                  <span className="text-xs text-slate-500">
                                    {completedSubtasks}/{task.subtasks.length}
                                  </span>
                                )}
                                {getStatusBadge(task.status)}
                              </div>
                            </div>

                            {/* Subtasks */}
                            {hasSubtasks && isTaskExpanded && (
                              <div className="mt-3 ml-6 space-y-2">
                                {task.subtasks.map((subtask) => (
                                  <div
                                    key={subtask.id}
                                    className="flex items-center gap-2"
                                  >
                                    <Checkbox
                                      checked={subtask.completed}
                                      onCheckedChange={(checked) =>
                                        handleSubtaskToggle(subtask.id, !!checked)
                                      }
                                      className="h-4 w-4"
                                    />
                                    <span className={cn(
                                      "text-sm",
                                      subtask.completed && "line-through text-slate-400"
                                    )}>
                                      {subtask.title}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            )}
          </Card>
        )
      })}
    </div>
  )
}
