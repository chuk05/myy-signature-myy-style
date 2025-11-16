// /app/admin/layout.tsx
import RouteGuard from '@/components/auth/RouteGuard'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RouteGuard requiredRole="staff">
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    </RouteGuard>
  )
}