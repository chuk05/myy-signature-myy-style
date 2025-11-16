// app/debug/supabase-test/page.tsx
'use client'

import { useState } from 'react'
import { supabase } from '@/utils/supabase/client'

export default function SupabaseTest() {
  const [results, setResults] = useState<string[]>([])

  const addResult = (result: string) => {
    setResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`])
  }

  const testBasicConnection = async () => {
    try {
      addResult('Testing basic Supabase connection...')
      
      // Test 1: Basic fetch to Supabase
      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`, {
        headers: {
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        }
      })
      addResult(`REST API status: ${response.status}`)
      
      // Test 2: Auth configuration
      const { data: authConfig, error: authError } = await supabase.auth.getSession()
      addResult(`Auth config: ${authError ? 'ERROR: ' + authError.message : 'SUCCESS'}`)
      
      // Test 3: Simple table query
      const { data: tableData, error: tableError } = await supabase
        .from('profiles')
        .select('count')
        .limit(1)
      addResult(`Table query: ${tableError ? 'ERROR: ' + tableError.message : 'SUCCESS'}`)

    } catch (error: any) {
      addResult(`Exception: ${error.message}`)
    }
  }

  const testDirectAuth = async () => {
    try {
      addResult('Testing direct auth API call...')
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/token?grant_type=password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          },
          body: JSON.stringify({
            email: 'test@example.com',
            password: 'password123',
          }),
        }
      )
      
      const data = await response.json()
      addResult(`Direct auth response: ${JSON.stringify(data)}`)
      
    } catch (error: any) {
      addResult(`Direct auth error: ${error.message}`)
    }
  }

  const checkEnvironment = () => {
    addResult(`NEXT_PUBLIC_SUPABASE_URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'MISSING'}`)
    addResult(`NEXT_PUBLIC_SUPABASE_ANON_KEY: ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'MISSING'}`)
    
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      addResult(`URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
      
      <div className="space-x-4 mb-6">
        <button onClick={checkEnvironment} className="bg-gray-500 text-white p-2 rounded">
          Check Environment
        </button>
        <button onClick={testBasicConnection} className="bg-blue-500 text-white p-2 rounded">
          Test Connection
        </button>
        <button onClick={testDirectAuth} className="bg-green-500 text-white p-2 rounded">
          Test Direct Auth
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded">
        <h2 className="font-bold mb-2">Results:</h2>
        {results.map((result, index) => (
          <div key={index} className="font-mono text-sm mb-1">{result}</div>
        ))}
      </div>
    </div>
  )
}