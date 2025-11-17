// /app/api/auth/setup-staff/route.ts - FIXED ERROR HANDLING
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, fullName, role, skipConfirmation } = body

    console.log('Setting up staff user:', { email, role, skipConfirmation })

    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: 'Email, password, and full name are required' },
        { status: 400 }
      )
    }

    // Check if service role key is available
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('SUPABASE_SERVICE_ROLE_KEY is not set')
      return NextResponse.json(
        { error: 'Server configuration error - SUPABASE_SERVICE_ROLE_KEY required. Check your .env.local file.' },
        { status: 500 }
      )
    }

    // Create admin client with service role key (bypasses RLS)
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

    let userId: string
    let userEmailConfirmed = false

    try {
      // For development: skip email confirmation
      if (skipConfirmation) {
        console.log('Creating user without email confirmation...')
        
        // Create user and auto-confirm using admin API
        const { data: userData, error: createError } = await supabaseAdmin.auth.admin.createUser({
          email,
          password,
          email_confirm: true, // Auto-confirm the email
          user_metadata: {
            full_name: fullName,
            role: role
          }
        })

        if (createError) {
          console.error('Admin user creation error:', createError)
          return NextResponse.json(
            { error: `User creation failed: ${createError.message}` },
            { status: 400 }
          )
        }

        if (!userData?.user) {
          return NextResponse.json(
            { error: 'No user data returned from creation' },
            { status: 400 }
          )
        }

        userId = userData.user.id
        userEmailConfirmed = true
        console.log('User created and auto-confirmed:', userId)

      } else {
        // Production flow with email confirmation
        console.log('Creating user with email confirmation...')
        
        const { data: authData, error: authError } = await supabaseAdmin.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              role: role
            }
          }
        })

        if (authError) {
          console.error('Auth signup error:', authError)
          return NextResponse.json(
            { error: `Authentication failed: ${authError.message}` },
            { status: 400 }
          )
        }

        if (!authData?.user) {
          return NextResponse.json(
            { error: 'No user data returned from authentication' },
            { status: 400 }
          )
        }

        userId = authData.user.id
        userEmailConfirmed = authData.user.email_confirmed_at !== null
        console.log('User created with confirmation required:', userId)
      }

      // Create profile using admin client (bypasses RLS)
      console.log('Creating profile...')
      const { data: profile, error: profileError } = await supabaseAdmin
        .from('profiles')
        .upsert({
          id: userId,
          email: email,
          full_name: fullName,
          role: role,
          avatar_url: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (profileError) {
        console.error('Profile creation error:', profileError)
        // Don't fail the whole request - try to continue
        console.warn('Profile creation failed, but continuing...')
      } else {
        console.log('Profile created:', profile)
      }

      // Create staff profile if role is staff/admin
      if (role === 'staff' || role === 'admin') {
        console.log('Creating staff profile...')
        
        const { error: staffProfileError } = await supabaseAdmin
          .from('staff_profiles')
          .upsert({
            id: userId,
            position: role === 'admin' ? 'Administrator' : 'Stylist',
            bio: `${role} at Atlanta Premier Hair Design`,
            specialization: ['General Styling'],
            experience_years: 1,
            is_active: userEmailConfirmed, // Active only if email confirmed
            hire_date: new Date().toISOString().split('T')[0],
            phone: null,
            emergency_contact: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })

        if (staffProfileError) {
          console.warn('Staff profile creation warning:', staffProfileError)
          // Don't fail the whole request - staff profile is optional
        } else {
          console.log('Staff profile created')
        }
      }

      return NextResponse.json({ 
        success: true, 
        message: skipConfirmation 
          ? 'Staff user created and auto-confirmed successfully' 
          : 'Staff user created successfully - email confirmation required',
        userId,
        emailConfirmed: userEmailConfirmed
      })

    } catch (supabaseError: any) {
      console.error('Supabase operation error:', supabaseError)
      return NextResponse.json(
        { error: `Database operation failed: ${supabaseError.message}` },
        { status: 500 }
      )
    }

  } catch (error: any) {
    console.error('Setup staff error:', error)
    // Ensure we always return valid JSON
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}