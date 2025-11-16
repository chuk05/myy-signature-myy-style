// /app/api/auth/setup-profile/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, email, fullName, role, staffProfile } = body

    console.log('Received setup profile request:', { userId, email, fullName, role })

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    // Check if service role key is available
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('SUPABASE_SERVICE_ROLE_KEY is not set')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Create admin client with service role key
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    )

    let profileResult = null
    let staffResult = null

    // Create profile if user data is provided
    if (email && fullName && role) {
      const { data, error: profileError } = await supabaseAdmin
        .from('profiles')
        .insert({
          id: userId,
          email,
          full_name: fullName,
          role
        })
        .select()
        .single()

      if (profileError) {
        console.error('Profile creation error:', profileError)
        return NextResponse.json(
          { error: `Profile creation failed: ${profileError.message}` },
          { status: 500 }
        )
      }
      profileResult = data
    }

    // Create staff profile if provided
    if (staffProfile) {
      const { data, error: staffError } = await supabaseAdmin
        .from('staff_profiles')
        .insert({
          id: userId,
          ...staffProfile
        })
        .select()
        .single()

      if (staffError) {
        console.error('Staff profile creation error:', staffError)
        staffResult = { error: staffError.message }
      } else {
        staffResult = data
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Profile created successfully',
      profile: profileResult,
      staffProfile: staffResult
    })
  } catch (error: any) {
    console.error('Setup profile error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}