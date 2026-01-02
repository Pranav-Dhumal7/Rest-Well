import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import EnvironmentScanner from '@/components/sleep/environment-scanner'

export default async function EnvironmentScannerPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-night p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Sleep Environment Scanner</h1>
          <p className="text-gray-400 mt-2">Upload a photo of your bedroom for AI-powered optimization tips</p>
        </div>
        <EnvironmentScanner />
      </div>
    </div>
  )
}

