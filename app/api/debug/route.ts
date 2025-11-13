import { NextResponse } from 'next/server'
import { supabase, testSupabaseConnection } from '@/lib/supabase'

export async function GET() {
  try {
    const connectionOk = await testSupabaseConnection()
    
    // Test reading from services table
    const { data: services, error: servicesError } = await supabase
      .from('services')
      .select('*')
      .limit(2)

    // Test reading from staff table  
    const { data: staff, error: staffError } = await supabase
      .from('staff')
      .select('*')
      .limit(2)

    return NextResponse.json({
      connection: connectionOk ? 'OK' : 'FAILED',
      environment: {
        hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      },
      services: servicesError ? servicesError.message : services,
      staff: staffError ? staffError.message : staff,
    })
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      stack: error.stack
    }, { status: 500 })
  }
}