'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Service {
  id: string
  name: string
  description: string | null
  duration: number
  price: number
  is_active: boolean
  created_at: string
}

export default function ServicesManagement() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services')
      const data = await response.json()
      setServices(data)
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F0F0F0] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading services...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F0F0F0] py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/admin" className="text-[#6A8EA4] hover:text-[#5a7a90] mb-4 inline-block">
            &larr; Back to Admin
          </Link>
          <h1 className="text-3xl font-bold text-[#222222] mb-2">Services Management</h1>
          <p className="text-gray-600">Manage your salon services and pricing</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-[#222222]">Services</h2>
            <button className="bg-[#6A8EA4] text-white px-4 py-2 rounded-lg hover:bg-[#5a7a90] transition-colors">
              Add Service
            </button>
          </div>

          <div className="grid gap-4">
            {services.map((service) => (
              <div key={service.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-[#222222]">{service.name}</h3>
                    {service.description && (
                      <p className="text-gray-600 mt-1">{service.description}</p>
                    )}
                    <div className="flex gap-4 mt-2">
                      <span className="text-sm text-gray-500">{service.duration} minutes</span>
                      <span className="text-sm font-semibold text-[#6A8EA4]">${service.price}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-[#6A8EA4] hover:text-[#5a7a90] transition-colors">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800 transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {services.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No services found.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}