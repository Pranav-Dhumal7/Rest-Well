import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Soundscapes from '@/components/wellness/soundscapes'

export default async function SoundscapesPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-night p-6">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Soundscapes</h1>
          <p className="text-gray-400 mt-2">Relaxing soundscapes for better sleep and focus</p>
        </div>
        <Soundscapes />
      </div>
    </div>
  )
}

