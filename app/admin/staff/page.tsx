'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Staff {
  id: string
  email: string
  full_name: string
  specialty: string | null
  phone: string | null
  is_active: boolean
  created_at: string
}

export default function StaffManagement() {
  const [staff, setStaff] = useState<Staff[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    specialty: '',
    phone: '',
  })

  useEffect(() => {
    fetchStaff()
  }, [])

  const fetchStaff = async () => {
    try {
      const response = await fetch('/api/staff')
      const data = await response.json()
      setStaff(data)
    } catch (error) {
      console.error('Error fetching staff:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setShowAddForm(false)
        setFormData({ email: '', full_name: '', specialty: '', phone: '' })
        fetchStaff()
      }
    } catch (error) {
      console.error('Error adding staff:', error)
    }
  }

  const deleteStaff = async (id: string) => {
    if (!confirm('Are you sure you want to delete this staff member?')) return
    
    try {
      const response = await fetch(`/api/staff?id=${id}`, {
        method: 'DELETE',
      })
  
      if (response.ok) {
        // Show success message
        alert('Staff member deleted successfully')
        fetchStaff()
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Error deleting staff:', error)
      alert('Error deleting staff member')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F0F0F0] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading staff...</div>
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
          <h1 className="text-3xl font-bold text-[#222222] mb-2">Staff Management</h1>
          <p className="text-gray-600">Manage your salon staff members</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-[#222222]">Staff Members</h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-[#6A8EA4] text-white px-4 py-2 rounded-lg hover:bg-[#5a7a90] transition-colors"
            >
              Add Staff Member
            </button>
          </div>

          {showAddForm && (
            <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg bg-[#F0F0F0]">
              <h3 className="text-lg font-semibold mb-4">Add New Staff Member</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-[#222222] mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded focus:border-[#6A8EA4] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#222222] mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="Full name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded focus:border-[#6A8EA4] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#222222] mb-1">Specialty</label>
                  <input
                    type="text"
                    placeholder="e.g., Color Specialist"
                    value={formData.specialty}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded focus:border-[#6A8EA4] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#222222] mb-1">Phone</label>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded focus:border-[#6A8EA4] focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-[#6A8EA4] text-white px-4 py-2 rounded hover:bg-[#5a7a90] transition-colors"
                >
                  Add Staff
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left font-semibold text-[#222222]">Name</th>
                  <th className="py-3 text-left font-semibold text-[#222222]">Email</th>
                  <th className="py-3 text-left font-semibold text-[#222222]">Specialty</th>
                  <th className="py-3 text-left font-semibold text-[#222222]">Phone</th>
                  <th className="py-3 text-left font-semibold text-[#222222]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((member) => (
                  <tr key={member.id} className="border-b hover:bg-gray-50">
                    <td className="py-3">{member.full_name}</td>
                    <td className="py-3">{member.email}</td>
                    <td className="py-3">{member.specialty || '-'}</td>
                    <td className="py-3">{member.phone || '-'}</td>
                    <td className="py-3">
                      <button
                        onClick={() => deleteStaff(member.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {staff.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No staff members found. Add your first staff member above.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}