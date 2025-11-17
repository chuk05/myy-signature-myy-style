// /lib/init-categories.ts
import { supabase } from '@/utils/supabase/server'

export async function initializeCategories() {
  const categories = [
    {
      name: "Women's Hair",
      description: 'Precision cuts, styling, and professional hair care for women',
      color: '#8B5CF6',
      icon_name: 'scissors',
      sort_order: 1,
      is_active: true
    },
    {
      name: 'Color Services',
      description: 'Professional coloring, highlights, and color correction',
      color: '#EC4899', 
      icon_name: 'palette',
      sort_order: 2,
      is_active: true
    },
    {
      name: 'Treatment Services',
      description: 'Deep conditioning, smoothing, and therapeutic treatments',
      color: '#10B981',
      icon_name: 'sparkles',
      sort_order: 3,
      is_active: true
    },
    {
      name: "Men's Grooming",
      description: 'Classic and modern grooming services for men',
      color: '#3B82F6',
      icon_name: 'user',
      sort_order: 4,
      is_active: true
    },
    {
      name: 'Specialty Services',
      description: 'Bridal, extensions, and special occasion services',
      color: '#F59E0B',
      icon_name: 'star',
      sort_order: 5,
      is_active: true
    },
    {
      name: 'Texture Services',
      description: 'Chemical services and curl definition',
      color: '#EF4444',
      icon_name: 'sparkles',
      sort_order: 6,
      is_active: true
    },
    {
      name: 'Kids Services',
      description: 'Fun and gentle haircuts for children and teens',
      color: '#06B6D4',
      icon_name: 'heart',
      sort_order: 7,
      is_active: true
    },
    {
      name: 'Add-on Services',
      description: 'Additional treatments and enhancements',
      color: '#6B7280',
      icon_name: 'plus',
      sort_order: 8,
      is_active: true
    }
  ];

  for (const category of categories) {
    const { error } = await supabase
      .from('categories')
      .upsert(category, { onConflict: 'name' })
    
    if (error) {
      console.error(`Error initializing category ${category.name}:`, error)
    }
  }
}