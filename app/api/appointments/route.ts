import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  console.log('=== APPOINTMENT API CALL STARTED ===')
  
  try {
    const body = await request.json()
    console.log('Request body:', JSON.stringify(body, null, 2))
    
    const { customer, appointment } = body

    // Validate required fields
    if (!customer?.email || !customer?.phone || !customer?.full_name) {
      console.log('Missing customer fields')
      return NextResponse.json(
        { error: 'Missing required customer fields' },
        { status: 400 }
      )
    }

    if (!appointment?.staff_id || !appointment?.service_id || !appointment?.date || !appointment?.time) {
      console.log('Missing appointment fields')
      return NextResponse.json(
        { error: 'Missing required appointment fields' },
        { status: 400 }
      )
    }

    console.log('Inserting customer:', customer.email)
    
    // Insert customer
    const { data: customerData, error: customerError } = await supabase
      .from('customers')
      .insert({
        email: customer.email,
        phone: customer.phone,
        full_name: customer.full_name,
      })
      .select()
      .single()

    if (customerError) {
      console.error('Customer insert error:', customerError)
      return NextResponse.json({ 
        error: `Customer error: ${customerError.message}`,
        details: customerError 
      }, { status: 500 })
    }

    console.log('Customer created:', customerData?.id)

    // Insert appointment  
    console.log('Inserting appointment for staff:', appointment.staff_id)
    
    const { data: appointmentData, error: appointmentError } = await supabase
      .from('appointments')
      .insert({
        customer_id: customerData.id,
        staff_id: appointment.staff_id,
        service_id: appointment.service_id,
        appointment_date: appointment.date,
        appointment_time: appointment.time,
        status: 'confirmed',
      })
      .select()
      .single()

    if (appointmentError) {
      console.error('Appointment insert error:', appointmentError)
      return NextResponse.json({ 
        error: `Appointment error: ${appointmentError.message}`,
        details: appointmentError 
      }, { status: 500 })
    }

    console.log('Appointment created successfully')
    
    return NextResponse.json({
      success: true,
      appointment: appointmentData,
      customer: customerData
    })

  } catch (error: any) {
    console.error('Unexpected error in appointment API:', error)
    return NextResponse.json({ 
      error: `Unexpected error: ${error.message}`,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    console.log('Fetching appointments...')
    
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        customers (*),
        services (*),
        staff (*)
      `)
      .order('appointment_date', { ascending: false })

    if (error) {
      console.error('GET appointments error:', error)
      throw error
    }

    console.log(`Found ${data?.length || 0} appointments`)
    return NextResponse.json(data || [])
    
  } catch (error: any) {
    console.error('GET appointments unexpected error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}