'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/utils/supabase/client'
import { Profile, StaffProfile } from '@/types/database'

interface AuthContextType {
  user: User | null
  profile: Profile | null
  staffProfile: StaffProfile | null
  session: Session | null
  isLoading: boolean
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [staffProfile, setStaffProfile] = useState<StaffProfile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchProfile = async (userId: string) => {
    try {
      // First try to fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (profileError) {
        console.log('Profile fetch error:', profileError)
        // If profile doesn't exist, create one
        if (profileError.code === 'PGRST116') {
          const { data: userData } = await supabase.auth.getUser()
          if (userData.user) {
            const { data: newProfile } = await supabase
              .from('profiles')
              .insert({
                id: userData.user.id,
                email: userData.user.email,
                full_name: userData.user.user_metadata?.full_name || userData.user.email,
                role: 'customer'
              })
              .select()
              .single()
            
            if (newProfile) {
              setProfile(newProfile)
            }
          }
          return
        }
        throw profileError
      }

      setProfile(profileData)

      // Try to fetch staff profile if user is staff or admin
      if (profileData?.role === 'staff' || profileData?.role === 'admin') {
        try {
          const { data: staffData, error: staffError } = await supabase
            .from('staff_profiles')
            .select('*')
            .eq('id', userId)
            .single()

          if (!staffError && staffData) {
            setStaffProfile(staffData)
          } else if (staffError && staffError.code === 'PGRST116') {
            // Staff profile doesn't exist, that's fine
            console.log('No staff profile found for user')
          }
        } catch (staffError) {
          console.log('Error fetching staff profile:', staffError)
          // Continue without staff profile
        }
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error)
    }
  }

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setSession(session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await fetchProfile(session.user.id)
        }
      } catch (error) {
        console.error('Error getting session:', error)
      } finally {
        setIsLoading(false)
      }
    }

    getSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      
      if (session?.user) {
        await fetchProfile(session.user.id)
      } else {
        setProfile(null)
        setStaffProfile(null)
      }
      
      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        staffProfile,
        session,
        isLoading,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}