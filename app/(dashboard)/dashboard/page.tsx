import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db/prisma'
import { getGreeting } from '@/lib/utils'
import DashboardStats from '@/components/dashboard/dashboard-stats'
import SleepScoreCard from '@/components/dashboard/sleep-score-card'
import ReadinessScoreCard from '@/components/dashboard/readiness-score-card'
import QuickActions from '@/components/dashboard/quick-actions'
import RecentInsights from '@/components/dashboard/recent-insights'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/auth/signin')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    include: {
      sleepProfile: true,
      sleepLogs: {
        take: 7,
        orderBy: { date: 'desc' },
      },
      readinessScores: {
        take: 1,
        orderBy: { date: 'desc' },
      },
    },
  })

  if (!user) {
    redirect('/auth/signin')
  }

  // Check if user needs to complete onboarding
  if (!user.sleepProfile) {
    redirect('/onboarding')
  }

  const greeting = getGreeting()
  const latestReadiness = user.readinessScores[0]
  const recentSleepLogs = user.sleepLogs

  return (
    <div className="min-h-screen bg-night p-6">
      <div className="container mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            {greeting}, {user.name || 'there'}
          </h1>
          <p className="text-gray-400 mt-2">
            Here's your wellness overview for today
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <SleepScoreCard sleepLogs={recentSleepLogs} />
          <ReadinessScoreCard readinessScore={latestReadiness} />
          <QuickActions />
        </div>

        {/* Dashboard Stats */}
        <DashboardStats userId={user.id} />

        {/* Recent Insights */}
        <RecentInsights userId={user.id} />
      </div>
    </div>
  )
}

