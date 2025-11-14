'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Service, Staff } from '@/types/database'
import ServiceSelection from '@/components/booking/ServiceSelection'
import StaffSelection from '@/components/booking/StaffSelection'
import DateTimeSelection from '@/components/booking/DateTimeSelection'
import CustomerInfoForm from '@/components/booking/CustomerInfoForm'

// Loading component for Suspense fallback
function BookingLoading() {
  return (
    <div className="min-h-screen bg-[#F0F0F0] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6A8EA4] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading booking system...</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main booking component that uses useSearchParams
function BookingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category')

  const [step, setStep] = useState(1)
  const [services, setServices] = useState<Service[]>([])
  const [staff, setStaff] = useState<Staff[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null)
  const [appointmentDateTime, setAppointmentDateTime] = useState({ date: '', time: '' })
  const [customerInfo, setCustomerInfo] = useState({
    full_name: '',
    email: '',
    phone: ''
  })
  const [loading, setLoading] = useState(false)

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'women', name: "Women's Services" },
    { id: 'men', name: "Men's Services" },
    { id: 'special', name: 'Special Services' }
  ]

  useEffect(() => {
    fetchServices()
    fetchStaff()
  }, [selectedCategory])

  const fetchServices = async () => {
    try {
      const url = selectedCategory && selectedCategory !== 'all' 
        ? `/api/services?category=${selectedCategory}`
        : '/api/services'
      
      const response = await fetch(url)
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

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setSelectedService(null)
    setStep(1)
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

  const handleCustomerInfoChange = (info: { full_name: string; email: string; phone: string }) => {
    setCustomerInfo(info)
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
        router.push('/customer/booking/confirmation')
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
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
                selectedCategory={selectedCategory}
                categories={categories}
                onServiceSelect={handleServiceSelect}
                onCategorySelect={handleCategorySelect}
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
                selectedStaff={selectedStaff}
                onDateTimeSelect={handleDateTimeSelect}
              />
            )}
            {step === 4 && (
              <CustomerInfoForm
                customerInfo={customerInfo}
                selectedService={selectedService}
                selectedStaff={selectedStaff}
                appointmentDateTime={appointmentDateTime}
                loading={loading}
                onSubmit={handleSubmit}
                onCustomerInfoChange={handleCustomerInfoChange}
              />
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="bg-[#F0F0F0] text-[#222222] py-2 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
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

// Main page component with Suspense boundary
export default function BookingPage() {
  return (
    <Suspense fallback={<BookingLoading />}>
      <BookingContent />
    </Suspense>
  )
}