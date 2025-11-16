'use client'

import { useState, useEffect } from 'react'
import { Service } from '@/types/database'
import { Plus, Edit, Trash2, Save, X, Crown, Scissors, Palette, Sparkles, Users } from 'lucide-react'

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  const categories = [
    { id: 'women', name: "Women's Services", icon: <Sparkles className="w-4 h-4" /> },
    { id: 'men', name: "Men's Services", icon: <Scissors className="w-4 h-4" /> },
    { id: 'color', name: 'Color Services', icon: <Palette className="w-4 h-4" /> },
    { id: 'special', name: 'Special Services', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'premium', name: 'Premium Services', icon: <Crown className="w-4 h-4" /> }
  ]

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

// In the handleSave function, replace with:
const handleSave = async (serviceData: Partial<Service>) => {
  try {
    // For edits, include ID in query parameter; for creates, no ID needed
    const url = editingService 
      ? `/api/services?id=${editingService.id}`
      : '/api/services'
    const method = editingService ? 'PUT' : 'POST'

    console.log('Sending request to:', url, 'with method:', method) // Debug

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(serviceData), // Send form data without ID in body
    })

    if (response.ok) {
      await fetchServices()
      setEditingService(null)
      setIsCreating(false)
    } else {
      const errorData = await response.json()
      console.error('Server error:', errorData)
      alert(`Error: ${errorData.error || 'Failed to save service'}`)
    }
  } catch (error) {
    console.error('Error saving service:', error)
    alert('Error saving service')
  }
}

// In the handleDelete function, replace with:
const handleDelete = async (serviceId: string) => {
  if (!confirm('Are you sure you want to delete this service?')) return

  try {
    const response = await fetch(`/api/services?id=${serviceId}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      await fetchServices()
    } else {
      const errorData = await response.json()
      alert(`Error: ${errorData.error || 'Failed to delete service'}`)
    }
  } catch (error) {
    console.error('Error deleting service:', error)
    alert('Error deleting service')
  }
}

// In the toggleActive function, replace with:
const toggleActive = async (service: Service) => {
  try {
    const response = await fetch(`/api/services?id=${service.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ is_active: !service.is_active }),
    })

    if (response.ok) {
      await fetchServices()
    } else {
      const errorData = await response.json()
      console.error('Error updating service:', errorData.error)
    }
  } catch (error) {
    console.error('Error updating service:', error)
  }
}

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFD700] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading services...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Service Management</h1>
          <p className="text-gray-600">Manage your salon services and pricing</p>
        </div>

        {/* Actions */}
        <div className="mb-6 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Total Services: {services.length}
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center space-x-2 bg-[#FFD700] text-[#1A1A1A] px-4 py-2 rounded-lg font-semibold hover:bg-[#B39700] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </button>
        </div>

        {/* Create/Edit Form */}
        {(isCreating || editingService) && (
          <ServiceForm
            service={editingService}
            categories={categories}
            onSave={handleSave}
            onCancel={() => {
              setEditingService(null)
              setIsCreating(false)
            }}
          />
        )}

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              categories={categories}
              onEdit={setEditingService}
              onDelete={handleDelete}
              onToggleActive={toggleActive}
            />
          ))}
        </div>

        {services.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Services Found</h3>
            <p className="text-gray-500">Create your first service to get started</p>
          </div>
        )}
      </div>
    </div>
  )
}

function ServiceCard({ 
  service, 
  categories, 
  onEdit, 
  onDelete, 
  onToggleActive 
}: { 
  service: Service
  categories: any[]
  onEdit: (service: Service) => void
  onDelete: (id: string) => void
  onToggleActive: (service: Service) => void
}) {
  const category = categories.find(cat => cat.id === service.category)

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 border-2 transition-all ${
      service.is_active ? 'border-green-200' : 'border-red-200'
    }`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-2">
          {category?.icon}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            service.category === 'premium' 
              ? 'bg-purple-100 text-purple-800'
              : service.category === 'color'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {category?.name}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onToggleActive(service)}
            className={`w-8 h-4 rounded-full transition-colors relative ${
              service.is_active ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <div className={`w-3 h-3 rounded-full bg-white transform transition-transform absolute top-0.5 ${
              service.is_active ? 'translate-x-4' : 'translate-x-0.5'
            }`} />
          </button>
          <span className="text-xs text-gray-500">{service.is_active ? 'Active' : 'Inactive'}</span>
        </div>
      </div>

      {/* Service Info */}
      <h3 className="font-bold text-lg text-[#1A1A1A] mb-2">{service.name}</h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>

      {/* Details */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <span className="text-gray-500">Duration:</span>
          <div className="font-semibold">{service.duration} min</div>
        </div>
        <div>
          <span className="text-gray-500">Price:</span>
          <div className="font-semibold text-[#FFD700]">${service.price}</div>
        </div>
      </div>

      {/* Image Preview */}
      {service.image && (
        <div className="mb-4">
          <div className="text-xs text-gray-500 mb-1">Image:</div>
          <div className="text-sm font-medium truncate">{service.image}</div>
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(service)}
          className="flex-1 flex items-center justify-center space-x-1 bg-[#F8F9FA] text-[#1A1A1A] py-2 rounded-lg font-medium hover:bg-[#FFE766] transition-colors"
        >
          <Edit className="w-4 h-4" />
          <span>Edit</span>
        </button>
        <button
          onClick={() => onDelete(service.id)}
          className="flex items-center justify-center space-x-1 bg-red-100 text-red-700 py-2 px-4 rounded-lg font-medium hover:bg-red-200 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

function ServiceForm({ 
  service, 
  categories, 
  onSave, 
  onCancel 
}: { 
  service?: Service | null
  categories: any[]
  onSave: (data: Partial<Service>) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    name: service?.name || '',
    description: service?.description || '',
    duration: service?.duration || 60,
    price: service?.price || 0,
    category: service?.category || 'women',
    image: service?.image || '',
    is_active: service?.is_active ?? true
  })

  // Reset form when service changes
  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name || '',
        description: service.description || '',
        duration: service.duration || 60,
        price: service.price || 0,
        category: service.category || 'women',
        image: service.image || '',
        is_active: service.is_active ?? true
      })
    } else {
      setFormData({
        name: '',
        description: '',
        duration: 60,
        price: 0,
        category: 'women',
        image: '',
        is_active: true
      })
    }
  }, [service])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.name.trim() || !formData.description.trim()) {
      alert('Please fill in all required fields')
      return
    }

    onSave(formData)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-[#FFD700]">
      <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">
        {service ? 'Edit Service' : 'Create New Service'}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
              placeholder="e.g., VIP Luxury Package"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (minutes) *
            </label>
            <input
              type="number"
              required
              min="15"
              step="15"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price ($) *
            </label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
            placeholder="Describe the service in detail..."
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image Path
          </label>
          <input
            type="text"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
            placeholder="/images/categories/service-name.jpg"
          />
        </div>

        {/* Active Status */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="is_active"
            checked={formData.is_active}
            onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
            className="w-4 h-4 text-[#FFD700] focus:ring-[#FFD700] border-gray-300 rounded"
          />
          <label htmlFor="is_active" className="text-sm text-gray-700">
            Service is active and available for booking
          </label>
        </div>

        {/* Actions */}
        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            className="flex items-center space-x-2 bg-[#FFD700] text-[#1A1A1A] px-6 py-2 rounded-lg font-semibold hover:bg-[#B39700] transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>{service ? 'Update' : 'Create'} Service</span>
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Cancel</span>
          </button>
        </div>
      </form>
    </div>
  )
}