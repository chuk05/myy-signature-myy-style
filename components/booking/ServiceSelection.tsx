'use client'

import { Service } from '@/types/database'

interface ServiceSelectionProps {
  services: Service[]
  selectedService: Service | null
  onServiceSelect: (service: Service) => void
}

export default function ServiceSelection({ services, selectedService, onServiceSelect }: ServiceSelectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#222222]">Select a Service</h3>
      <div className="grid gap-3">
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
              </div>
              <div className="text-right">
                <p className="font-semibold text-[#222222]">${service.price}</p>
                <p className="text-sm text-gray-600">{service.duration} min</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}