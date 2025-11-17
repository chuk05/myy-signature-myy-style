// /app/setup-staff/page.tsx - UPDATED TO HANDLE RLS AND USE API ROUTE
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
// import { supabase } from '@/utils/supabase/client'
import { UserPlus, Mail, Lock, User, ArrowLeft, Eye, EyeOff, Send, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function SetupStaff() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    role: 'staff' as 'staff' | 'admin',
    skipConfirmation: false
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
    
      // Use the API route to handle user creation (bypasses RLS)
      const response = await fetch('/api/auth/setup-staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          role: formData.role,
          skipConfirmation: formData.skipConfirmation
        })
      })
    
      let result
      try {
        result = await response.json()
      } catch (jsonError) {
        console.error('JSON parse error:', jsonError)
        throw new Error('Server returned invalid response. Check if SUPABASE_SERVICE_ROLE_KEY is set.')
      }
    
      if (!response.ok) {
        throw new Error(result.error || `Server error: ${response.status}`)
      }
    
      if (result.success) {
        if (formData.skipConfirmation) {
          setMessage(`
            ✅ Staff user created successfully (Development Mode)!
            
            User: ${formData.email}
            Password: ${formData.password}
            Role: ${formData.role}
            
            The user has been auto-confirmed and can login immediately.
          `)
        } else {
          setMessage(`
            ✅ Staff user created successfully!
            
            An email confirmation link has been sent to ${formData.email}.
            Please check your email and click the confirmation link to activate your account.
            
            After confirmation, you'll be able to login with your credentials.
          `)
        }
      
        // Reset form but keep role selection
        setFormData(prev => ({ 
          email: '', 
          password: '', 
          fullName: '', 
          role: prev.role,
          skipConfirmation: false 
        }))
      }
    
    } catch (error: any) {
      console.error('Complete error details:', error)
      setError(error.message || 'Failed to create staff user. Check console for details.')
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
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
            Create staff/admin user accounts
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

          {/* Development Option */}
          <div className="flex items-center space-x-2 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <input
              id="skipConfirmation"
              name="skipConfirmation"
              type="checkbox"
              checked={formData.skipConfirmation}
              onChange={(e) => handleInputChange('skipConfirmation', e.target.checked)}
              className="w-4 h-4 text-[#FFD700] bg-gray-700 border-gray-600 rounded focus:ring-[#FFD700] focus:ring-2"
            />
            <label htmlFor="skipConfirmation" className="text-sm text-yellow-200">
              Skip email confirmation (Development only)
            </label>
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
                  Creating User...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Create Staff User
                </>
              )}
            </button>
          </div>
        </form>

        {/* Info */}
        <div className="text-center text-gray-400 text-sm">
          <p>For production: Users receive email confirmation</p>
          <p className="mt-1">For development: Check "Skip email confirmation"</p>
        </div>
      </div>
    </div>
  )
}