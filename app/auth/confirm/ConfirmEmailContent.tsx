// /app/auth/confirm/ConfirmEmailContent.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/utils/supabase/client'
import { CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'

export default function ConfirmEmailContent() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const token_hash = searchParams.get('token_hash')
        const type = searchParams.get('type')

        console.log('Confirmation params:', { token_hash, type })

        if (!token_hash || type !== 'signup') {
          setStatus('error')
          setMessage('Invalid confirmation link. Please check the link and try again.')
          return
        }

        const { error } = await supabase.auth.verifyOtp({
          token_hash,
          type: 'signup'
        })

        if (error) {
          console.error('Confirmation error:', error)
          setStatus('error')
          setMessage(error.message || 'Confirmation failed. The link may have expired.')
          return
        }

        setStatus('success')
        setMessage('Email confirmed successfully! Redirecting to login...')
        
        // Activate staff profile if it exists
        try {
          const { data: { user } } = await supabase.auth.getUser()
          if (user) {
            await supabase
              .from('staff_profiles')
              .update({ is_active: true })
              .eq('id', user.id)
          }
        } catch (profileError) {
          console.warn('Could not activate staff profile:', profileError)
        }

        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push('/auth/login')
        }, 3000)

      } catch (error: any) {
        console.error('Confirmation failed:', error)
        setStatus('error')
        setMessage('Confirmation failed. Please try again or contact support.')
      }
    }

    confirmEmail()
  }, [searchParams, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
          {status === 'loading' && (
            <>
              <div className="w-12 h-12 border-4 border-[#FFD700] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h2 className="text-2xl font-bold text-white mb-2">Confirming Email</h2>
              <p className="text-gray-300">Please wait while we confirm your email address...</p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Email Confirmed!</h2>
              <p className="text-gray-300 mb-4">{message}</p>
              <div className="space-y-2">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center px-4 py-2 bg-[#FFD700] text-[#1A1A1A] font-semibold rounded-lg hover:bg-[#B39700] transition-colors"
                >
                  Go to Login Now
                </Link>
                <p className="text-sm text-gray-400">Redirecting automatically in 3 seconds...</p>
              </div>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Confirmation Failed</h2>
              <p className="text-gray-300 mb-4">{message}</p>
              <div className="space-y-2">
                <Link
                  href="/auth/login"
                  className="block px-4 py-2 bg-[#FFD700] text-[#1A1A1A] font-semibold rounded-lg hover:bg-[#B39700] transition-colors"
                >
                  Go to Login
                </Link>
                <Link
                  href="/auth/resend-confirmation"
                  className="block px-4 py-2 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors"
                >
                  Resend Confirmation Email
                </Link>
                <Link
                  href="/setup-staff"
                  className="block px-4 py-2 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors"
                >
                  Create New Account
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}