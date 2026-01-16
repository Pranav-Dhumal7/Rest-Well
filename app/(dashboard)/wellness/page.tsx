import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Wind, Music, Gamepad2, Sparkles } from 'lucide-react'

export default async function WellnessPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-night p-6">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Wellness Tools</h1>
          <p className="text-gray-400 mt-2">Tools and resources for holistic wellness</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Link href="/wellness/breathing">
            <Card className="bg-night-light border-purple-500/20 hover:border-purple-500/50 cursor-pointer transition-all h-full">
              <CardHeader>
                <Wind className="w-8 h-8 text-purple-400 mb-2" />
                <CardTitle className="text-white">Breathing Exercises</CardTitle>
                <CardDescription>Guided breathing for relaxation</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/wellness/soundscapes">
            <Card className="bg-night-light border-teal-500/20 hover:border-teal-500/50 cursor-pointer transition-all h-full">
              <CardHeader>
                <Music className="w-8 h-8 text-teal-400 mb-2" />
                <CardTitle className="text-white">Soundscapes</CardTitle>
                <CardDescription>Ambient sounds for sleep</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/wellness/games">
            <Card className="bg-night-light border-pink-500/20 hover:border-pink-500/50 cursor-pointer transition-all h-full">
              <CardHeader>
                <Gamepad2 className="w-8 h-8 text-pink-400 mb-2" />
                <CardTitle className="text-white">Sleep Games</CardTitle>
                <CardDescription>Relaxing mini-games</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/wellness/routines">
            <Card className="bg-night-light border-yellow-500/20 hover:border-yellow-500/50 cursor-pointer transition-all h-full">
              <CardHeader>
                <Sparkles className="w-8 h-8 text-yellow-400 mb-2" />
                <CardTitle className="text-white">Wind-Down Routines</CardTitle>
                <CardDescription>AI-generated pre-sleep routines</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}

