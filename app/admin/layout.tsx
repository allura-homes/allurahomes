import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Allura Command",
  description: "Property management dashboard for Allura Homes",
}

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
