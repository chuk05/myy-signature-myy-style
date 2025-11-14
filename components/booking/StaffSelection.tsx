'use client'

import { Staff } from '@/types/database'

interface StaffSelectionProps {
  staff: Staff[]
  selectedStaff: Staff | null
  onStaffSelect: (staff: Staff) => void
}

export default function StaffSelection({ 
  staff, 
  selectedStaff, 
  onStaffSelect 
}: StaffSelectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#222222]">Select Your Stylist</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {staff.map((staffMember) => (
          <div
            key={staffMember.id}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedStaff?.id === staffMember.id
                ? 'border-[#6A8EA4] bg-[#6A8EA4] bg-opacity-10'
                : 'border-[#F0F0F0] hover:border-[#6A8EA4]'
            }`}
            onClick={() => onStaffSelect(staffMember)}
          >
            <h4 className="font-medium text-[#222222]">{staffMember.full_name}</h4>
            {staffMember.specialty && (
              <p className="text-sm text-gray-600 mt-1">{staffMember.specialty}</p>
            )}
            {staffMember.phone && (
              <p className="text-sm text-gray-500 mt-1">{staffMember.phone}</p>
            )}
          </div>
        ))}
      </div>
      {staff.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No staff members available.
        </div>
      )}
    </div>
  )
}