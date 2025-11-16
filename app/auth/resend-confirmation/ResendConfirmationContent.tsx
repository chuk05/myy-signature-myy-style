// /app/auth/resend-confirmation/ResendConfirmationContent.tsx
'use client'

import { useState } from 'react'
import { supabase } from '@/utils/supabase/client'
import { Mail, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ResendConfirmationContent() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleResendConfirmation = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setMessage('')

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/auth/confirm`
        }
      })

      if (error) throw error

      setMessage(`✅ Confirmation email sent to ${email}. Please check your inbox (and spam folder).`)
      setEmail('')
    } catch (error: any) {
      console.error('Resend confirmation error:', error)
      setError(error.message || 'Failed to send confirmation email. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-[#FFD700] p-3 rounded-full">
              <Mail className="w-8 h-8 text-[#1A1A1A]" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white">Resend Confirmation</h2>
          <p className="mt-2 text-gray-300">Enter your email to receive a new confirmation link</p>
        </div>

        <Link
          href="/auth/login"
          className="flex items-center text-[#FFD700] hover:text-[#B39700] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Login
        </Link>

        <form onSubmit={handleResendConfirmation} className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 space-y-6">
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-green-500/20 border border-green-500 text-green-200 px-4 py-3 rounded-lg text-sm">
              {message}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-3 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent"
              placeholder="Enter your email address"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-[#FFD700] text-[#1A1A1A] font-semibold rounded-lg hover:bg-[#B39700] focus:outline-none focus:ring-2 focus:ring-[#FFD700] disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Sending Confirmation...' : 'Resend Confirmation Email'}
          </button>
        </form>

        <div className="text-center text-gray-400 text-sm">
          <p>Check your spam folder if you don't see the email within a few minutes</p>
        </div>
      </div>
    </div>
  )
}