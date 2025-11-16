'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/utils/supabase/client'
import Image from 'next/image'
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Award, 
  Shield,
  Edit3,
  Save,
  X
} from 'lucide-react'

export default function ProfilePage() {
  const { user, profile, staffProfile, refreshProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    bio: '',
    position: '',
  })

  // Initialize form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        phone: staffProfile?.phone || '',
        bio: staffProfile?.bio || '',
        position: staffProfile?.position || '',
      })
    }
  }, [profile, staffProfile])

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFD700] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // Update profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)

      if (profileError) throw profileError

      // Update staff profile if user is staff
      if (profile.role === 'staff' || profile.role === 'admin') {
        const { error: staffError } = await supabase
          .from('staff_profiles')
          .upsert({
            id: user.id,
            phone: formData.phone,
            bio: formData.bio,
            position: formData.position,
            updated_at: new Date().toISOString(),
          })

        if (staffError) {
          // If staff_profiles table doesn't exist, just continue
          if (staffError.code === '42P01') {
            console.log('staff_profiles table does not exist yet')
          } else {
            throw staffError
          }
        }
      }

      await refreshProfile()
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Error updating profile. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      full_name: profile.full_name || '',
      phone: staffProfile?.phone || '',
      bio: staffProfile?.bio || '',
      position: staffProfile?.position || '',
    })
    setIsEditing(false)
  }

  const isStaff = profile.role === 'staff' || profile.role === 'admin'

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="relative w-20 h-20 rounded-full bg-[#FFD700] flex items-center justify-center">
                {profile.avatar_url ? (
                  <Image
                    src={profile.avatar_url}
                    alt={profile.full_name || 'Profile'}
                    fill
                    className="rounded-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10 text-[#1A1A1A]" />
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#1A1A1A]">
                  {profile.full_name || 'No Name Set'}
                </h1>
                <div className="flex items-center space-x-2 mt-1">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">{profile.email}</span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <Shield className="w-4 h-4 text-[#FFD700]" />
                  <span className="text-[#FFD700] font-medium capitalize">
                    {profile.role}
                  </span>
                </div>
              </div>
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 bg-[#FFD700] text-[#1A1A1A] px-4 py-2 rounded-lg font-semibold hover:bg-[#B39700] transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isLoading ? 'Saving...' : 'Save'}</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Rest of the profile page remains the same */}
        {/* ... */}
      </div>
    </div>
  )
}