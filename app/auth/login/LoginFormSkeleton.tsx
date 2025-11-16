// app/auth/login/LoginFormSkeleton.tsx
export default function LoginFormSkeleton() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-[#FFD700] p-3 rounded-full animate-pulse">
                <div className="w-8 h-8 bg-[#1A1A1A] rounded"></div>
              </div>
            </div>
            <div className="h-8 bg-gray-700 rounded w-3/4 mx-auto mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 space-y-6">
            <div className="space-y-4">
              <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-12 bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }