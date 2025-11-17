// /app/api/services/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/utils/supabase/server'

// Consistent category mapping based on your service table
const CATEGORY_SLUG_MAP: { [key: string]: string } = {
  'women': 'womens-hair',
  'womens-hair': 'womens-hair',
  'color': 'color-services', 
  'color-services': 'color-services',
  'treatment': 'treatment-services',
  'treatment-services': 'treatment-services',
  'men': 'mens-grooming',
  'mens-grooming': 'mens-grooming',
  'special': 'specialty-services',
  'specialty-services': 'specialty-services',
  'texture': 'texture-services',
  'texture-services': 'texture-services',
  'kids': 'kids-services',
  'kids-services': 'kids-services',
  'addon': 'add-on-services',
  'add-on-services': 'add-on-services'
} as const;

// Category display names
const CATEGORY_DISPLAY_NAMES: { [key: string]: string } = {
  'womens-hair': "Women's Hair",
  'color-services': 'Color Services',
  'treatment-services': 'Treatment Services', 
  'mens-grooming': "Men's Grooming",
  'specialty-services': 'Specialty Services',
  'texture-services': 'Texture Services',
  'kids-services': 'Kids Services',
  'add-on-services': 'Add-on Services'
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categorySlug = searchParams.get('category')
    
    let query = supabase
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
      .eq('is_active', true)
      .order('display_order')
      .order('name')

    // If category filter is provided, use consistent category mapping
    if (categorySlug && categorySlug !== 'all') {
      const mappedCategory = CATEGORY_SLUG_MAP[categorySlug.toLowerCase()];
      
      if (!mappedCategory) {
        console.log(`Category slug "${categorySlug}" not found in mapping`);
        return NextResponse.json([]); // Return empty array for unknown categories
      }

      // Get category ID from the mapped category name
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('id')
        .eq('name', CATEGORY_DISPLAY_NAMES[mappedCategory] || mappedCategory)
        .eq('is_active', true)
        .single()

      if (categoryError || !categoryData) {
        console.log(`Category "${mappedCategory}" not found in database, returning all services`);
        // Continue without filtering if category doesn't exist in DB yet
      } else {
        query = query.eq('category_id', categoryData.id)
      }
    }

    const { data: services, error } = await query

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(services || [])
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST, PUT, DELETE methods remain the same but ensure they use consistent categories...

export async function POST(request: NextRequest) {
  try {
    const serviceData = await request.json()

    // Validate required fields
    if (!serviceData.name || !serviceData.category_id || !serviceData.duration || !serviceData.price) {
      return NextResponse.json(
        { error: 'Missing required fields: name, category_id, duration, price' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('services')
      .insert([{
        name: serviceData.name,
        description: serviceData.description || null,
        duration: parseInt(serviceData.duration),
        price: parseFloat(serviceData.price),
        category_id: serviceData.category_id,
        image: serviceData.image || null,
        is_active: serviceData.is_active !== false,
        display_order: serviceData.display_order || 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
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
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Service ID is required' }, { status: 400 })
    }

    const serviceData = await request.json()

    const updateData = { 
      ...serviceData,
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('services')
      .update(updateData)
      .eq('id', id)
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
      .single()

    if (error) {
      console.error('Supabase update error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Service ID is required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase delete error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}