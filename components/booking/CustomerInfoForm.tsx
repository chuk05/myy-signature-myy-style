'use client'

import { Service, Staff } from '@/types/database'

interface CustomerInfoFormProps {
  customerInfo: {
    full_name: string
    email: string
    phone: string
  }
  selectedService: Service | null
  selectedStaff: Staff | null
  appointmentDateTime: { date: string; time: string }
  loading: boolean
  onSubmit: (e: React.FormEvent) => void
  onCustomerInfoChange: (info: { full_name: string; email: string; phone: string }) => void
}

export default function CustomerInfoForm({
  customerInfo,
  selectedService,
  selectedStaff,
  appointmentDateTime,
  loading,
  onSubmit,
  onCustomerInfoChange
}: CustomerInfoFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <h3 className="text-lg font-semibold text-[#222222]">Your Information</h3>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-[#222222] mb-2">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={customerInfo.full_name}
            onChange={(e) => onCustomerInfoChange({ ...customerInfo, full_name: e.target.value })}
            className="w-full p-3 border border-[#F0F0F0] rounded-lg focus:border-[#6A8EA4] focus:outline-none"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#222222] mb-2">
            Email *
          </label>
          <input
            type="email"
            required
            value={customerInfo.email}
            onChange={(e) => onCustomerInfoChange({ ...customerInfo, email: e.target.value })}
            className="w-full p-3 border border-[#F0F0F0] rounded-lg focus:border-[#6A8EA4] focus:outline-none"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#222222] mb-2">
            Phone *
          </label>
          <input
            type="tel"
            required
            value={customerInfo.phone}
            onChange={(e) => onCustomerInfoChange({ ...customerInfo, phone: e.target.value })}
            className="w-full p-3 border border-[#F0F0F0] rounded-lg focus:border-[#6A8EA4] focus:outline-none"
            placeholder="Enter your phone number"
          />
        </div>
      </div>

      {/* Appointment Summary */}
      <div className="bg-[#F0F0F0] p-6 rounded-lg">
        <h4 className="font-semibold text-[#222222] mb-4 text-lg">Appointment Summary</h4>
        <div className="grid gap-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-300">
            <span className="text-gray-600">Service:</span>
            <span className="font-medium text-[#222222]">{selectedService?.name}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-300">
            <span className="text-gray-600">Stylist:</span>
            <span className="font-medium text-[#222222]">{selectedStaff?.full_name}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-300">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium text-[#222222]">
              {new Date(appointmentDateTime.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-300">
            <span className="text-gray-600">Time:</span>
            <span className="font-medium text-[#222222]">{appointmentDateTime.time}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-300">
            <span className="text-gray-600">Duration:</span>
            <span className="font-medium text-[#222222]">{selectedService?.duration} minutes</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">Price:</span>
            <span className="text-xl font-bold text-[#6A8EA4]">${selectedService?.price}</span>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#6A8EA4] text-white py-4 px-6 rounded-lg font-semibold hover:bg-[#5a7a90] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing...
          </div>
        ) : (
          'Confirm Appointment'
        )}
      </button>
    </form>
  )
}