'use client'

import { useState, useEffect } from 'react'

interface DateTimeSelectionProps {
  staffId: string | null
  onTimeSelect: (date: string, time: string) => void
}

export default function DateTimeSelection({ staffId, onTimeSelect }: DateTimeSelectionProps) {
  const [selectedDate, setSelectedDate] = useState('')
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [selectedTime, setSelectedTime] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (staffId && selectedDate) {
      fetchAvailableSlots()
    }
  }, [staffId, selectedDate])

  const fetchAvailableSlots = async () => {
    if (!staffId || !selectedDate) return
    
    setLoading(true)
    try {
      const response = await fetch(`/api/availability?staffId=${staffId}&date=${selectedDate}`)
      const slots = await response.json()
      setAvailableSlots(slots)
    } catch (error) {
      console.error('Error fetching available slots:', error)
      setAvailableSlots([])
    } finally {
      setLoading(false)
    }
  }

  const handleDateChange = (date: string) => {
    setSelectedDate(date)
    setSelectedTime('')
    setAvailableSlots([])
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    if (selectedDate) {
      onTimeSelect(selectedDate, time)
    }
  }

  // Generate next 14 days for date selection
  const dateOptions = Array.from({ length: 14 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    return date.toISOString().split('T')[0]
  })

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#222222]">Select Date & Time</h3>
      
      {/* Date Selection */}
      <div>
        <label className="block text-sm font-medium text-[#222222] mb-2">Date</label>
        <select
          value={selectedDate}
          onChange={(e) => handleDateChange(e.target.value)}
          className="w-full p-3 border border-[#F0F0F0] rounded-lg focus:border-[#6A8EA4] focus:outline-none"
          disabled={!staffId}
        >
          <option value="">Select a date</option>
          {dateOptions.map((date) => (
            <option key={date} value={date}>
              {new Date(date).toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
              })}
            </option>
          ))}
        </select>
      </div>

      {/* Time Selection */}
      <div>
        <label className="block text-sm font-medium text-[#222222] mb-2">Time</label>
        {loading ? (
          <div className="text-center py-4">Loading available times...</div>
        ) : availableSlots.length > 0 ? (
          <div className="grid grid-cols-4 gap-2">
            {availableSlots.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => handleTimeSelect(time)}
                className={`p-2 border rounded text-sm ${
                  selectedTime === time
                    ? 'border-[#6A8EA4] bg-[#6A8EA4] text-white'
                    : 'border-[#F0F0F0] hover:border-[#6A8EA4]'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        ) : selectedDate ? (
          <div className="text-center py-4 text-gray-500">
            No available times for selected date
          </div>
        ) : null}
      </div>
    </div>
  )
}