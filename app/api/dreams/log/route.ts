import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { dreamLogSchema } from '@/lib/validations/sleep'
import { analyzeDreamContent } from '@/lib/ai/openai'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        sleepLogs: {
          take: 7,
          orderBy: { date: 'desc' },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const body = await request.json()
    const validated = dreamLogSchema.parse(body)

    // Get recent sleep quality for analysis
    const recentSleepQuality = user.sleepLogs.map(log => log.quality)

    // Analyze dream content with AI
    const analysis = await analyzeDreamContent(
      validated.content,
      recentSleepQuality.length > 0 ? recentSleepQuality : [7, 7, 7, 7, 7, 7, 7]
    )

    const dream = await prisma.dreamLog.create({
      data: {
        userId: user.id,
        content: validated.content,
        mood: validated.mood || undefined,
        themes: analysis.themes,
        aiInsights: analysis.insights as any,
      },
    })

    return NextResponse.json({
      success: true,
      dream: {
        ...dream,
        aiInsights: analysis.insights,
      },
    })
  } catch (error: any) {
    console.error('Dream log error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to log dream' },
      { status: 400 }
    )
  }
}

