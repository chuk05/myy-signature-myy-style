import { NextResponse } from 'next/server'
import { supabase } from '@/utils/supabase/server'

export async function GET() {
  try {
    
    // Test basic Supabase connection
    const { data, error } = await supabase.from('profiles').select('count').limit(1)
    
    if (error) {
      return NextResponse.json({ 
        status: 'error', 
        message: 'Supabase connection failed',
        error: error.message 
      }, { status: 500 })
    }
    
    // Test auth connection
    const { data: authData, error: authError } = await supabase.auth.getSession()
    
    if (authError) {
      return NextResponse.json({ 
        status: 'error', 
        message: 'Supabase auth failed',
        error: authError.message 
      }, { status: 500 })
    }
    
    return NextResponse.json({ 
      status: 'success', 
      message: 'Supabase connected successfully',
      auth: !!authData?.session,
      data 
    })
  } catch (error: any) {
    return NextResponse.json({ 
      status: 'error', 
      message: 'Server error',
      error: error.message 
    }, { status: 500 })
  }
}