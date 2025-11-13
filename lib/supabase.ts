import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Use a more generic approach if types are causing issues
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Or for better type safety with your existing structure:
export type Tables = {
  appointments: any
  customers: any
  services: any
  staff: any
  staff_availability: any
}

export const supabaseWithTypes = createClient<{
  public: {
    Tables: Tables
  }
}>(supabaseUrl, supabaseAnonKey)