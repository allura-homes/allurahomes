"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, Search, Building2, MapPin } from "lucide-react"

interface Property {
  id: number
  name: string
  address: string
  status: string
  current_phase_name: string | null
  current_phase_color: string | null
  completed_tasks: number
  total_tasks: number
  created_at: string
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    try {
      const res = await fetch("/api/admin/properties")
      if (res.ok) {
        const data = await res.json()
        setProperties(data.properties || [])
      }
    } catch (error) {
      console.error("Failed to fetch properties:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredProperties = properties.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.address.toLowerCase().includes(search.toLowerCase())
  )

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
        <div className="animate-pulse text-slate-500">Loading properties...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Properties</h1>
          <p className="text-slate-600">Manage your property portfolio</p>
        </div>
        <Link href="/admin/properties/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="Search properties..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Properties Grid */}
      {filteredProperties.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building2 className="h-12 w-12 text-slate-300" />
            <h3 className="mt-4 text-lg font-medium text-slate-900">No properties found</h3>
            <p className="mt-1 text-sm text-slate-500">
              {search ? "Try a different search term" : "Get started by adding your first property"}
            </p>
            {!search && (
              <Link href="/admin/properties/new" className="mt-4">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Property
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.map((property) => {
            const progress = property.total_tasks > 0
              ? Math.round((property.completed_tasks / property.total_tasks) * 100)
              : 0

            return (
              <Link key={property.id} href={`/admin/properties/${property.id}`}>
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{property.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" />
                          {property.address}
                        </CardDescription>
                      </div>
                      {getStatusBadge(property.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {property.status === "onboarding" && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">
                            {property.current_phase_name || "Getting started"}
                          </span>
                          <span className="font-medium">{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                        <p className="text-xs text-slate-500">
                          {property.completed_tasks} of {property.total_tasks} tasks complete
                        </p>
                      </div>
                    )}
                    {property.status === "active" && (
                      <p className="text-sm text-green-600">
                        Fully onboarded and active
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
