// /utils/supabase/server.ts
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Create and export the Supabase client instance
export const supabase = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    }
  }
)

// Alternative client creation function (if needed for specific cases)
export function createClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    }
  )
}

// Helper function that accepts an existing session
export async function getCurrentUser(sessionToken?: string) {
  const client = createClient()
  
  if (sessionToken) {
    // Set the session for this request
    client.auth.setSession({
      access_token: sessionToken,
      refresh_token: ''
    })
  }
  
  const { data: { user }, error } = await client.auth.getUser()
  
  if (error) {
    console.error('Error getting user:', error)
    return null
  }
  
  return user
}

export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession()
  
  if (error) {
    console.error('Error getting session:', error)
    return null
  }
  
  return session
}

export async function isUserStaff(sessionToken?: string) {
  const user = await getCurrentUser(sessionToken)
  if (!user) return false
  
  const client = createClient()
  const { data: profile, error } = await client
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (error || !profile) {
    return false
  }

  return profile.role === 'staff' || profile.role === 'admin'
}

export async function isUserAdmin(sessionToken?: string) {
  const user = await getCurrentUser(sessionToken)
  if (!user) return false
  
  const client = createClient()
  const { data: profile, error } = await client
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (error || !profile) {
    return false
  }

  return profile.role === 'admin'
}

// Helper to get user profile with role
export async function getUserProfile(userId: string) {
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error getting user profile:', error)
    return null
  }

  return profile
}

// Helper to get staff profile
export async function getStaffProfile(userId: string) {
  const { data: staffProfile, error } = await supabase
    .from('staff_profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error getting staff profile:', error)
    return null
  }

  return staffProfile
}

// Check if user can access admin routes
export async function canAccessAdmin(sessionToken?: string) {
  return await isUserStaff(sessionToken)
}

// Get complete user data (profile + staff profile if applicable)
export async function getCompleteUserData(sessionToken?: string) {
  const user = await getCurrentUser(sessionToken)
  if (!user) return null

  const profile = await getUserProfile(user.id)
  if (!profile) return null

  let staffProfile = null
  if (profile.role === 'staff' || profile.role === 'admin') {
    staffProfile = await getStaffProfile(user.id)
  }

  return {
    user,
    profile,
    staffProfile
  }
}

// Export types for better TypeScript support
export type UserRole = 'customer' | 'staff' | 'admin'

// Service management helpers
export async function getActiveServices() {
  const { data: services, error } = await supabase
    .from('services')
    .select(`
      *,
      service_categories (
        name,
        description
      )
    `)
    .eq('is_active', true)
    .order('display_order')

  if (error) {
    console.error('Error fetching services:', error)
    return []
  }

  return services
}

export async function getServiceCategories() {
  const { data: categories, error } = await supabase
    .from('service_categories')
    .select('*')
    .eq('is_active', true)
    .order('display_order')

  if (error) {
    console.error('Error fetching service categories:', error)
    return []
  }

  return categories
}

export async function getServicePackages() {
  const { data: packages, error } = await supabase
    .from('service_packages')
    .select('*')
    .eq('is_active', true)
    .order('display_order')

  if (error) {
    console.error('Error fetching service packages:', error)
    return []
  }

  return packages
}

// Staff management helpers
export async function getStaffMembers() {
  const { data: staff, error } = await supabase
    .from('profiles')
    .select(`
      *,
      staff_profiles (*)
    `)
    .in('role', ['staff', 'admin'])
    .eq('staff_profiles.is_active', true)
    .order('full_name')

  if (error) {
    console.error('Error fetching staff members:', error)
    return []
  }

  return staff
}

export async function getStaffServices(staffId: string) {
  const { data: services, error } = await supabase
    .from('staff_service_assignments')
    .select(`
      *,
      services (*),
      staff_specializations (*)
    `)
    .eq('staff_id', staffId)
    .eq('is_active', true)

  if (error) {
    console.error('Error fetching staff services:', error)
    return []
  }

  return services
}