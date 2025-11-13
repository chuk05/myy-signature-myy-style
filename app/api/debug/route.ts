import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export async function GET() {
  try {
    console.log('=== DEBUG ENDPOINT CALLED ===')
    console.log('Supabase URL:', supabaseUrl ? 'Set' : 'Missing')
    console.log('Supabase Key:', supabaseAnonKey ? 'Set' : 'Missing')

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({
        status: 'error',
        message: 'Missing environment variables',
        environment: {
          hasSupabaseUrl: !!supabaseUrl,
          hasSupabaseKey: !!supabaseAnonKey,
          supabaseUrl: supabaseUrl ? '***' + supabaseUrl.slice(-10) : 'missing',
          supabaseKey: supabaseAnonKey ? '***' + supabaseAnonKey.slice(-10) : 'missing'
        }
      }, { status: 500 })
    }

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Test services table
    const { data: services, error: servicesError } = await supabase
      .from('services')
      .select('*')
      .limit(2)

    // Test staff table
    const { data: staff, error: staffError } = await supabase
      .from('staff')
      .select('*')
      .limit(2)

    // Test appointments table
    const { data: appointments, error: appointmentsError } = await supabase
      .from('appointments')
      .select('*')
      .limit(2)

    return NextResponse.json({
      status: 'success',
      environment: {
        hasSupabaseUrl: !!supabaseUrl,
        hasSupabaseKey: !!supabaseAnonKey
      },
      database: {
        services: servicesError ? { error: servicesError.message } : services,
        staff: staffError ? { error: staffError.message } : staff,
        appointments: appointmentsError ? { error: appointmentsError.message } : appointments
      },
      tables: {
        servicesCount: services?.length || 0,
        staffCount: staff?.length || 0,
        appointmentsCount: appointments?.length || 0
      }
    })

  } catch (error: any) {
    console.error('Debug endpoint error:', error)
    return NextResponse.json({
      status: 'error',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 })
  }
}