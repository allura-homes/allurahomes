"use client"

import { useEffect, useState } from "react"
import { useParams, notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Bed, Bath, User, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { TaskList } from "@/components/command/task-list"

interface Property {
  id: number
  name: string
  address: string
  status: string
  bedrooms: number | null
  bathrooms: number | null
  owner_name: string | null
  owner_email: string | null
  owner_phone: string | null
  current_phase_name: string | null
  current_phase_color: string | null
  created_at: string
  phases: any[]
  completedTasks: number
  totalTasks: number
  progress: number
}

export default function PropertyDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [property, setProperty] = useState<Property | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notFoundError, setNotFoundError] = useState(false)

  useEffect(() => {
    if (id) {
      fetchProperty()
    }
  }, [id])

  const fetchProperty = async () => {
    try {
      const token = localStorage.getItem('command_session')
      const res = await fetch(`/api/admin/properties/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        credentials: "include",
      })
      if (res.status === 404) {
        setNotFoundError(true)
        return
      }
      if (res.ok) {
        const data = await res.json()
        setProperty(data.property)
      }
    } catch (error) {
      console.error("Failed to fetch property:", error)
    } finally {
      setIsLoading(false)
    }
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-pulse text-slate-500">Loading property...</div>
      </div>
    )
  }

  if (notFoundError || !property) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-2xl font-bold text-slate-900">Property Not Found</h1>
        <p className="mt-2 text-slate-600">The property you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/admin/properties" className="mt-4">
          <Button>Back to Properties</Button>
        </Link>
      </div>
    )
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
