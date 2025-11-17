export default function LoginFormSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header Skeleton */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-gray-600 p-3 rounded-full animate-pulse">
              <div className="w-8 h-8"></div>
            </div>
          </div>
          <div className="h-8 bg-gray-600 rounded w-3/4 mx-auto mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-600 rounded w-1/2 mx-auto animate-pulse"></div>
        </div>

        {/* Form Skeleton */}
        <div className="mt-8 space-y-6 bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
          {/* Email Field Skeleton */}
          <div>
            <div className="h-4 bg-gray-600 rounded w-1/4 mb-2 animate-pulse"></div>
            <div className="h-12 bg-gray-600 rounded animate-pulse"></div>
          </div>

          {/* Password Field Skeleton */}
          <div>
            <div className="h-4 bg-gray-600 rounded w-1/4 mb-2 animate-pulse"></div>
            <div className="h-12 bg-gray-600 rounded animate-pulse"></div>
          </div>

          {/* Button Skeleton */}
          <div className="h-12 bg-gray-600 rounded animate-pulse"></div>

          {/* Links Skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-600 rounded w-1/3 mx-auto animate-pulse"></div>
            <div className="h-4 bg-gray-600 rounded w-1/2 mx-auto animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}