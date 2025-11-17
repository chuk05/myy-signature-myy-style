// /app/api/staff/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '@/utils/supabase/server'

export async function GET() {
  try {
    // Use the correct table name: staff_profiles instead of staff
    const { data: staff, error: staffError } = await supabase
      .from('staff_profiles')
      .select(`
        *,
        profiles!inner (
          id,
          email,
          full_name,
          avatar_url,
          role,
          created_at,
          updated_at
        ),
        staff_services (
          service_id
        )
      `)
      .eq('is_active', true)
      .order('profiles(full_name)')

    if (staffError) {
      console.error('Staff query error:', staffError)
      return NextResponse.json({ error: staffError.message }, { status: 500 })
    }

    if (!staff || staff.length === 0) {
      return NextResponse.json([])
    }

    // Get all unique service IDs from all staff members
    const serviceIds = [...new Set(staff.flatMap(staffMember => 
      staffMember.staff_services?.map((ss: any) => ss.service_id) || []
    ))]

    // If no services, return staff without services
    if (serviceIds.length === 0) {
      const simplifiedStaff = staff.map(staffMember => ({
        ...staffMember.profiles,
        ...staffMember,
        staff_services: []
      }))
      return NextResponse.json(simplifiedStaff)
    }

    // Get all services with their categories
    const { data: services, error: servicesError } = await supabase
      .from('services')
      .select(`
        *,
        categories:category_id (
          id,
          name,
          description,
          color,
          icon_name,
          sort_order,
          is_active
        )
      `)
      .in('id', serviceIds)
      .eq('is_active', true)

    if (servicesError) {
      console.error('Services query error:', servicesError)
      return NextResponse.json({ error: servicesError.message }, { status: 500 })
    }

    // Map services to staff members and combine with profile data
    const staffWithServices = staff.map(staffMember => {
      const staffServiceIds = staffMember.staff_services?.map((ss: any) => ss.service_id) || []
      const staffServices = services?.filter(service => 
        staffServiceIds.includes(service.id)
      ) || []

      return {
        ...staffMember.profiles, // Include profile data
        ...staffMember, // Include staff_profile data
        staff_services: staffServices
      }
    })

    return NextResponse.json(staffWithServices)
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}