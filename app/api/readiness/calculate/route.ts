import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { calculateReadinessScore } from '@/lib/utils'

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
        exerciseLogs: {
          take: 7,
          orderBy: { date: 'desc' },
        },
        moodLogs: {
          take: 7,
          orderBy: { date: 'desc' },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Calculate sleep score (0-10)
    const latestSleep = user.sleepLogs[0]
    const sleepScore = latestSleep
      ? (latestSleep.quality / 10) * 10
      : 7 // Default if no sleep data

    // Calculate exercise score (0-10)
    const recentExercise = user.exerciseLogs.filter(
      log => new Date(log.date).getTime() >= today.getTime() - 7 * 24 * 60 * 60 * 1000
    )
    const exerciseScore = recentExercise.length > 0
      ? Math.min(10, (recentExercise.length / 7) * 10)
      : 5 // Default if no exercise

    // Calculate mood score (0-10)
    const latestMood = user.moodLogs[0]
    const moodScore = latestMood
      ? latestMood.mood
      : 7 // Default if no mood data

    // Calculate stress score (0-10, inverted)
    const stressScore = latestMood?.stress || 5

    // Calculate overall readiness
    const readiness = calculateReadinessScore(sleepScore, exerciseScore, moodScore, stressScore)

    // Generate recommendation
    let recommendation = ''
    let prescription: any = {}

    if (readiness >= 8) {
      recommendation = 'Excellent recovery! You\'re ready for high-intensity activities today.'
      prescription = {
        activity: 'high-intensity',
        workout: 'intense',
        focus: 'performance',
      }
    } else if (readiness >= 6) {
      recommendation = 'Good recovery. You can handle moderate activities, but listen to your body.'
      prescription = {
        activity: 'moderate',
        workout: 'moderate',
        focus: 'maintenance',
      }
    } else if (readiness >= 4) {
      recommendation = 'Fair recovery. Focus on gentle movement and recovery activities today.'
      prescription = {
        activity: 'low-intensity',
        workout: 'light',
        focus: 'recovery',
      }
    } else {
      recommendation = 'Focus on rest and recovery today. Gentle stretching and hydration are key.'
      prescription = {
        activity: 'rest',
        workout: 'none',
        focus: 'restoration',
      }
    }

    // Save or update readiness score for today
    const readinessScore = await prisma.readinessScore.upsert({
      where: {
        userId_date: {
          userId: user.id,
          date: today,
        },
      },
      update: {
        score: readiness,
        sleepScore,
        exerciseScore,
        moodScore,
        stressScore,
        recommendation,
        prescription: prescription as any,
      },
      create: {
        userId: user.id,
        date: today,
        score: readiness,
        sleepScore,
        exerciseScore,
        moodScore,
        stressScore,
        recommendation,
        prescription: prescription as any,
      },
    })

    return NextResponse.json({
      success: true,
      readinessScore,
    })
  } catch (error: any) {
    console.error('Readiness calculation error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to calculate readiness' },
      { status: 500 }
    )
  }
}

