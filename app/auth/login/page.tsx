// /app/auth/login/page.tsx
import { Suspense } from 'react'
import LoginForm from './LoginForm'
import LoginFormSkeleton from './LoginFormSkeleton'

interface LoginPageProps {
  searchParams: Promise<{ redirect?: string }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  // Await the searchParams Promise
  const params = await searchParams
  const redirectTo = params.redirect || '/'

  return (
    <Suspense fallback={<LoginFormSkeleton />}>
      <LoginForm redirectTo={redirectTo} />
    </Suspense>
  )
}