// /app/auth/resend-confirmation/page.tsx
import { Suspense } from 'react'
import ResendConfirmationContent from './ResendConfirmationContent'
import { Loader } from 'lucide-react'

export default function ResendConfirmationPage() {
  return (
    <Suspense fallback={<ResendConfirmationFallback />}>
      <ResendConfirmationContent />
    </Suspense>
  )
}

function ResendConfirmationFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
          <Loader className="w-12 h-12 text-[#FFD700] animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Loading...</h2>
          <p className="text-gray-300">Please wait while we load the page.</p>
        </div>
      </div>
    </div>
  )
}