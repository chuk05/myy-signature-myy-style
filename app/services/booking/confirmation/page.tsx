'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, CheckCircle, Calendar, Clock, User, Scissors } from 'lucide-react'

export default function ConfirmationPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Confirmation Carousel Images
  const carouselImages = [
    {
      src: '/images/confirmation-1.jpg',
      alt: 'Salon Interior',
      title: 'Your Appointment is Confirmed!'
    },
    {
      src: '/images/confirmation-2.jpg',
      alt: 'Happy Client',
      title: 'We Look Forward to Seeing You!'
    },
    {
      src: '/images/confirmation-3.jpg',
      alt: 'Stylist at Work',
      title: 'Prepare for Your Transformation!'
    }
  ]

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
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

        {/* Content Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <div className="space-y-4 text-white">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              {carouselImages[currentSlide].title}
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Thank you for choosing Myy Signature Myy Style
            </p>
          </div>
        </div>
      </div>

      {/* Confirmation Details */}
      <div className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F8F9FA] rounded-2xl p-8 text-center">
            {/* Confirmation Icon */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">
              Your Appointment is Confirmed!
            </h2>
            
            <p className="text-gray-600 mb-8 text-lg">
              Thank you for booking with Myy Signature Myy Style. We're excited to help you achieve your desired look!
            </p>

            {/* Next Steps */}
            <div className="bg-white rounded-xl p-6 mb-8 text-left">
              <h3 className="font-semibold text-[#1A1A1A] mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                What's Next?
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#FFD700] rounded-full mr-3"></div>
                  You'll receive a confirmation email with all the details
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#FFD700] rounded-full mr-3"></div>
                  Please arrive 10 minutes before your appointment
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#FFD700] rounded-full mr-3"></div>
                  Bring any inspiration photos for your stylist
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#FFD700] rounded-full mr-3"></div>
                  Contact us if you need to reschedule
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center w-full bg-[#FFD700] text-[#1A1A1A] py-4 px-8 rounded-full font-semibold hover:bg-[#B39700] hover:shadow-xl transition-all duration-300"
              >
                <span>Back to Homepage</span>
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
              
              <Link
                href="/services/booking"
                className="inline-flex items-center justify-center w-full bg-[#1A1A1A] text-white py-4 px-8 rounded-full font-semibold hover:bg-[#2A2A2A] hover:shadow-xl transition-all duration-300"
              >
                <Scissors className="w-5 h-5 mr-2" />
                <span>Book Another Appointment</span>
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center justify-center w-full bg-white text-[#1A1A1A] py-4 px-8 rounded-full font-semibold border-2 border-gray-200 hover:border-[#FFD700] hover:shadow-lg transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                <span>View All Services</span>
              </Link>
            </div>

            {/* Contact Info */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-2">
                Need to make changes to your appointment?
              </p>
              <p className="text-[#1A1A1A] font-semibold">
                Call us at <span className="text-[#FFD700]">(404) 555-0123</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}