export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-[#F0F0F0] py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-[#222222] mb-4">Appointment Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for booking with Myy Signature Myy Style. We look forward to seeing you!
          </p>
          <p className="text-sm text-gray-500 mb-8">
            A confirmation email has been sent to your email address.
          </p>
          
          <div className="space-y-4">
            <a
              href="/"  // ✅ Fixed: Goes to homepage
              className="inline-block bg-[#6A8EA4] text-white py-3 px-8 rounded-lg font-semibold hover:bg-[#5a7a90] transition-colors"
            >
              Back to Home
            </a>
            <br />
            <a
              href="/customer/booking"  // ✅ Fixed: Correct booking path
              className="inline-block bg-[#F0F0F0] text-[#222222] py-3 px-8 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Book Another Appointment
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}