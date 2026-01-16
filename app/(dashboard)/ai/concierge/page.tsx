import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AIConcierge from '@/components/ai/ai-concierge'

export default async function AIConciergePage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-night p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">AI Sleep Concierge</h1>
          <p className="text-gray-400 mt-2">Your personalized sleep coach powered by AI</p>
        </div>
        <AIConcierge userId={session.user.id!} />
      </div>
    </div>
  )
}

