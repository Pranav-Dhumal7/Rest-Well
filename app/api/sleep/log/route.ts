import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { sleepLogSchema } from '@/lib/validations/sleep'
import { calculateSleepHours } from '@/lib/utils'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const body = await request.json()
    const bedtime = new Date(body.bedtime)
    const wakeTime = new Date(body.wakeTime)
    
    const validated = sleepLogSchema.parse({
      ...body,
      bedtime,
      wakeTime,
      date: new Date(body.date),
    })

    const totalSleep = calculateSleepHours(bedtime, wakeTime)

    const sleepLog = await prisma.sleepLog.create({
      data: {
        userId: user.id,
        date: validated.date,
        bedtime: validated.bedtime,
        wakeTime: validated.wakeTime,
        quality: validated.quality,
        deepSleep: validated.deepSleep,
        remSleep: validated.remSleep,
        lightSleep: validated.lightSleep,
        totalSleep,
        notes: validated.notes,
        caffeine: validated.caffeine,
        alcohol: validated.alcohol ?? false,
        exercise: validated.exercise ?? false,
      },
    })

    return NextResponse.json({ success: true, sleepLog })
  } catch (error: any) {
    console.error('Sleep log error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to save sleep log' },
      { status: 400 }
    )
  }
}

