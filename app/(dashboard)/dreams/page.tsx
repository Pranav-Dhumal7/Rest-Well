import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db/prisma'
import DreamJournal from '@/components/dreams/dream-journal'

export default async function DreamJournalPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/auth/signin')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    include: {
      dreamLogs: {
        take: 20,
        orderBy: { createdAt: 'desc' },
      },
      sleepLogs: {
        take: 7,
        orderBy: { date: 'desc' },
      },
    },
  })

  if (!user) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-night p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dream Journal</h1>
          <p className="text-gray-400 mt-2">Log your dreams and get AI-powered insights</p>
        </div>
        <DreamJournal 
          initialDreams={user.dreamLogs} 
          recentSleepQuality={user.sleepLogs.map(log => log.quality)}
        />
      </div>
    </div>
  )
}

