import { NextResponse } from 'next/server'
import { supabase } from '@/utils/supabase/server'

export async function POST() {
  try {

    // First, try to sign up a new user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: 'staff@example.com',
      password: 'staff123',
      options: {
        data: {
          full_name: 'Test Staff',
          role: 'staff'
        }
      }
    })

    if (authError) {
      // If user already exists, try to sign in to get the user ID
      if (authError.message.includes('already registered')) {
        const { data: signInData } = await supabase.auth.signInWithPassword({
          email: 'staff@example.com',
          password: 'staff123'
        })
        
        if (signInData?.user) {
          // Create profile and staff profile for existing user
          await createProfiles(supabase, signInData.user)
          return NextResponse.json({ 
            success: true, 
            message: 'Staff user profiles updated successfully',
            user: signInData.user 
          })
        }
      }
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    if (authData?.user) {
      await createProfiles(supabase, authData.user)
      return NextResponse.json({ 
        success: true, 
        message: 'Staff user created successfully',
        user: authData.user 
      })
    }

    return NextResponse.json({ error: 'Failed to create user' }, { status: 400 })
  } catch (error: any) {
    console.error('Setup error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

async function createProfiles(supabase: any, user: any) {
  // Create profile
  const { error: profileError } = await supabase
    .from('profiles')
    .upsert({
      id: user.id,
      email: user.email,
      full_name: 'Test Staff',
      role: 'staff'
    })

  if (profileError) {
    console.error('Error creating profile:', profileError)
  }

  // Create staff profile
  const { error: staffProfileError } = await supabase
    .from('staff_profiles')
    .upsert({
      id: user.id,
      position: 'Senior Stylist',
      bio: 'Experienced hair stylist with 5+ years in the industry.',
      specialization: ['Hair Coloring', 'Haircuts', 'Styling'],
      experience_years: 5,
      phone: '+1234567890'
    })

  if (staffProfileError) {
    console.error('Error creating staff profile:', staffProfileError)
  }
}