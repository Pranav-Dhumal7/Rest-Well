import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import SleepLogForm from '@/components/sleep/sleep-log-form'

export default async function SleepLogPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-night p-6">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Log Sleep</h1>
          <p className="text-gray-400 mt-2">Record your sleep session</p>
        </div>
        <SleepLogForm />
      </div>
    </div>
  )
}

