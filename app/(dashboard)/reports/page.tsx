import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db/prisma'
import HealthReports from '@/components/reports/health-reports'

export default async function ReportsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/auth/signin')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    include: {
      sleepLogs: {
        take: 30,
        orderBy: { date: 'desc' },
      },
      readinessScores: {
        take: 30,
        orderBy: { date: 'desc' },
      },
      moodLogs: {
        take: 30,
        orderBy: { date: 'desc' },
      },
      exerciseLogs: {
        take: 30,
        orderBy: { date: 'desc' },
      },
    },
  })

  if (!user) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-night p-6">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Health Reports</h1>
          <p className="text-gray-400 mt-2">Generate comprehensive wellness reports for your healthcare provider</p>
        </div>
        <HealthReports 
          sleepLogs={user.sleepLogs}
          readinessScores={user.readinessScores}
          moodLogs={user.moodLogs}
          exerciseLogs={user.exerciseLogs}
          user={user}
        />
      </div>
    </div>
  )
}

