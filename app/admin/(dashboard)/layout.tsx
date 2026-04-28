"use client"

import { ClientAuthGuard } from "@/components/command/client-auth-guard"
import { CommandSidebar } from "@/components/command/sidebar"
import { CommandHeader } from "@/components/command/header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClientAuthGuard>
      {(user) => (
        <div className="flex min-h-screen bg-slate-50">
          <CommandSidebar user={user} />
          <div className="flex flex-1 flex-col pl-64">
            <CommandHeader user={user} />
            <main className="flex-1 p-6">
              {children}
            </main>
          </div>
        </div>
      )}
    </ClientAuthGuard>
  )
}
