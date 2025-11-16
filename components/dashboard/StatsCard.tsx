// /components/dashboard/StatsCard.tsx
interface StatsCardProps {
    title: string
    value: string | number
    description?: string
    icon: React.ReactNode
    color: string
  }
  
  export default function StatsCard({ title, value, description, icon, color }: StatsCardProps) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
            {description && (
              <p className="text-sm text-green-600 mt-1">{description}</p>
            )}
          </div>
          <div className={`p-3 ${color} rounded-xl`}>
            {icon}
          </div>
        </div>
      </div>
    )
  }