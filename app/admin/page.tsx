'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Users, Scissors, Calendar, Settings, TrendingUp, Eye, Plus } from 'lucide-react'

interface Stats {
  totalStaff: number
  totalServices: number
  todayAppointments: number
  totalAppointments: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalStaff: 0,
    totalServices: 0,
    todayAppointments: 0,
    totalAppointments: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      // Simulate API calls
      setStats({
        totalStaff: 8,
        totalServices: 12,
        todayAppointments: 15,
        totalAppointments: 247
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const adminCards = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Staff Management',
      description: 'Manage your team members',
      href: '/admin/staff',
      color: 'from-blue-500 to-blue-600',
      image: '/images/staff-1.jpg',
      action: 'Manage Team'
    },
    {
      icon: <Scissors className="w-8 h-8" />,
      title: 'Services',
      description: 'Update services and pricing',
      href: '/admin/services',
      color: 'from-green-500 to-green-600',
      image: '/images/service-women.jpg',
      action: 'View Services'
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Appointments',
      description: 'View all bookings',
      href: '/admin/appointments',
      color: 'from-purple-500 to-purple-600',
      image: '/images/gallery-1.jpg',
      action: 'See Schedule'
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: 'Settings',
      description: 'Configure salon settings',
      href: '/admin/settings',
      color: 'from-gray-500 to-gray-600',
      image: '/images/hero-salon.jpg',
      action: 'Configure'
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6A8EA4]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/logos/logo.png"
                  alt="Myy Signature Myy Style"
                  width={48}
                  height={48}
                  className="object-contain rounded-xl"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600 mt-1">Manage your salon operations</p>
              </div>
            </div>
            <Link 
              href="/" 
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>View Site</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Staff</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalStaff}</p>
                <p className="text-sm text-green-600 mt-1">↑ 2 new this month</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Services</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalServices}</p>
                <p className="text-sm text-blue-600 mt-1">12 active</p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <Scissors className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.todayAppointments}</p>
                <p className="text-sm text-orange-600 mt-1">3 upcoming</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Appointments</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalAppointments}</p>
                <p className="text-sm text-green-600 mt-1">↑ 15% this month</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-xl">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid with Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminCards.map((card, index) => (
            <Link
              key={index}
              href={card.href}
              className="group block"
            >
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                {/* Card Image */}
                <div className="relative h-32 bg-gradient-to-r from-gray-200 to-gray-300">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className={`absolute top-4 right-4 p-2 rounded-lg bg-gradient-to-r ${card.color} text-white shadow-lg`}>
                    {card.icon}
                  </div>
                </div>
                
                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{card.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#6A8EA4] group-hover:text-[#5a7a90] transition-colors">
                      {card.action}
                    </span>
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-[#6A8EA4] group-hover:text-white transition-colors">
                      <Plus className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Add Section */}
        <div className="mt-12 bg-gradient-to-r from-[#6A8EA4] to-[#5a7a90] rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Need to add something quickly?</h3>
              <p className="opacity-90">Add new staff, services, or manage appointments</p>
            </div>
            <div className="flex space-x-4">
              <Link 
                href="/admin/staff" 
                className="bg-white text-[#6A8EA4] px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
              >
                <Users className="w-4 h-4" />
                <span>Add Staff</span>
              </Link>
              <Link 
                href="/admin/services" 
                className="bg-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-all flex items-center space-x-2"
              >
                <Scissors className="w-4 h-4" />
                <span>Add Service</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}