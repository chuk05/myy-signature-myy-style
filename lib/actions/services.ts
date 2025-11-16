'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export type ServiceFormData = {
  name: string
  description: string
  duration: number
  price: number
  category: string
  image: string
  is_active: boolean
}

export async function getServices() {
  try {
    const supabase = await createClient()
    
    const { data: services, error } = await supabase
      .from('services')
      .select('*')
      .order('category')
      .order('name')

    if (error) {
      console.error('Error fetching services:', error)
      return { data: null, error: error.message }
    }

    return { data: services, error: null }
  } catch (error) {
    console.error('Error in getServices:', error)
    return { data: null, error: 'Failed to fetch services' }
  }
}

export async function createService(formData: ServiceFormData) {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('services')
      .insert([{
        name: formData.name,
        description: formData.description,
        duration: formData.duration,
        price: formData.price,
        category: formData.category,
        image: formData.image,
        is_active: formData.is_active
      }])
      .select()
      .single()

    if (error) {
      console.error('Error creating service:', error)
      return { data: null, error: error.message }
    }

    revalidatePath('/admin/services')
    return { data, error: null }
  } catch (error) {
    console.error('Error in createService:', error)
    return { data: null, error: 'Failed to create service' }
  }
}

export async function updateService(id: string, formData: Partial<ServiceFormData>) {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('services')
      .update(formData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating service:', error)
      return { data: null, error: error.message }
    }

    revalidatePath('/admin/services')
    return { data, error: null }
  } catch (error) {
    console.error('Error in updateService:', error)
    return { data: null, error: 'Failed to update service' }
  }
}

export async function deleteService(id: string) {
  try {
    const supabase = await createClient()
    
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting service:', error)
      return { success: false, error: error.message }
    }

    revalidatePath('/admin/services')
    return { success: true, error: null }
  } catch (error) {
    console.error('Error in deleteService:', error)
    return { success: false, error: 'Failed to delete service' }
  }
}

export async function toggleServiceStatus(id: string, isActive: boolean) {
  try {
    const supabase = await createClient()
    
    const { error } = await supabase
      .from('services')
      .update({ is_active: isActive })
      .eq('id', id)

    if (error) {
      console.error('Error toggling service status:', error)
      return { success: false, error: error.message }
    }

    revalidatePath('/admin/services')
    return { success: true, error: null }
  } catch (error) {
    console.error('Error in toggleServiceStatus:', error)
    return { success: false, error: 'Failed to update service status' }
  }
}