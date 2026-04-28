import { sql } from "@/lib/db"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Bed, Bath, User, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { TaskList } from "@/components/command/task-list"

interface Props {
  params: Promise<{ id: string }>
}

async function getProperty(id: string) {
  const [property] = await sql`
    SELECT 
      p.*,
      ph.name as current_phase_name,
      ph.color as current_phase_color
    FROM command_properties p
    LEFT JOIN command_phases ph ON p.current_phase_id = ph.id
    WHERE p.id = ${parseInt(id)}
  `
  
  if (!property) return null

  // Get phases
  const phases = await sql`
    SELECT * FROM command_phases 
    WHERE property_id = ${id}
    ORDER BY phase_order
  `

  // Get tasks with subtasks
  const tasks = await sql`
    SELECT 
      t.*,
      ph.name as phase_name,
      ph.color as phase_color,
      u.name as assigned_to_name
    FROM command_tasks t
    JOIN command_phases ph ON t.phase_id = ph.id
    LEFT JOIN command_users u ON t.assigned_to = u.id
    WHERE t.property_id = ${id}
    ORDER BY ph.phase_order, t.task_order
  `

  // Get subtasks for all tasks
  const taskIds = tasks.map((t: any) => t.id)
  const subtasks = taskIds.length > 0 
    ? await sql`
        SELECT * FROM command_subtasks 
        WHERE task_id = ANY(${taskIds})
        ORDER BY subtask_order
      `
    : []

  // Attach subtasks to tasks
  const tasksWithSubtasks = tasks.map((task: any) => ({
    ...task,
    subtasks: subtasks.filter((s: any) => s.task_id === task.id),
  }))

  // Group tasks by phase
  const tasksByPhase = phases.map((phase: any) => ({
    ...phase,
    tasks: tasksWithSubtasks.filter((t: any) => t.phase_id === phase.id),
  }))

  // Calculate progress
  const completedTasks = tasks.filter((t: any) => t.status === 'completed').length
  const totalTasks = tasks.length
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return {
    ...property,
    phases: tasksByPhase,
    completedTasks,
    totalTasks,
    progress,
  }
}

export default async function PropertyDetailPage({ params }: Props) {
  const { id } = await params
  const property = await getProperty(id)

  if (!property) {
    notFound()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "onboarding":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-700">Onboarding</Badge>
      case "active":
        return <Badge variant="secondary" className="bg-green-100 text-green-700">Active</Badge>
      case "paused":
        return <Badge variant="secondary" className="bg-amber-100 text-amber-700">Paused</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/properties">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900">{property.name}</h1>
              {getStatusBadge(property.status)}
            </div>
            <p className="mt-1 flex items-center gap-1 text-slate-600">
              <MapPin className="h-4 w-4" />
              {property.address}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content - Tasks */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress */}
          {property.status === "onboarding" && (
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Onboarding Progress</CardTitle>
                  <span className="text-2xl font-bold">{property.progress}%</span>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={property.progress} className="h-3" />
                <p className="mt-2 text-sm text-slate-600">
                  {property.completedTasks} of {property.totalTasks} tasks complete
                </p>
              </CardContent>
            </Card>
          )}

          {/* Tasks by Phase */}
          <TaskList 
            phases={property.phases} 
            propertyId={property.id}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Property Details */}
          <Card>
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                {property.bedrooms && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Bed className="h-4 w-4" />
                    <span>{property.bedrooms} bed</span>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Bath className="h-4 w-4" />
                    <span>{property.bathrooms} bath</span>
                  </div>
                )}
              </div>
              <div className="text-sm text-slate-500">
                Added {new Date(property.created_at).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>

          {/* Owner Info */}
          <Card>
            <CardHeader>
              <CardTitle>Owner</CardTitle>
              <CardDescription>Property owner contact</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {property.owner_name && (
                <div className="flex items-center gap-2 text-slate-600">
                  <User className="h-4 w-4" />
                  <span>{property.owner_name}</span>
                </div>
              )}
              {property.owner_email && (
                <div className="flex items-center gap-2 text-slate-600">
                  <Mail className="h-4 w-4" />
                  <a href={`mailto:${property.owner_email}`} className="text-blue-600 hover:underline">
                    {property.owner_email}
                  </a>
                </div>
              )}
              {property.owner_phone && (
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone className="h-4 w-4" />
                  <a href={`tel:${property.owner_phone}`} className="text-blue-600 hover:underline">
                    {property.owner_phone}
                  </a>
                </div>
              )}
              {!property.owner_name && !property.owner_email && !property.owner_phone && (
                <p className="text-sm text-slate-500">No owner information</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
