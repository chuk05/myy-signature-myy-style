// app/auth/login/LoginForm.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation' // Remove useSearchParams import
import Link from 'next/link'
import { supabase } from '@/utils/supabase/client'
import { Eye, EyeOff, Lock, Mail, Scissors } from 'lucide-react'

// Add redirectTo as a prop
interface LoginFormProps {
  redirectTo?: string
}

export default function LoginForm({ redirectTo = '/' }: LoginFormProps) {
  const [email, setEmail] = useState('staff@salon.com')
  const [password, setPassword] = useState('password123')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  // Remove useSearchParams line
  // const searchParams = useSearchParams()
  // const redirectTo = searchParams.get('redirect') || '/'

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      console.log('Attempting login with:', { email })
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      console.log('Login response:', { data, error })

      if (error) {
        console.error('Login error:', error)
        throw error
      }

      if (data.user) {
        console.log('Login successful, user:', data.user)
        // Wait a moment for session to be established
        await new Promise(resolve => setTimeout(resolve, 1000))
        router.push(redirectTo) // Use the prop
        router.refresh()
      }
    } catch (error: any) {
      console.error('Login catch error:', error)
      setError(error.message || 'An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-[#FFD700] p-3 rounded-full">
              <Scissors className="w-8 h-8 text-[#1A1A1A]" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white">Staff Sign In</h2>
          <p className="mt-2 text-gray-300">
            Access your staff dashboard
          </p>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6 bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20" onSubmit={handleLogin}>
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm">
              {error}
              <div className="mt-2 text-xs">
                <Link href="/setup-staff" className="text-[#FFD700] hover:underline">
                  Need to create staff user first?
                </Link>
              </div>
            </div>
          )}

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
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                placeholder="Email address"
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
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-10 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
                placeholder="Password"
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
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg bg-[#FFD700] text-[#1A1A1A] font-semibold hover:bg-[#B39700] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFD700] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="text-center space-y-2">
            <Link
              href="/"
              className="text-[#FFD700] hover:text-[#B39700] text-sm font-medium transition-colors block"
            >
              ← Back to home
            </Link>
            <Link
              href="/setup-staff"
              className="text-gray-400 hover:text-[#FFD700] text-sm font-medium transition-colors block"
            >
              Need to setup staff user?
            </Link>
          </div>
        </form>

        {/* Demo Credentials */}
        <div className="text-center text-gray-400 text-sm">
          <p>Try these demo credentials:</p>
          <p className="font-mono mt-1">staff@example.com / staff123</p>
        </div>
      </div>
    </div>
  )
}