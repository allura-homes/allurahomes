"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

interface Phase {
  name: string
  color: string
  phase_order: number
}

interface Property {
  id: number
  name: string
  current_phase_name: string | null
  completed_tasks: number
  total_tasks: number
}

export default function PipelinePage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [phases, setPhases] = useState<Phase[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPipeline()
  }, [])

  const fetchPipeline = async () => {
    try {
      const token = localStorage.getItem('command_session')
      const res = await fetch("/api/admin/pipeline", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        credentials: "include",
      })
      if (res.ok) {
        const data = await res.json()
        setProperties(data.properties || [])
        setPhases(data.phases || [])
      }
    } catch (error) {
      console.error("Failed to fetch pipeline:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Group properties by current phase
  const propertiesByPhase = phases.map((phase) => ({
    ...phase,
    properties: properties.filter((p) => p.current_phase_name === phase.name),
  }))

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-pulse text-slate-500">Loading pipeline...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Pipeline</h1>
        <p className="text-slate-600">Track properties through the onboarding process</p>
      </div>

      {properties.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-slate-500">No properties currently in onboarding</p>
            <Link href="/admin/properties/new" className="mt-4 text-blue-600 hover:underline">
              Add a new property
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-4">
          {propertiesByPhase.map((phase) => (
            <div key={phase.name} className="space-y-4">
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: phase.color }}
                />
                <h2 className="font-semibold text-slate-900">{phase.name}</h2>
                <Badge variant="secondary" className="ml-auto">
                  {phase.properties.length}
                </Badge>
              </div>

              <div className="space-y-3">
                {phase.properties.map((property) => {
                  const progress = property.total_tasks > 0
                    ? Math.round((property.completed_tasks / property.total_tasks) * 100)
                    : 0

                  return (
                    <Link key={property.id} href={`/admin/properties/${property.id}`}>
                      <Card className="transition-shadow hover:shadow-md">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">
                            {property.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-2">
                            <Progress value={progress} className="h-1.5" />
                            <div className="flex items-center justify-between text-xs text-slate-500">
                              <span>{property.completed_tasks}/{property.total_tasks} tasks</span>
                              <span>{progress}%</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  )
                })}

                {phase.properties.length === 0 && (
                  <div className="rounded-lg border-2 border-dashed border-slate-200 p-4 text-center text-sm text-slate-400">
                    No properties
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
