// /app/api/categories/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '@/utils/supabase/server'
import { initializeCategories } from '@/lib/init-categories'

export async function GET() {
  try {
    let { data: categories, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order')

    // If no categories exist, initialize them
    if ((!categories || categories.length === 0) && !error) {
      await initializeCategories()
      
      // Fetch categories again after initialization
      const result = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order')
      
      categories = result.data
      error = result.error
    }

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(categories || [])
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}