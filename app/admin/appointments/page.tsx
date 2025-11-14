'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Appointment {
  id: string
  customer_id: string
  staff_id: string
  service_id: string
  appointment_date: string
  appointment_time: string
  status: string
  notes: string | null
  created_at: string
  customers: {
    full_name: string
    email: string
    phone: string
  }
  services: {
    name: string
    duration: number
    price: number
  }
  staff: {
    full_name: string
  }
}

export default function AppointmentsManagement() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/appointments')
      const data = await response.json()
      setAppointments(data)
    } catch (error) {
      console.error('Error fetching appointments:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F0F0F0] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading appointments...</div>
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
          <h1 className="text-3xl font-bold text-[#222222] mb-2">Appointments Management</h1>
          <p className="text-gray-600">View and manage all salon appointments</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left font-semibold text-[#222222]">Date & Time</th>
                  <th className="py-3 text-left font-semibold text-[#222222]">Customer</th>
                  <th className="py-3 text-left font-semibold text-[#222222]">Service</th>
                  <th className="py-3 text-left font-semibold text-[#222222]">Stylist</th>
                  <th className="py-3 text-left font-semibold text-[#222222]">Status</th>
                  <th className="py-3 text-left font-semibold text-[#222222]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="border-b hover:bg-gray-50">
                    <td className="py-3">
                      {new Date(appointment.appointment_date).toLocaleDateString()} 
                      <br />
                      <span className="text-sm text-gray-500">{appointment.appointment_time}</span>
                    </td>
                    <td className="py-3">
                      {appointment.customers.full_name}
                      <br />
                      <span className="text-sm text-gray-500">{appointment.customers.phone}</span>
                    </td>
                    <td className="py-3">
                      {appointment.services.name}
                      <br />
                      <span className="text-sm text-gray-500">${appointment.services.price}</span>
                    </td>
                    <td className="py-3">{appointment.staff.full_name}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        appointment.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <select className="text-sm border rounded px-2 py-1">
                        <option value="confirmed">Confirmed</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {appointments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No appointments found.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}