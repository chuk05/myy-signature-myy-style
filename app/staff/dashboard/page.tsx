// /app/staff/dashboard/page.tsx
'use client'

import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { 
  Calendar, 
  Users, 
  Scissors, 
  DollarSign, 
  TrendingUp,
  Clock
} from 'lucide-react'

export default function StaffDashboard() {
  const { profile, staffProfile } = useAuth()

  if (!profile || (profile.role !== 'staff' && profile.role !== 'admin')) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            <p>Access denied. Staff privileges required.</p>
          </div>
        </div>
      </div>
    )
  }

  const stats = [
    { label: 'Today&apos;s Appointments', value: '8', icon: Calendar, color: 'bg-blue-500' },
    { label: 'Weekly Earnings', value: '$1,240', icon: DollarSign, color: 'bg-green-500' },
    { label: 'Client Satisfaction', value: '98%', icon: TrendingUp, color: 'bg-purple-500' },
    { label: 'Hours This Week', value: '32', icon: Clock, color: 'bg-orange-500' },
  ]

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1A1A1A]">Staff Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {profile.full_name || 'Staff Member'}! Here&apos;s your overview.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-[#1A1A1A] mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-full`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">Today&apos;s Schedule</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">Sarah Johnson</p>
                    <p className="text-sm text-gray-600">Haircut & Color</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[#1A1A1A]">2:00 PM</p>
                    <p className="text-sm text-gray-600">1h 30m</p>
                  </div>
                </div>
              ))}
            </div>
            <Link 
              href="/admin/appointments"
              className="block text-center mt-4 bg-[#FFD700] text-[#1A1A1A] py-2 rounded-lg font-semibold hover:bg-[#B39700] transition-colors"
            >
              View All Appointments
            </Link>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link 
                href="/admin/appointments"
                className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg hover:border-[#FFD700] hover:bg-[#FFD700]/10 transition-all group"
              >
                <Calendar className="w-8 h-8 text-gray-600 group-hover:text-[#FFD700] mb-2" />
                <span className="font-semibold text-gray-700 group-hover:text-[#1A1A1A]">Appointments</span>
              </Link>
              <Link 
                href="/admin/services"
                className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg hover:border-[#FFD700] hover:bg-[#FFD700]/10 transition-all group"
              >
                <Scissors className="w-8 h-8 text-gray-600 group-hover:text-[#FFD700] mb-2" />
                <span className="font-semibold text-gray-700 group-hover:text-[#1A1A1A]">Services</span>
              </Link>
              <Link 
                href="/profile"
                className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg hover:border-[#FFD700] hover:bg-[#FFD700]/10 transition-all group"
              >
                <Users className="w-8 h-8 text-gray-600 group-hover:text-[#FFD700] mb-2" />
                <span className="font-semibold text-gray-700 group-hover:text-[#1A1A1A]">My Profile</span>
              </Link>
              {profile.role === 'admin' && (
                <Link 
                  href="/admin/staff"
                  className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg hover:border-[#FFD700] hover:bg-[#FFD700]/10 transition-all group"
                >
                  <Users className="w-8 h-8 text-gray-600 group-hover:text-[#FFD700] mb-2" />
                  <span className="font-semibold text-gray-700 group-hover:text-[#1A1A1A]">Manage Staff</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}