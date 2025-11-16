'use client'

import { Clock } from 'lucide-react'
import { openingHoursDisplay } from '@/lib/constants'
import { useOpeningStatus } from '@/hooks/useOpeningStatus'

export default function OpeningHours() {
  const { isOpen, nextOpening } = useOpeningStatus()

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Clock className="w-5 h-5 text-[#FFD700]" />
        <h3 className="font-semibold text-[#1A1A1A]">Opening Hours</h3>
      </div>
      
      {/* Current Status */}
      <div className={`flex items-center justify-between p-3 rounded-lg mb-4 ${
        isOpen ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
      }`}>
        <span className="font-medium text-[#1A1A1A]">
          {isOpen ? 'Open Now' : 'Closed Now'}
        </span>
        <div className={`w-3 h-3 rounded-full ${isOpen ? 'bg-green-500' : 'bg-red-500'}`} />
      </div>

      {/* Next Opening Info */}
      {!isOpen && nextOpening && (
        <div className="text-sm text-gray-600 mb-4 text-center">
          {nextOpening}
        </div>
      )}

      {/* Hours List */}
      <div className="space-y-2">
        {openingHoursDisplay.map((dayInfo, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
          >
            <span className={`font-medium ${dayInfo.isOpen ? 'text-[#1A1A1A]' : 'text-gray-400'}`}>
              {dayInfo.day}
            </span>
            <span className={dayInfo.isOpen ? 'text-gray-600' : 'text-gray-400'}>
              {dayInfo.hours}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}