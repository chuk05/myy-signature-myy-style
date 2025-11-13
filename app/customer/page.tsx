import Link from 'next/link'

export default function CustomerPage() {
  return (
    <div className="min-h-screen bg-[#F0F0F0] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#222222] mb-4">
            Welcome to Myy Signature Myy Style
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Book your appointment with Atlanta's premier salon
          </p>
          <Link 
            href="/customer/booking"
            className="bg-[#6A8EA4] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#5a7a90] transition-colors"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  )
}