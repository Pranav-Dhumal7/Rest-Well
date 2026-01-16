import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Calendar, MessageSquare } from 'lucide-react'

export default async function CommunityPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-night p-6">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Community</h1>
          <p className="text-gray-400 mt-2">Connect with others on their wellness journey</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-night-light border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Calendar className="w-5 h-5 text-purple-400" />
                Live Events
              </CardTitle>
              <CardDescription>Join collective calm sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">Coming soon: Live guided wind-down sessions and group meditations</p>
              <div className="text-sm text-purple-400">Feature in development</div>
            </CardContent>
          </Card>

          <Card className="bg-night-light border-teal-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <MessageSquare className="w-5 h-5 text-teal-400" />
                Community Tips
              </CardTitle>
              <CardDescription>Share and discover wellness tips</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">Coming soon: Anonymous tips board with community wisdom</p>
              <div className="text-sm text-teal-400">Feature in development</div>
            </CardContent>
          </Card>

          <Card className="bg-night-light border-yellow-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Users className="w-5 h-5 text-yellow-400" />
                Challenges
              </CardTitle>
              <CardDescription>Join wellness challenges</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">Coming soon: Team-based sleep and wellness challenges</p>
              <div className="text-sm text-yellow-400">Feature in development</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

