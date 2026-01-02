import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import SignInForm from '@/components/auth/signin-form'

export default async function SignUpPage() {
  const session = await getServerSession(authOptions)
  
  if (session?.user) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen gradient-night flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Get Started</h1>
          <p className="text-gray-400">Create your account to begin your wellness journey</p>
        </div>
        <SignInForm />
      </div>
    </div>
  )
}

