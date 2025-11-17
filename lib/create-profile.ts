// /lib/create-profile.ts
import { supabase } from '@/utils/supabase/server'

export async function createUserProfile(userId: string, email: string, role: 'customer' | 'staff' | 'admin' = 'customer') {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .insert([{
        id: userId,
        email: email,
        full_name: '',
        avatar_url: null,
        role: role,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single()

    if (error) {
      console.error('Error creating profile:', error)
      return null
    }

    console.log('Profile created successfully:', data)
    return data
  } catch (error) {
    console.error('Error in createUserProfile:', error)
    return null
  }
}