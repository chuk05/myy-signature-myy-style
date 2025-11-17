// /middleware.ts - ENHANCE SESSION HANDLING
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Refresh the session - this ensures the session stays active
  const { data: { session } } = await supabase.auth.getSession()

  // Protected routes
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isStaffRoute = request.nextUrl.pathname.startsWith('/staff')

  if (isAdminRoute || isStaffRoute) {
    // Redirect to login if not authenticated
    if (!session) {
      const redirectUrl = new URL('/auth/login', request.url)
      redirectUrl.searchParams.set('redirect', request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // Check user role from database
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    // Admin routes require admin role
    if (isAdminRoute && (!profile || profile.role !== 'admin')) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // Staff routes require staff or admin role
    if (isStaffRoute && (!profile || (profile.role !== 'staff' && profile.role !== 'admin'))) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/staff/:path*',
  ],
}