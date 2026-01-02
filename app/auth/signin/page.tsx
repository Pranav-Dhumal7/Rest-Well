import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { signIn } from 'next-auth/react'
import SignInForm from '@/components/auth/signin-form'

export default async function SignInPage() {
  const session = await getServerSession(authOptions)
  
  if (session?.user) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen gradient-night flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to continue your wellness journey</p>
        </div>
        <SignInForm />
      </div>
    </div>
  )
}

