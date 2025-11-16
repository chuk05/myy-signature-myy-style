// app/debug/register-user/page.tsx
'use client'

import { useState } from 'react'
import { supabase } from '@/utils/supabase/client'

export default function RegisterUserPage() {
  const [email, setEmail] = useState('staff@salon.com')
  const [password, setPassword] = useState('password123')
  const [result, setResult] = useState('')

  const registerUser = async () => {
    try {
      setResult('Registering user...')
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: 'staff',
            full_name: 'Salon Staff Member'
          }
        }
      })

      if (error) {
        setResult(`Registration Error: ${error.message}`)
      } else if (data.user) {
        setResult(`Success! User created. Please check ${email} for confirmation.`)
        
        // If you want to auto-confirm for testing, you can manually confirm in Supabase dashboard
        // or use the SQL approach above
      } else {
        setResult('Unexpected response from registration')
      }
    } catch (err: any) {
      setResult(`Exception: ${err.message}`)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Register Test User</h1>
      <div className="space-y-4 max-w-md">
        <div>
          <label className="block mb-2">Email:</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <label className="block mb-2">Password:</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>
        <button 
          onClick={registerUser}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Register User
        </button>
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <pre>{result}</pre>
        </div>
      </div>
    </div>
  )
}