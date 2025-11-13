import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data: appointments, error } = await supabase
      .from('appointments')
      .select(`
        *,
        customers (*),
        staff (*),
        services (*)
      `)
      .order('appointment_date', { ascending: true })
      .order('appointment_time', { ascending: true })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(appointments)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { customer, appointment } = await request.json()

    // First, create or find customer
    const { data: customerData, error: customerError } = await supabase
      .from('customers')
      .upsert({
        email: customer.email,
        phone: customer.phone,
        full_name: customer.full_name
      }, {
        onConflict: 'email',
        ignoreDuplicates: false
      })
      .select()
      .single()

    if (customerError) {
      console.error('Customer error:', customerError)
      return NextResponse.json({ error: customerError.message }, { status: 500 })
    }

    if (!customerData) {
      return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 })
    }

    // Then create appointment
    const { data: appointmentData, error: appointmentError } = await supabase
      .from('appointments')
      .insert({
        customer_id: customerData.id,
        staff_id: appointment.staff_id,
        service_id: appointment.service_id,
        appointment_date: appointment.date,
        appointment_time: appointment.time,
        status: 'confirmed'
      })
      .select()
      .single()

    if (appointmentError) {
      console.error('Appointment error:', appointmentError)
      return NextResponse.json({ error: appointmentError.message }, { status: 500 })
    }

    return NextResponse.json({ 
      appointment: appointmentData, 
      customer: customerData 
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}