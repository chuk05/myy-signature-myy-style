// /app/setup-staff/page.tsx - UPDATED WITH EMAIL CONFIRMATION
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase/client'
import { UserPlus, Mail, Lock, User, ArrowLeft, Eye, EyeOff, Send } from 'lucide-react'
import Link from 'next/link'

export default function SetupStaff() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    role: 'staff' as 'staff' | 'admin'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setMessage('')

    try {
      console.log('Starting staff creation process...')

      // 1. Create auth user with email confirmation
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            role: formData.role
          },
          emailRedirectTo: `${window.location.origin}/auth/confirm`
        }
      })

      console.log('Auth response:', { authData, authError })

      if (authError) {
        console.error('Auth error details:', authError)
        throw new Error(`Authentication failed: ${authError.message}`)
      }

      if (!authData.user) {
        throw new Error('No user data returned from authentication')
      }

      console.log('Auth user created:', authData.user.id)

      // 2. Create profile immediately (even before email confirmation)
      console.log('Creating profile...')
      const { data: newProfile, error: createError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          email: formData.email,
          full_name: formData.fullName,
          role: formData.role,
          avatar_url: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (createError) {
        console.error('Profile creation error:', createError)
        // If profile exists, update it
        if (createError.code === '23505') {
          console.log('Profile exists, updating...')
          const { data: updatedProfile, error: updateError } = await supabase
            .from('profiles')
            .update({
              email: formData.email,
              full_name: formData.fullName,
              role: formData.role,
              updated_at: new Date().toISOString()
            })
            .eq('id', authData.user.id)
            .select()
            .single()

          if (updateError) throw updateError
        } else {
          throw createError
        }
      }

      // 3. Create staff profile if role is staff/admin
      if (formData.role === 'staff' || formData.role === 'admin') {
        console.log('Creating staff profile...')
        
        const { error: staffCreateError } = await supabase
          .from('staff_profiles')
          .insert({
            id: authData.user.id,
            position: formData.role === 'admin' ? 'Administrator' : 'Stylist',
            bio: `${formData.role} at Myy Signature Myy Style`,
            specialization: ['General Styling'],
            experience_years: 1,
            is_active: false, // Inactive until email confirmed
            hire_date: new Date().toISOString().split('T')[0],
            phone: null,
            emergency_contact: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })

        if (staffCreateError) {
          console.warn('Staff profile creation failed:', staffCreateError)
        }
      }

      // Success message with email confirmation info
      setMessage(`
        ✅ Staff user created successfully!
        
        An email confirmation link has been sent to ${formData.email}.
        Please check your email and click the confirmation link to activate your account.
        
        After confirmation, you'll be able to login with your credentials.
      `)

      // Reset form
      setFormData({ email: '', password: '', fullName: '', role: 'staff' })

    } catch (error: any) {
      console.error('Complete error details:', error)
      setError(error.message || 'Failed to create staff user. Check console for details.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-[#FFD700] p-3 rounded-full">
              <UserPlus className="w-8 h-8 text-[#1A1A1A]" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white">Setup Staff User</h2>
          <p className="mt-2 text-gray-300">
            Create staff/admin user with email confirmation
          </p>
        </div>

        {/* Back to Login */}
        <Link
          href="/auth/login"
          className="flex items-center text-[#FFD700] hover:text-[#B39700] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Login
        </Link>

        {/* Setup Form */}
        <form className="mt-8 space-y-6 bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm">
              <strong>Error:</strong> {error}
            </div>
          )}

          {message && (
            <div className="bg-green-500/20 border border-green-500 text-green-200 px-4 py-3 rounded-lg text-sm whitespace-pre-line">
              {message}
            </div>
          )}

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                placeholder="Enter full name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                placeholder="Enter email address"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="block w-full pl-10 pr-10 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                placeholder="Enter password (min 6 characters)"
                minLength={6}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={(e) => handleInputChange('role', e.target.value as 'staff' | 'admin')}
              className="block w-full py-3 bg-white/5 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
            >
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg bg-[#FFD700] text-[#1A1A1A] font-semibold hover:bg-[#B39700] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFD700] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <>
                  <Send className="w-4 h-4 mr-2 animate-pulse" />
                  Sending Confirmation...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Create Staff User & Send Email
                </>
              )}
            </button>
          </div>
        </form>

        {/* Info */}
        <div className="text-center text-gray-400 text-sm">
          <p>User will receive an email confirmation link to activate their account</p>
          <p className="mt-1">Account will be inactive until email is confirmed</p>
        </div>
      </div>
    </div>
  )
}