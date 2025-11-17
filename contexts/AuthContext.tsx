// /contexts/AuthContext.tsx
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
      console.log('Fetching profile for user:', userId)
      
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (profileError) {
        console.log('Profile fetch error:', profileError)
        
        // If profile doesn't exist, create a default one
        if (profileError.code === 'PGRST116') {
          console.log('Profile not found, creating default profile...')
          
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert([{
              id: userId,
              email: user?.email || '',
              full_name: user?.user_metadata?.full_name || '',
              role: 'customer'
            }])
            .select()
            .single()

          if (!createError && newProfile) {
            console.log('Default profile created:', newProfile)
            setProfile(newProfile)
            return newProfile
          }
        }
        return null
      }

      console.log('Profile fetched:', profileData)
      setProfile(profileData)

      // Fetch staff profile if user is staff/admin
      if (profileData?.role === 'staff' || profileData?.role === 'admin') {
        try {
          const { data: staffData, error: staffError } = await supabase
            .from('staff_profiles')
            .select('*')
            .eq('id', userId)
            .single()

          if (!staffError && staffData) {
            console.log('Staff profile fetched:', staffData)
            setStaffProfile(staffData)
          } else {
            console.log('No staff profile found or error:', staffError)
            setStaffProfile(null)
          }
        } catch (staffError) {
          console.log('Staff profile fetch error:', staffError)
          setStaffProfile(null)
        }
      } else {
        setStaffProfile(null)
      }

      return profileData
    } catch (error) {
      console.error('Error in fetchProfile:', error)
      return null
    }
  }

  useEffect(() => {
    // Initial session check
    const initializeAuth = async () => {
      try {
        console.log('Initializing auth...')
        const { data: { session: currentSession } } = await supabase.auth.getSession()
        console.log('Initial session:', currentSession?.user?.email)
        
        setSession(currentSession)
        setUser(currentSession?.user ?? null)
        
        if (currentSession?.user) {
          await fetchProfile(currentSession.user.id)
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('Auth state changed:', event, currentSession?.user?.email)
        
        setSession(currentSession)
        setUser(currentSession?.user ?? null)
        
        if (currentSession?.user) {
          await fetchProfile(currentSession.user.id)
        } else {
          setProfile(null)
          setStaffProfile(null)
        }
        
        setIsLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    try {
      console.log('Signing out...')
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      // Clear local state immediately
      setUser(null)
      setProfile(null)
      setStaffProfile(null)
      setSession(null)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id)
    }
  }

  const value = {
    user,
    profile,
    staffProfile,
    session,
    isLoading,
    signOut,
    refreshProfile,
  }

  return (
    <AuthContext.Provider value={value}>
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