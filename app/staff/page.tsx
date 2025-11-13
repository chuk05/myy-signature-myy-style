import Link from 'next/link'

export default function StaffPage() {
  return (
    <div className="min-h-screen bg-[#F0F0F0] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h1 className="text-3xl font-bold text-[#222222] mb-4">
            Staff Portal
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Access your schedule and appointments
          </p>
          <div className="space-y-4">
            <Link 
              href="/auth/login"
              className="block bg-[#6A8EA4] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#5a7a90] transition-colors"
            >
              Staff Login
            </Link>
            <Link 
              href="/staff/dashboard"
              className="block bg-[#F0F0F0] text-[#222222] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}