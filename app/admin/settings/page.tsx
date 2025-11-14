'use client'

import Link from 'next/link'

export default function SettingsManagement() {
  return (
    <div className="min-h-screen bg-[#F0F0F0] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/admin" className="text-[#6A8EA4] hover:text-[#5a7a90] mb-4 inline-block">
            &larr; Back to Admin
          </Link>
          <h1 className="text-3xl font-bold text-[#222222] mb-2">Salon Settings</h1>
          <p className="text-gray-600">Configure your salon settings and preferences</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[#222222] mb-4">Business Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#222222] mb-1">Salon Name</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded focus:border-[#6A8EA4] focus:outline-none"
                    defaultValue="Myy Signature Myy Style"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#222222] mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full p-2 border border-gray-300 rounded focus:border-[#6A8EA4] focus:outline-none"
                    defaultValue="(404) 555-0123"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#222222] mb-1">Address</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded focus:border-[#6A8EA4] focus:outline-none"
                    defaultValue="123 Salon Street, Atlanta, GA 30301"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#222222] mb-4">Business Hours</h3>
              <div className="space-y-2">
                <p className="text-gray-600">Coming soon: Configure your salon operating hours</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#222222] mb-4">Notifications</h3>
              <div className="space-y-2">
                <p className="text-gray-600">Coming soon: Configure email and SMS notifications</p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <button className="bg-[#6A8EA4] text-white px-6 py-2 rounded-lg hover:bg-[#5a7a90] transition-colors">
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}