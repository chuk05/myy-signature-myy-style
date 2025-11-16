import { NextResponse } from 'next/server'
import { supabase } from '@/utils/supabase/server'

export async function GET() {
  try {
    const { data: staff, error } = await supabase
      .from('staff')
      .select(`
        *,
        staff_services (
          service_id,
          services (
            id,
            name,
            description,
            duration,
            price,
            category_id,  // Fixed: using category_id instead of category
            categories:category_id (
              id,
              name,
              color,
              icon_name
            )
          )
        )
      `)
      .eq('is_active', true)
      .order('full_name')

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(staff)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}