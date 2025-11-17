export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: 'customer' | 'staff' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'customer' | 'staff' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'customer' | 'staff' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }
      staff_profiles: {
        Row: {
          id: string
          position: string | null
          bio: string | null
          specialization: string[] | null
          experience_years: number
          is_active: boolean
          hire_date: string
          phone: string | null
          emergency_contact: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          position?: string | null
          bio?: string | null
          specialization?: string[] | null
          experience_years?: number
          is_active?: boolean
          hire_date?: string
          phone?: string | null
          emergency_contact?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          position?: string | null
          bio?: string | null
          specialization?: string[] | null
          experience_years?: number
          is_active?: boolean
          hire_date?: string
          phone?: string | null
          emergency_contact?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          customer_id: string | null
          staff_id: string | null
          service_id: string | null
          appointment_date: string
          appointment_time: string
          status: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_id?: string | null
          staff_id?: string | null
          service_id?: string | null
          appointment_date: string
          appointment_time: string
          status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_id?: string | null
          staff_id?: string | null
          service_id?: string | null
          appointment_date?: string
          appointment_time?: string
          status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      customers: {
        Row: {
          id: string
          email: string
          phone: string
          full_name: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          phone: string
          full_name: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          phone?: string
          full_name?: string
          created_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          description: string | null
          color: string
          icon_name: string
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          color?: string
          icon_name?: string
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          color?: string
          icon_name?: string
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          name: string
          description: string | null
          duration: number
          price: number
          duration_range: string | null  // Add this
          price_range: string | null     // Add this
          category_id: string | null     // Changed from 'category'
          image: string | null
          is_active: boolean
          is_addon: boolean | null       // Add this
          display_order: number | null   // Add this
          created_at: string
          updated_at: string             // Add this
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          duration: number
          price: number
          duration_range?: string | null
          price_range?: string | null
          category_id?: string | null    // Changed from 'category'
          image?: string | null
          is_active?: boolean
          is_addon?: boolean | null
          display_order?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          duration?: number
          price?: number
          duration_range?: string | null
          price_range?: string | null
          category_id?: string | null    // Changed from 'category'
          image?: string | null
          is_active?: boolean
          is_addon?: boolean | null
          display_order?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      staff: {
        Row: {
          id: string
          email: string
          full_name: string
          specialty: string | null
          phone: string | null
          image: string | null
          bio: string | null
          experience: number | null
          created_at: string
          is_active: boolean
        }
        Insert: {
          id?: string
          email: string
          full_name: string
          specialty?: string | null
          phone?: string | null
          image?: string | null
          bio?: string | null
          experience?: number | null
          created_at?: string
          is_active?: boolean
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          specialty?: string | null
          phone?: string | null
          image?: string | null
          bio?: string | null
          experience?: number | null
          created_at?: string
          is_active?: boolean
        }
      }
      staff_availability: {
        Row: {
          id: string
          staff_id: string | null
          day_of_week: number
          start_time: string
          end_time: string
          is_available: boolean
        }
        Insert: {
          id?: string
          staff_id?: string | null
          day_of_week: number
          start_time: string
          end_time: string
          is_available?: boolean
        }
        Update: {
          id?: string
          staff_id?: string | null
          day_of_week?: number
          start_time?: string
          end_time?: string
          is_available?: boolean
        }
      }
      staff_services: {
        Row: {
          staff_id: string
          service_id: string
        }
        Insert: {
          staff_id: string
          service_id: string
        }
        Update: {
          staff_id?: string
          service_id?: string
        }
      }
      working_hours: {
        Row: {
          id: string
          staff_id: string | null
          day_of_week: number | null
          start_time: string
          end_time: string
          is_active: boolean
        }
        Insert: {
          id?: string
          staff_id?: string | null
          day_of_week?: number | null
          start_time: string
          end_time: string
          is_active?: boolean
        }
        Update: {
          id?: string
          staff_id?: string | null
          day_of_week?: number | null
          start_time?: string
          end_time?: string
          is_active?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Type definitions for application use
export type Appointment = Database['public']['Tables']['appointments']['Row']
export type Customer = Database['public']['Tables']['customers']['Row']
export type Category = Database['public']['Tables']['categories']['Row']
export type Service = Database['public']['Tables']['services']['Row']
export type Staff = Database['public']['Tables']['staff']['Row']
export type StaffAvailability = Database['public']['Tables']['staff_availability']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']
export type StaffProfile = Database['public']['Tables']['staff_profiles']['Row']
export type StaffService = Database['public']['Tables']['staff_services']['Row']
export type WorkingHours = Database['public']['Tables']['working_hours']['Row']

// Insert types
export type CustomerInsert = Database['public']['Tables']['customers']['Insert']
export type AppointmentInsert = Database['public']['Tables']['appointments']['Insert']
export type CategoryInsert = Database['public']['Tables']['categories']['Insert']
export type ServiceInsert = Database['public']['Tables']['services']['Insert']
export type StaffInsert = Database['public']['Tables']['staff']['Insert']
export type StaffAvailabilityInsert = Database['public']['Tables']['staff_availability']['Insert']
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type StaffProfileInsert = Database['public']['Tables']['staff_profiles']['Insert']
export type StaffServiceInsert = Database['public']['Tables']['staff_services']['Insert']
export type WorkingHoursInsert = Database['public']['Tables']['working_hours']['Insert']

// Update types
export type AppointmentUpdate = Database['public']['Tables']['appointments']['Update']
export type CustomerUpdate = Database['public']['Tables']['customers']['Update']
export type CategoryUpdate = Database['public']['Tables']['categories']['Update']
export type ServiceUpdate = Database['public']['Tables']['services']['Update']
export type StaffUpdate = Database['public']['Tables']['staff']['Update']
export type StaffAvailabilityUpdate = Database['public']['Tables']['staff_availability']['Update']
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']
export type StaffProfileUpdate = Database['public']['Tables']['staff_profiles']['Update']
export type WorkingHoursUpdate = Database['public']['Tables']['working_hours']['Update']