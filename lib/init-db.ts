import { supabase } from '@/utils/supabase/client'

export async function initializeDatabase() {
  try {
    // Check if profiles table exists by making a simple query
    const { error: profilesError } = await supabase
      .from('profiles')
      .select('count')
      .limit(1)

    if (profilesError) {
      console.log('Profiles table might not exist:', profilesError.message)
      return false
    }

    // Check if staff_profiles table exists
    const { error: staffProfilesError } = await supabase
      .from('staff_profiles')
      .select('count')
      .limit(1)

    if (staffProfilesError) {
      console.log('Staff profiles table might not exist:', staffProfilesError.message)
      return false
    }

    return true
  } catch (error) {
    console.error('Error initializing database:', error)
    return false
  }
}