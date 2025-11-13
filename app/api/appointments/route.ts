import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create Supabase client directly in the route
const supabase = createClient(supabaseUrl!, supabaseAnonKey!)

export async function POST(request: Request) {
  console.log('Appointments POST called')
  
  try {
    // Check if Supabase is configured
    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({
        error: 'Server configuration error: Missing Supabase credentials'
      }, { status: 500 })
    }

    const body = await request.json()
    console.log('Request body received')

    const { customer, appointment } = body

    // Validate input
    if (!customer?.email || !customer?.phone || !customer?.full_name) {
      return NextResponse.json({
        error: 'Missing customer information: email, phone, and name are required'
      }, { status: 400 })
    }

    if (!appointment?.staff_id || !appointment?.service_id || !appointment?.date || !appointment?.time) {
      return NextResponse.json({
        error: 'Missing appointment information: staff, service, date, and time are required'
      }, { status: 400 })
    }

    console.log('Creating customer:', customer.email)

    // Create customer
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
      console.error('Customer creation failed:', customerError)
      
      // If customer already exists, try to find them
      if (customerError.code === '23505') {
        const { data: existingCustomer } = await supabase
          .from('customers')
          .select('id')
          .eq('email', customer.email)
          .single()

        if (existingCustomer) {
          console.log('Using existing customer:', existingCustomer.id)
          var customerId = existingCustomer.id
        } else {
          return NextResponse.json({
            error: `Customer error: ${customerError.message}`
          }, { status: 500 })
        }
      } else {
        return NextResponse.json({
          error: `Customer error: ${customerError.message}`
        }, { status: 500 })
      }
    } else {
      console.log('New customer created:', customerData.id)
      var customerId = customerData.id
    }

    // Create appointment
    console.log('Creating appointment for customer:', customerId)

    const { data: appointmentData, error: appointmentError } = await supabase
      .from('appointments')
      .insert({
        customer_id: customerId,
        staff_id: appointment.staff_id,
        service_id: appointment.service_id,
        appointment_date: appointment.date,
        appointment_time: appointment.time,
        status: 'confirmed',
      })
      .select()
      .single()

    if (appointmentError) {
      console.error('Appointment creation failed:', appointmentError)
      return NextResponse.json({
        error: `Appointment error: ${appointmentError.message}`
      }, { status: 500 })
    }

    console.log('Appointment created successfully')
    
    return NextResponse.json({
      success: true,
      message: 'Appointment booked successfully!',
      appointment: appointmentData,
      customer: { id: customerId, ...customer }
    }, { status: 201 })

  } catch (error: any) {
    console.error('Unexpected error in appointments API:', error)
    return NextResponse.json({
      error: `Server error: ${error.message}`
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({
        error: 'Server configuration error'
      }, { status: 500 })
    }

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
      return NextResponse.json({
        error: `Database error: ${error.message}`
      }, { status: 500 })
    }

    return NextResponse.json(data || [])
  } catch (error: any) {
    return NextResponse.json({
      error: `Server error: ${error.message}`
    }, { status: 500 })
  }
}