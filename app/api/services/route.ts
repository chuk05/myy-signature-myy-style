import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/utils/supabase/server'

export async function GET() {
  try {
    const { data: services, error } = await supabase
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
      .order('category_id')  // Fixed: changed 'category' to 'category_id'
      .order('name')

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(services)
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const serviceData = await request.json()

    // Validate required fields - Fixed: changed 'category' to 'category_id'
    if (!serviceData.name || !serviceData.category_id || !serviceData.duration || !serviceData.price) {
      return NextResponse.json(
        { error: 'Missing required fields: name, category_id, duration, price' },  // Fixed error message
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
        category_id: serviceData.category_id,  // Fixed: changed 'category' to 'category_id'
        image: serviceData.image || null,
        is_active: serviceData.is_active !== false, // default to true
        created_at: new Date().toISOString()
      }])
      .select(`
        *,
        categories:category_id (
          id,
          name,
          description,
          color,
          icon_name
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

// Handle PUT and DELETE with query parameters
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Service ID is required' }, { status: 400 })
    }

    const serviceData = await request.json()

    // If category is being updated, map it to category_id
    const updateData = { ...serviceData };
    if (updateData.category !== undefined) {
      updateData.category_id = updateData.category;
      delete updateData.category;
    }

    const { data, error } = await supabase
      .from('services')
      .update(updateData)  // Use the mapped data
      .eq('id', id)
      .select(`
        *,
        categories:category_id (
          id,
          name,
          description,
          color,
          icon_name
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