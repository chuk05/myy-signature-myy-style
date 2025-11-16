// /components/auth/RouteGuard.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

interface RouteGuardProps {
  children: React.ReactNode
  requiredRole?: 'staff' | 'admin'
}

export default function RouteGuard({ children, requiredRole }: RouteGuardProps) {
  const { user, profile, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      // Redirect to login if not authenticated
      if (!user) {
        router.push('/auth/login')
        return
      }

      // Check role if required
      if (requiredRole && profile?.role !== requiredRole && profile?.role !== 'admin') {
        router.push('/')
        return
      }
    }
  }, [user, profile, isLoading, requiredRole, router])

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFD700]"></div>
      </div>
    )
  }

  // Show nothing if not authenticated (will redirect)
  if (!user) {
    return null
  }

  // Check role access
  if (requiredRole && profile?.role !== requiredRole && profile?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
          <p className="mt-2 text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}