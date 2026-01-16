import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import BreathingExercises from '@/components/wellness/breathing-exercises'

export default async function BreathingExercisesPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-night p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Breathing Exercises</h1>
          <p className="text-gray-400 mt-2">Guided breathing exercises for relaxation and better sleep</p>
        </div>
        <BreathingExercises />
      </div>
    </div>
  )
}

