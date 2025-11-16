'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Service, Staff } from '@/types/database'
import ServiceSelection from '@/components/booking/ServiceSelection'
import StaffSelection from '@/components/booking/StaffSelection'
import DateTimeSelection from '@/components/booking/DateTimeSelection'
import CustomerInfoForm from '@/components/booking/CustomerInfoForm'
import { ChevronLeft, ChevronRight, Star, Clock, MapPin, Scissors, Palette, Sparkles, Menu, X, Search, ShoppingCart, User, CheckCircle, Calendar } from 'lucide-react'
import { salonInfo } from '@/lib/constants'
import { useOpeningStatus } from '@/hooks/useOpeningStatus'

// Loading component for Suspense fallback
function BookingLoading() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFD700] mx-auto mb-4"></div>
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
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isOpen } = useOpeningStatus()

  // Booking Carousel Images
  const carouselImages = [
    {
      src: '/images/booking/booking-hero-1.jpg',
      alt: 'Booking Process',
      title: 'Book Your Perfect Appointment',
      description: 'Easy 4-step process to schedule your dream hairstyle'
    },
    {
      src: '/images/booking/booking-hero-2.jpg',
      alt: 'Expert Stylists',
      title: 'Choose Your Expert Stylist',
      description: 'Work with our talented team of hair professionals'
    },
    {
      src: '/images/booking/booking-hero-3.jpg',
      alt: 'Salon Experience',
      title: 'Premium Salon Experience',
      description: 'Enjoy our luxurious Atlanta salon environment'
    }
  ]

  const categories = [
    { 
      id: 'all', 
      name: 'All Services', 
      icon: <Scissors className="w-5 h-5" />
    },
    { 
      id: 'women', 
      name: "Women's Services", 
      icon: <Sparkles className="w-5 h-5" />
    },
    { 
      id: 'men', 
      name: "Men's Services", 
      icon: <Scissors className="w-5 h-5" />
    },
    { 
      id: 'color', 
      name: 'Color Services', 
      icon: <Palette className="w-5 h-5" />
    },
    { 
      id: 'special', 
      name: 'Special Services', 
      icon: <Sparkles className="w-5 h-5" />
    }
  ]

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

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
        router.push('/services/booking/confirmation')
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

  const stepLabels = [
    { number: 1, label: 'Choose Service', description: 'Select your desired service' },
    { number: 2, label: 'Pick Stylist', description: 'Choose your expert stylist' },
    { number: 3, label: 'Date & Time', description: 'Select appointment slot' },
    { number: 4, label: 'Your Details', description: 'Finalize booking' }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center h-full py-4">
              <div className="relative h-full flex items-center">
                <Image
                  src="images/logos/logo-white.png"
                  alt="Myy Signature Myy Style"
                  width={360}
                  height={64}
                  className="object-contain h-full w-auto"
                  style={{ 
                    borderRadius: '0',
                    backgroundColor: 'transparent'
                  }}
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-[#1A1A1A] hover:text-[#FFD700] transition-colors font-medium">
                Home
              </Link>
              <Link href="/services" className="text-[#FFD700] font-semibold border-b-2 border-[#FFD700]">
                Services
              </Link>
              <Link href="/gallery" className="text-[#1A1A1A] hover:text-[#FFD700] transition-colors font-medium">
                Gallery
              </Link>
              <Link href="/staff" className="text-[#1A1A1A] hover:text-[#FFD700] transition-colors font-medium">
                Our Team
              </Link>
              <Link href="/shop" className="text-[#1A1A1A] hover:text-[#FFD700] transition-colors font-medium">
                Shop
              </Link>
              <Link 
                href="/services/booking" 
                className="bg-[#FFD700] text-[#1A1A1A] px-6 py-3 rounded-full font-semibold hover:bg-[#B39700] transition-all duration-300"
              >
                Book Now
              </Link>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-[#1A1A1A] hover:text-[#FFD700] transition-colors">
                <Search className="w-6 h-6" />
              </button>
              <button className="p-2 text-[#1A1A1A] hover:text-[#FFD700] transition-colors relative">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-[#FFD700] text-[#1A1A1A] text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  0
                </span>
              </button>
              <button className="p-2 text-[#1A1A1A] hover:text-[#FFD700] transition-colors">
                <User className="w-6 h-6" />
              </button>
              
              {/* Mobile menu button */}
              <div className="lg:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-[#1A1A1A] p-2 rounded-lg hover:bg-[#FFE766] transition-colors"
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 bg-white">
              <div className="px-2 pt-2 pb-4 space-y-1">
                <Link 
                  href="/" 
                  className="block px-3 py-3 text-[#1A1A1A] hover:bg-[#FFE766] rounded-lg transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/services" 
                  className="block px-3 py-3 bg-[#FFD700] text-[#1A1A1A] rounded-lg font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </Link>
                <Link 
                  href="/gallery" 
                  className="block px-3 py-3 text-[#1A1A1A] hover:bg-[#FFE766] rounded-lg transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Gallery
                </Link>
                <Link 
                  href="/staff" 
                  className="block px-3 py-3 text-[#1A1A1A] hover:bg-[#FFE766] rounded-lg transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Our Team
                </Link>
                <Link 
                  href="/shop" 
                  className="block px-3 py-3 text-[#1A1A1A] hover:bg-[#FFE766] rounded-lg transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Shop
                </Link>
                <Link 
                  href="/services/booking" 
                  className="block px-3 py-3 bg-[#1A1A1A] text-white rounded-lg text-center font-semibold hover:bg-[#2A2A2A] transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with Carousel */}
      <div className="h-[40vh] flex items-center relative">
        {/* Background Carousel */}
        <div className="absolute inset-0 z-0">
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Content Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <div className="space-y-4 text-white">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              {carouselImages[currentSlide].title}
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              {carouselImages[currentSlide].description}
            </p>
            
            {/* Key Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-2 opacity-90">
                <Star className="w-5 h-5 text-[#FFD700]" />
                <span className="font-medium">5-Star Rated</span>
              </div>
              <div className="flex items-center justify-center space-x-2 opacity-90">
                <Clock className="w-5 h-5 text-white" />
                <span className="font-medium">{isOpen ? 'Open Now' : 'Closed Now'}</span>
              </div>
              <div className="flex items-center justify-center space-x-2 opacity-90">
                <MapPin className="w-5 h-5 text-white" />
                <span className="font-medium">Prime Location</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Process */}
      <div className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            {/* Progress Steps */}
            <div className="mb-12">
              <div className="text-center mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#1A1A1A] mb-2">
                  Booking Process
                </h2>
                <p className="text-gray-600 text-lg">
                  Complete these 4 simple steps to book your appointment
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stepLabels.map((stepItem, index) => (
                  <div
                    key={stepItem.number}
                    className={`text-center p-6 rounded-2xl border-2 transition-all duration-300 ${
                      step === stepItem.number
                        ? 'border-[#FFD700] bg-[#FFE766]/20 shadow-lg'
                        : step > stepItem.number
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 bg-[#F8F9FA]'
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg ${
                        step === stepItem.number
                          ? 'bg-[#FFD700] text-[#1A1A1A]'
                          : step > stepItem.number
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {step > stepItem.number ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        stepItem.number
                      )}
                    </div>
                    <h3 className="font-semibold text-[#1A1A1A] mb-2">
                      {stepItem.label}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {stepItem.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <div className="mb-8">
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">
                      Choose Your Service
                    </h3>
                    <p className="text-gray-600">
                      Select from our premium hair services
                    </p>
                  </div>
                  <ServiceSelection
                    services={services}
                    selectedService={selectedService}
                    selectedCategory={selectedCategory}
                    categories={categories}
                    onServiceSelect={handleServiceSelect}
                    onCategorySelect={handleCategorySelect}
                  />
                </div>
              )}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">
                      Select Your Stylist
                    </h3>
                    <p className="text-gray-600">
                      Choose from our team of expert hair professionals
                    </p>
                  </div>
                  <StaffSelection
                    staff={staff}
                    selectedStaff={selectedStaff}
                    onStaffSelect={handleStaffSelect}
                  />
                </div>
              )}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">
                      Pick Date & Time
                    </h3>
                    <p className="text-gray-600">
                      Choose your preferred appointment slot
                    </p>
                  </div>
                  <DateTimeSelection
                    selectedStaff={selectedStaff}
                    onDateTimeSelect={handleDateTimeSelect}
                  />
                </div>
              )}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">
                      Finalize Your Booking
                    </h3>
                    <p className="text-gray-600">
                      Enter your details to complete the appointment
                    </p>
                  </div>
                  <CustomerInfoForm
                    customerInfo={customerInfo}
                    selectedService={selectedService}
                    selectedStaff={selectedStaff}
                    appointmentDateTime={appointmentDateTime}
                    loading={loading}
                    onSubmit={handleSubmit}
                    onCustomerInfoChange={handleCustomerInfoChange}
                  />
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-8 border-t border-gray-200">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="flex items-center space-x-2 bg-[#F8F9FA] text-[#1A1A1A] py-3 px-6 rounded-full font-semibold hover:bg-[#FFE766] transition-all duration-300 shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to {stepLabels[step - 2].label}</span>
                </button>
              )}
              <div className="flex-1"></div>
              {step < 4 && selectedService && (
                <button
                  onClick={() => setStep(step + 1)}
                  className="flex items-center space-x-2 bg-[#FFD700] text-[#1A1A1A] py-3 px-6 rounded-full font-semibold hover:bg-[#B39700] hover:shadow-xl transition-all duration-300"
                >
                  <span>Continue to {stepLabels[step].label}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Current Selection Summary */}
            {(selectedService || selectedStaff || appointmentDateTime.date) && (
              <div className="mt-8 p-6 bg-[#F8F9FA] rounded-2xl">
                <h4 className="font-semibold text-[#1A1A1A] mb-4">Your Selection:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  {selectedService && (
                    <div className="flex items-center space-x-2">
                      <Scissors className="w-4 h-4 text-[#FFD700]" />
                      <span className="text-gray-600">Service:</span>
                      <span className="font-semibold text-[#1A1A1A]">{selectedService.name}</span>
                    </div>
                  )}
                  {selectedStaff && (
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-[#FFD700]" />
                      <span className="text-gray-600">Stylist:</span>
                      <span className="font-semibold text-[#1A1A1A]">{selectedStaff.full_name}</span>
                    </div>
                  )}
                  {appointmentDateTime.date && (
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-[#FFD700]" />
                      <span className="text-gray-600">Date:</span>
                      <span className="font-semibold text-[#1A1A1A]">
                        {new Date(appointmentDateTime.date).toLocaleDateString()} at {appointmentDateTime.time}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
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