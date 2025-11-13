import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('Supabase URL exists:', !!supabaseUrl)
console.log('Supabase Key exists:', !!supabaseAnonKey)

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. ' +
    `URL: ${supabaseUrl ? 'Set' : 'Missing'}, ` +
    `Key: ${supabaseAnonKey ? 'Set' : 'Missing'}`
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Test function to verify connection
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