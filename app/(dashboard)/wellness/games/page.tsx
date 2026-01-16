import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import SleepGames from '@/components/wellness/sleep-games'

export default async function SleepGamesPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-night p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Sleep-Inducing Mini Games</h1>
          <p className="text-gray-400 mt-2">Gentle, monotone games designed to help you relax and drift off</p>
        </div>
        <SleepGames />
      </div>
    </div>
  )
}

