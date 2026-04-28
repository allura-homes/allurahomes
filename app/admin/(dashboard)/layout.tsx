import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/command/auth"
import { CommandSidebar } from "@/components/command/sidebar"
import { CommandHeader } from "@/components/command/header"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect("/admin/login")
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <CommandSidebar user={user} />
      <div className="flex flex-1 flex-col pl-64">
        <CommandHeader user={user} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
