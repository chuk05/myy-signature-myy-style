'use client'

import { Service } from '@/types/database'

interface ServiceSelectionProps {
  services: Service[]
  selectedService: Service | null
  selectedCategory: string | null
  categories: Array<{ id: string; name: string }>
  onServiceSelect: (service: Service) => void
  onCategorySelect: (categoryId: string) => void
}

export default function ServiceSelection({ 
  services, 
  selectedService, 
  selectedCategory,
  categories,
  onServiceSelect, 
  onCategorySelect 
}: ServiceSelectionProps) {

  const CategoryFilter = () => (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-[#222222] mb-4">Filter by Category</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.id)}
            className={`px-4 py-2 rounded-full border transition-colors ${
              selectedCategory === category.id
                ? 'bg-[#6A8EA4] text-white border-[#6A8EA4]'
                : 'bg-white text-[#222222] border-[#F0F0F0] hover:border-[#6A8EA4]'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-4">
      <CategoryFilter />
      <h3 className="text-lg font-semibold text-[#222222]">Select a Service</h3>
      <div className="grid gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedService?.id === service.id
                ? 'border-[#6A8EA4] bg-[#6A8EA4] bg-opacity-10'
                : 'border-[#F0F0F0] hover:border-[#6A8EA4]'
            }`}
            onClick={() => onServiceSelect(service)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-[#222222]">{service.name}</h4>
                {service.description && (
                  <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                )}
                <div className="flex gap-4 mt-2">
                  <span className="text-sm text-gray-500">{service.duration} minutes</span>
                  <span className="text-sm text-gray-500 capitalize">{service.category}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-[#222222]">${service.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {services.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No services found in this category.
        </div>
      )}
    </div>
  )
}