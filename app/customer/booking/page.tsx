'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Service, Staff } from '@/types/database'
import ServiceSelection from '@/components/booking/ServiceSelection'
import StaffSelection from '@/components/booking/StaffSelection'
import DateTimeSelection from '@/components/booking/DateTimeSelection'

export default function BookingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [services, setServices] = useState<Service[]>([])
  const [staff, setStaff] = useState<Staff[]>([])
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null)
  const [appointmentDateTime, setAppointmentDateTime] = useState({ date: '', time: '' })
  const [customerInfo, setCustomerInfo] = useState({
    full_name: '',
    email: '',
    phone: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchServices()
    fetchStaff()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services')
      const data = await response.json()
      setServices(data)
    } catch (error) {
      console.error('Error fetching services:', error)
    }
  }

  const fetchStaff = async () => {
    try {
      const response = await fetch('/api/staff')
      const data = await response.json()
      setStaff(data)
    } catch (error) {
      console.error('Error fetching staff:', error)
    }
  }

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service)
    setStep(2)
  }

  const handleStaffSelect = (staff: Staff) => {
    setSelectedStaff(staff)
    setStep(3)
  }

  const handleDateTimeSelect = (date: string, time: string) => {
    setAppointmentDateTime({ date, time })
    setStep(4)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer: customerInfo,
          appointment: {
            staff_id: selectedStaff?.id,
            service_id: selectedService?.id,
            date: appointmentDateTime.date,
            time: appointmentDateTime.time,
          }
        })
      })

      if (response.ok) {
        router.push('/booking/confirmation')
      } else {
        alert('Error creating appointment. Please try again.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error creating appointment. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F0F0F0] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          <h1 className="text-3xl font-bold text-[#222222] mb-2">Book Your Appointment</h1>
          <p className="text-gray-600 mb-8">Atlanta's Premier Salon Experience</p>

          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= stepNumber
                      ? 'bg-[#6A8EA4] text-white'
                      : 'bg-[#F0F0F0] text-gray-400'
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      step > stepNumber ? 'bg-[#6A8EA4]' : 'bg-[#F0F0F0]'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="mb-8">
            {step === 1 && (
              <ServiceSelection
                services={services}
                selectedService={selectedService}
                onServiceSelect={handleServiceSelect}
              />
            )}

            {step === 2 && (
              <StaffSelection
                staff={staff}
                selectedStaff={selectedStaff}
                onStaffSelect={handleStaffSelect}
              />
            )}

            {step === 3 && (
              <DateTimeSelection
                staffId={selectedStaff?.id || null}
                onTimeSelect={handleDateTimeSelect}
              />
            )}

            {step === 4 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-lg font-semibold text-[#222222]">Your Information</h3>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-[#222222] mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={customerInfo.full_name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, full_name: e.target.value })}
                      className="w-full p-3 border border-[#F0F0F0] rounded-lg focus:border-[#6A8EA4] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#222222] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      className="w-full p-3 border border-[#F0F0F0] rounded-lg focus:border-[#6A8EA4] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#222222] mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      className="w-full p-3 border border-[#F0F0F0] rounded-lg focus:border-[#6A8EA4] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Appointment Summary */}
                <div className="bg-[#F0F0F0] p-4 rounded-lg">
                  <h4 className="font-semibold text-[#222222] mb-2">Appointment Summary</h4>
                  <p><strong>Service:</strong> {selectedService?.name}</p>
                  <p><strong>Stylist:</strong> {selectedStaff?.full_name}</p>
                  <p><strong>Date:</strong> {new Date(appointmentDateTime.date).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {appointmentDateTime.time}</p>
                  <p><strong>Duration:</strong> {selectedService?.duration} minutes</p>
                  <p><strong>Price:</strong> ${selectedService?.price}</p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#6A8EA4] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#5a7a90] disabled:opacity-50"
                >
                  {loading ? 'Booking...' : 'Confirm Appointment'}
                </button>
              </form>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="bg-[#F0F0F0] text-[#222222] py-2 px-6 rounded-lg font-semibold hover:bg-gray-200"
              >
                Back
              </button>
            )}
            <div className="flex-1"></div>
          </div>
        </div>
      </div>
    </div>
  )
}