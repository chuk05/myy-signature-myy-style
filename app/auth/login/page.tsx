// app/auth/login/page.tsx
import { Suspense } from 'react'
import LoginForm from './LoginForm'
import LoginFormSkeleton from './LoginFormSkeleton'

interface LoginPageProps {
  searchParams: { redirect?: string }
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  return (
    <Suspense fallback={<LoginFormSkeleton />}>
      <LoginForm redirectTo={searchParams.redirect} />
    </Suspense>
  )
}