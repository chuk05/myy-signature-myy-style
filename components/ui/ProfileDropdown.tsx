'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'
import { 
  User, 
  Settings, 
  LogOut, 
  ChevronDown, 
  Shield,
  Calendar,
  Users
} from 'lucide-react'

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { user, profile, staffProfile, signOut } = useAuth()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    setIsOpen(false)
  }

  if (!user || !profile) {
    return (
      <Link 
        href="/auth/login" 
        className="p-2 text-[#1A1A1A] hover:text-[#FFD700] transition-colors"
      >
        <User className="w-6 h-6" />
      </Link>
    )
  }

  const isStaff = profile.role === 'staff' || profile.role === 'admin'

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="relative w-8 h-8 rounded-full bg-[#FFD700] flex items-center justify-center">
          {profile.avatar_url ? (
            <Image
              src={profile.avatar_url}
              alt={profile.full_name || 'Profile'}
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
          ) : (
            <User className="w-4 h-4 text-[#1A1A1A]" />
          )}
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="font-semibold text-[#1A1A1A] truncate">
              {profile.full_name || profile.email}
            </p>
            <p className="text-sm text-gray-600 truncate">{profile.email}</p>
            {isStaff && (
              <div className="flex items-center space-x-1 mt-1">
                <Shield className="w-3 h-3 text-[#FFD700]" />
                <span className="text-xs text-[#FFD700] font-medium capitalize">
                  {profile.role}
                </span>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div className="py-2">
            <Link
              href="/profile"
              className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <User className="w-4 h-4" />
              <span>My Profile</span>
            </Link>

            {isStaff && (
              <>
                <Link
                  href="/admin"
                  className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Shield className="w-4 h-4" />
                  <span>Admin Dashboard</span>
                </Link>
                <Link
                  href="/staff/dashboard"
                  className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Staff Dashboard</span>
                </Link>
                {profile.role === 'admin' && (
                  <Link
                    href="/admin/staff"
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <Users className="w-4 h-4" />
                    <span>Manage Staff</span>
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Sign Out */}
          <div className="border-t border-gray-100 pt-2">
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}