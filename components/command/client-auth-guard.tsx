"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

interface User {
  id: number
  email: string
  name: string
  role: string
}

interface ClientAuthGuardProps {
  children: (user: User) => React.ReactNode
}

export function ClientAuthGuard({ children }: ClientAuthGuardProps) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function checkAuth() {
      try {
        // Get token from localStorage
        const token = localStorage.getItem('command_session')
        
        const res = await fetch('/api/admin/auth/me', {
          credentials: 'include',
          headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        })
        
        if (res.ok) {
          const data = await res.json()
          if (data.user) {
            setUser(data.user)
            setIsLoading(false)
            return
          }
        }
        
        // Not authenticated - redirect to login
        router.replace('/admin/login')
      } catch {
        router.replace('/admin/login')
      }
    }
    
    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children(user)}</>
}
