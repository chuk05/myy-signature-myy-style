'use client'

import { useState, useEffect } from 'react'

interface Appointment {
  id: string
  appointment_date: string
  appointment_time: string
  status: string
  customers: {
    full_name: string
    phone: string
  }
  services: {
    name: string
    duration: number
  }
  staff: {
    full_name: string
  }
}

export default function StaffDashboard() {
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

  const updateAppointmentStatus = async (appointmentId: string, status: string) => {
    try {
      // This would be implemented with a proper API endpoint
      console.log('Updating appointment:', appointmentId, 'to status:', status)
      // For now, just refetch
      fetchAppointments()
    } catch (error) {
      console.error('Error updating appointment:', error)
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
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-3xl font-bold text-[#222222] mb-6">Staff Dashboard</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-[#6A8EA4] text-white p-4 rounded-lg text-center">
              <h3 className="text-lg font-semibold">Today's Appointments</h3>
              <p className="text-2xl font-bold">
                {appointments.filter(apt => 
                  apt.appointment_date === new Date().toISOString().split('T')[0]
                ).length}
              </p>
            </div>
            <div className="bg-[#5a7a90] text-white p-4 rounded-lg text-center">
              <h3 className="text-lg font-semibold">Confirmed</h3>
              <p className="text-2xl font-bold">
                {appointments.filter(apt => apt.status === 'confirmed').length}
              </p>
            </div>
            <div className="bg-[#4a6a7c] text-white p-4 rounded-lg text-center">
              <h3 className="text-lg font-semibold">Completed</h3>
              <p className="text-2xl font-bold">
                {appointments.filter(apt => apt.status === 'completed').length}
              </p>
            </div>
            <div className="bg-[#3a5a6c] text-white p-4 rounded-lg text-center">
              <h3 className="text-lg font-semibold">Total</h3>
              <p className="text-2xl font-bold">{appointments.length}</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-[#F0F0F0]">
                  <th className="py-3 px-4 text-left">Date & Time</th>
                  <th className="py-3 px-4 text-left">Customer</th>
                  <th className="py-3 px-4 text-left">Service</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="border-b">
                    <td className="py-3 px-4">
                      {new Date(appointment.appointment_date).toLocaleDateString()} 
                      at {appointment.appointment_time}
                    </td>
                    <td className="py-3 px-4">
                      {appointment.customers.full_name}
                      <br />
                      <span className="text-sm text-gray-500">
                        {appointment.customers.phone}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {appointment.services.name}
                      <br />
                      <span className="text-sm text-gray-500">
                        {appointment.services.duration} min
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        appointment.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800'
                          : appointment.status === 'completed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <select 
                        value={appointment.status}
                        onChange={(e) => updateAppointmentStatus(appointment.id, e.target.value)}
                        className="text-sm border rounded px-2 py-1"
                      >
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