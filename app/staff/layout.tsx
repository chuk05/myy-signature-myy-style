// /app/staff/layout.tsx - CREATE THIS FILE IF IT DOESN'T EXIST
import RouteGuard from '@/components/auth/RouteGuard'

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RouteGuard requiredRole="staff">
      {children}
    </RouteGuard>
  )
}