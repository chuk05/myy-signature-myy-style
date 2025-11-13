export default function LoginPage() {
    return (
      <div className="min-h-screen bg-[#F0F0F0] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold text-[#222222]">
              Staff Login
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Access your staff dashboard
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#6A8EA4] focus:border-[#6A8EA4] focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#6A8EA4] focus:border-[#6A8EA4] focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
  
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#6A8EA4] hover:bg-[#5a7a90] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6A8EA4]"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }