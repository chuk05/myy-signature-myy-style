'use client'

import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { salonInfo } from '@/lib/constants'
import { useOpeningStatus } from '@/hooks/useOpeningStatus'

interface SalonInfoProps {
  variant?: 'compact' | 'detailed'
  className?: string
}

export default function SalonInfo({ variant = 'compact', className = '' }: SalonInfoProps) {
  const { isOpen } = useOpeningStatus()

  if (variant === 'compact') {
    return (
      <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
        <h3 className="font-semibold text-[#1A1A1A] mb-4">Salon Information</h3>
        
        <div className="space-y-3">
          {/* Address */}
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-[#FFD700] mt-0.5" />
            <div>
              <p className="text-[#1A1A1A] font-medium">{salonInfo.name}</p>
              <p className="text-gray-600 text-sm">{salonInfo.address}</p>
              <a 
                href={salonInfo.googleMapsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#FFD700] text-sm hover:underline"
              >
                View on Google Maps
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-[#FFD700]" />
            <a 
              href={`tel:${salonInfo.phone.replace(/\D/g, '')}`}
              className="text-[#1A1A1A] hover:text-[#FFD700] transition-colors"
            >
              {salonInfo.phone}
            </a>
          </div>

          {/* Email */}
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-[#FFD700]" />
            <a 
              href={`mailto:${salonInfo.email}`}
              className="text-[#1A1A1A] hover:text-[#FFD700] transition-colors"
            >
              {salonInfo.email}
            </a>
          </div>

          {/* Current Status */}
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-[#FFD700]" />
            <div className="flex items-center space-x-2">
              <span className="text-[#1A1A1A]">
                {isOpen ? 'Open Now' : 'Closed Now'}
              </span>
              <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500' : 'bg-red-500'}`} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Detailed variant
  return (
    <div className={`bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] text-white rounded-2xl p-8 ${className}`}>
      <h3 className="text-2xl font-bold mb-6">Visit Our Salon</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Information */}
        <div className="space-y-4">
          <h4 className="font-semibold text-[#FFD700] mb-3">Contact Info</h4>
          
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-[#FFD700]" />
            <div>
              <p className="font-medium">{salonInfo.name}</p>
              <p className="text-gray-300 text-sm">{salonInfo.address}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-[#FFD700]" />
            <a 
              href={`tel:${salonInfo.phone.replace(/\D/g, '')}`}
              className="hover:text-[#FFD700] transition-colors"
            >
              {salonInfo.phone}
            </a>
          </div>

          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-[#FFD700]" />
            <a 
              href={`mailto:${salonInfo.email}`}
              className="hover:text-[#FFD700] transition-colors"
            >
              {salonInfo.email}
            </a>
          </div>
        </div>

        {/* Opening Hours */}
        <div>
          <h4 className="font-semibold text-[#FFD700] mb-3">Opening Hours</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center py-2 border-b border-gray-600">
              <span className="text-gray-300">Monday</span>
              <span className="text-gray-400">Closed</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-600">
              <span>Tuesday - Saturday</span>
              <span>9:00 AM - 5:00 PM</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span>Sunday</span>
              <span>11:00 AM - 7:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-6 pt-6 border-t border-gray-600">
        <a 
          href={salonInfo.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full bg-[#FFD700] text-[#1A1A1A] py-3 px-6 rounded-full font-semibold hover:bg-[#B39700] transition-colors"
        >
          <MapPin className="w-4 h-4 mr-2" />
          Get Directions
        </a>
      </div>
    </div>
  )
}