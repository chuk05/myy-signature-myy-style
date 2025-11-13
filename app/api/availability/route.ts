import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const staffId = searchParams.get('staffId')
    const date = searchParams.get('date')

    if (!staffId || !date) {
      return NextResponse.json({ error: 'Staff ID and date are required' }, { status: 400 })
    }

    const appointmentDate = new Date(date)
    const dayOfWeek = appointmentDate.getDay()

    // Get staff availability for this day
    const { data: availability, error: availabilityError } = await supabase
      .from('staff_availability')
      .select('*')
      .eq('staff_id', staffId)
      .eq('day_of_week', dayOfWeek)
      .eq('is_available', true)
      .single()

    if (availabilityError || !availability) {
      return NextResponse.json({ error: 'Staff not available on this day' }, { status: 400 })
    }

    // Get existing appointments for this staff on this date
    const { data: existingAppointments, error: appointmentsError } = await supabase
      .from('appointments')
      .select('appointment_time, services(duration)')
      .eq('staff_id', staffId)
      .eq('appointment_date', date)
      .eq('status', 'confirmed')

    if (appointmentsError) {
      return NextResponse.json({ error: appointmentsError.message }, { status: 500 })
    }

    // Generate available time slots
    const availableSlots = generateTimeSlots(availability, existingAppointments || [])
    
    return NextResponse.json(availableSlots)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function generateTimeSlots(availability: any, existingAppointments: any[]) {
  const slots = []
  const start = new Date(`1970-01-01T${availability.start_time}`)
  const end = new Date(`1970-01-01T${availability.end_time}`)
  
  // 30-minute intervals
  const interval = 30 * 60 * 1000
  
  for (let time = start.getTime(); time < end.getTime(); time += interval) {
    const slotTime = new Date(time).toTimeString().slice(0, 5)
    
    // Check if slot is booked
    const isBooked = existingAppointments.some(apt => 
      apt.appointment_time.slice(0, 5) === slotTime
    )
    
    if (!isBooked) {
      slots.push(slotTime)
    }
  }
  
  return slots
}