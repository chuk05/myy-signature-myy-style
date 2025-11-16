// /utils/supabase/server.ts
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Regular client for most operations
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

// Service role client for admin operations (profile creation)
export const supabaseAdmin = createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // You need to add this to your .env.local
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)

// ... rest of your existing code