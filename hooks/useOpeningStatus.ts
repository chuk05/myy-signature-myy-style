'use client'

import { useState, useEffect } from 'react'
import { salonInfo } from '@/lib/constants'

export function useOpeningStatus() {
  const [isOpen, setIsOpen] = useState(false)
  const [nextOpening, setNextOpening] = useState<string>('')

  useEffect(() => {
    const checkOpeningStatus = () => {
      const now = new Date()
      const currentHour = now.getHours()
      const currentDay = now.getDay() // 0 = Sunday, 6 = Saturday
      const currentMinutes = now.getMinutes()
      
      // Convert current time to decimal for easier comparison
      const currentTime = currentHour + (currentMinutes / 60)
      
      // Salon is closed on Mondays (day 1)
      if (currentDay === 1) {
        setIsOpen(false)
        calculateNextOpening(now)
        return
      }
      
      let openingHour: number | null = null
      let closingHour: number | null = null
      
      switch (currentDay) {
        case 0: // Sunday
          openingHour = salonInfo.hours.sunday.open
          closingHour = salonInfo.hours.sunday.close
          break
        case 2: // Tuesday
          openingHour = salonInfo.hours.tuesday.open
          closingHour = salonInfo.hours.tuesday.close
          break
        case 3: // Wednesday
          openingHour = salonInfo.hours.wednesday.open
          closingHour = salonInfo.hours.wednesday.close
          break
        case 4: // Thursday
          openingHour = salonInfo.hours.thursday.open
          closingHour = salonInfo.hours.thursday.close
          break
        case 5: // Friday
          openingHour = salonInfo.hours.friday.open
          closingHour = salonInfo.hours.friday.close
          break
        case 6: // Saturday
          openingHour = salonInfo.hours.saturday.open
          closingHour = salonInfo.hours.saturday.close
          break
        default: // Monday (closed)
          setIsOpen(false)
          calculateNextOpening(now)
          return
      }
      
      if (openingHour !== null && closingHour !== null) {
        setIsOpen(currentTime >= openingHour && currentTime < closingHour)
      } else {
        setIsOpen(false)
      }
      
      calculateNextOpening(now)
    }

    const calculateNextOpening = (now: Date) => {
      const currentDay = now.getDay()
      const currentHour = now.getHours()
      const currentMinutes = now.getMinutes()
      const currentTime = currentHour + (currentMinutes / 60)
      
      // Find next opening time
      let daysToAdd = 1
      let nextOpenDay = currentDay
      let nextOpenTime: number | null = null
      
      while (daysToAdd <= 7) {
        nextOpenDay = (currentDay + daysToAdd) % 7
        let openingHour: number | null = null
        
        switch (nextOpenDay) {
          case 0: // Sunday
            openingHour = salonInfo.hours.sunday.open
            break
          case 2: // Tuesday
            openingHour = salonInfo.hours.tuesday.open
            break
          case 3: // Wednesday
            openingHour = salonInfo.hours.wednesday.open
            break
          case 4: // Thursday
            openingHour = salonInfo.hours.thursday.open
            break
          case 5: // Friday
            openingHour = salonInfo.hours.friday.open
            break
          case 6: // Saturday
            openingHour = salonInfo.hours.saturday.open
            break
        }
        
        if (openingHour !== null) {
          // If we're checking today and it's before closing, next opening is tomorrow
          if (daysToAdd === 0 && currentTime < openingHour) {
            nextOpenTime = openingHour
            break
          } else if (daysToAdd > 0) {
            nextOpenTime = openingHour
            break
          }
        }
        
        daysToAdd++
      }
      
      if (nextOpenTime !== null) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const nextDayName = days[nextOpenDay]
        const nextTimeFormatted = formatTime(nextOpenTime)
        setNextOpening(`Opens ${nextDayName} at ${nextTimeFormatted}`)
      } else {
        setNextOpening('Closed temporarily')
      }
    }

    const formatTime = (time: number): string => {
      const hours = Math.floor(time)
      const minutes = Math.round((time - hours) * 60)
      const period = hours >= 12 ? 'PM' : 'AM'
      const displayHours = hours % 12 || 12
      return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`
    }

    checkOpeningStatus()
    // Update status every minute
    const interval = setInterval(checkOpeningStatus, 60000)
    
    return () => clearInterval(interval)
  }, [])

  return { isOpen, nextOpening }
}