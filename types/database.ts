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
      services: {
        Row: {
          id: string
          name: string
          description: string | null
          duration: number
          price: number
          created_at: string
          is_active: boolean
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          duration: number
          price: number
          created_at?: string
          is_active?: boolean
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          duration?: number
          price?: number
          created_at?: string
          is_active?: boolean
        }
      }
      staff: {
        Row: {
          id: string
          email: string
          full_name: string
          specialty: string | null
          phone: string | null
          created_at: string
          is_active: boolean
        }
        Insert: {
          id?: string
          email: string
          full_name: string
          specialty?: string | null
          phone?: string | null
          created_at?: string
          is_active?: boolean
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          specialty?: string | null
          phone?: string | null
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
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: string
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: string
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: string
          phone?: string | null
          created_at?: string
          updated_at?: string
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

export type Appointment = Database['public']['Tables']['appointments']['Row']
export type Customer = Database['public']['Tables']['customers']['Row']
export type Service = Database['public']['Tables']['services']['Row']
export type Staff = Database['public']['Tables']['staff']['Row']
export type StaffAvailability = Database['public']['Tables']['staff_availability']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']
export type StaffService = Database['public']['Tables']['staff_services']['Row']
export type WorkingHours = Database['public']['Tables']['working_hours']['Row']
export type CustomerInsert = Database['public']['Tables']['customers']['Insert']
export type AppointmentInsert = Database['public']['Tables']['appointments']['Insert']