// /lib/supabase.ts - PROPERLY UNIFIED VERSION
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Simple universal client - let Supabase handle environment detection
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  }
})

// Test function
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .limit(1)
    
    if (error) {
      console.error('Supabase connection test failed:', error)
      return false
    }
    
    console.log('Supabase connection test passed')
    return true
  } catch (error) {
    console.error('Supabase connection test error:', error)
    return false
  }
}

// Helper function to get current user with profile
export async function getCurrentUserWithProfile() {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return { user: null, profile: null, error: authError }
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError) {
      console.error('Error fetching profile:', profileError)
      return { user, profile: null, error: profileError }
    }

    return { user, profile, error: null }
  } catch (error) {
    console.error('Error in getCurrentUserWithProfile:', error)
    return { user: null, profile: null, error }
  }
}