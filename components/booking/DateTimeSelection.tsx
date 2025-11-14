'use client'

import { useState, useEffect } from 'react'
import { Staff } from '@/types/database'

interface DateTimeSelectionProps {
  selectedStaff: Staff | null
  onDateTimeSelect: (date: string, time: string) => void
}

export default function DateTimeSelection({ 
  selectedStaff, 
  onDateTimeSelect 
}: DateTimeSelectionProps) {
  const [selectedDate, setSelectedDate] = useState('')
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [selectedTime, setSelectedTime] = useState('')
  const [loadingSlots, setLoadingSlots] = useState(false)

  useEffect(() => {
    if (selectedStaff?.id && selectedDate) {
      fetchAvailableSlots()
    }
  }, [selectedStaff?.id, selectedDate])

  const fetchAvailableSlots = async () => {
    if (!selectedStaff?.id || !selectedDate) return
    
    setLoadingSlots(true)
    try {
      const response = await fetch(`/api/availability?staffId=${selectedStaff.id}&date=${selectedDate}`)
      if (response.ok) {
        const slots = await response.json()
        setAvailableSlots(slots)
      } else {
        setAvailableSlots([])
      }
    } catch (error) {
      console.error('Error fetching available slots:', error)
      setAvailableSlots([])
    } finally {
      setLoadingSlots(false)
    }
  }

  const handleDateChange = (date: string) => {
    setSelectedDate(date)
    setSelectedTime('')
    setAvailableSlots([])
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    onDateTimeSelect(selectedDate, time)
  }

  // Generate next 30 days for date selection
  const dateOptions = Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    return date.toISOString().split('T')[0]
  })

  // Filter out weekends (optional - you can remove this if you work weekends)
  const filteredDateOptions = dateOptions.filter(date => {
    const dayOfWeek = new Date(date).getDay()
    return dayOfWeek !== 0 && dayOfWeek !== 6 // Remove Sunday (0) and Saturday (6)
  })

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[#222222]">Select Date & Time</h3>
      
      <div>
        <label className="block text-sm font-medium text-[#222222] mb-2">Date *</label>
        <select
          value={selectedDate}
          onChange={(e) => handleDateChange(e.target.value)}
          className="w-full p-3 border border-[#F0F0F0] rounded-lg focus:border-[#6A8EA4] focus:outline-none"
          disabled={!selectedStaff}
          required
        >
          <option value="">Select a date</option>
          {filteredDateOptions.map((date) => (
            <option key={date} value={date}>
              {new Date(date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </option>
          ))}
        </select>
        {!selectedStaff && (
          <p className="text-sm text-gray-500 mt-1">Please select a stylist first</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#222222] mb-2">Time *</label>
        {loadingSlots ? (
          <div className="text-center py-4 text-gray-500">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#6A8EA4] mx-auto mb-2"></div>
            Loading available times...
          </div>
        ) : availableSlots.length > 0 ? (
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {availableSlots.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => handleTimeSelect(time)}
                className={`p-3 border rounded-lg text-sm font-medium transition-all ${
                  selectedTime === time
                    ? 'border-[#6A8EA4] bg-[#6A8EA4] text-white shadow-md'
                    : 'border-[#F0F0F0] bg-white hover:border-[#6A8EA4] hover:bg-[#6A8EA4] hover:bg-opacity-5'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        ) : selectedDate ? (
          <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
            <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            No available times for {new Date(selectedDate).toLocaleDateString()}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
            Select a date to see available times
          </div>
        )}
      </div>

      {selectedTime && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-green-800 font-medium">
              Selected: {new Date(selectedDate).toLocaleDateString()} at {selectedTime}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}