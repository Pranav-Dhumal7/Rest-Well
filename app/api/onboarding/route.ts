import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { sleepProfileSchema } from '@/lib/validations/sleep'

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
    const validated = sleepProfileSchema.parse(body)

    // Generate sleep signature
    const sleepSignature = {
      chronotype: validated.chronotype,
      sleepPattern: {
        goal: validated.sleepGoal,
        bedtime: validated.bedtimePref,
        wakeTime: validated.wakeupPref,
      },
      preferences: {
        isHSP: validated.isHSP,
        workSchedule: validated.workSchedule,
        climate: validated.climate,
      },
      stressors: validated.stressors,
      createdAt: new Date().toISOString(),
    }

    // Create or update sleep profile
    await prisma.sleepProfile.upsert({
      where: { userId: user.id },
      update: {
        chronotype: validated.chronotype || undefined,
        sleepGoal: validated.sleepGoal || undefined,
        bedtimePref: validated.bedtimePref || undefined,
        wakeupPref: validated.wakeupPref || undefined,
        isHSP: validated.isHSP,
        workSchedule: validated.workSchedule || undefined,
        climate: validated.climate || undefined,
        stressors: validated.stressors || [],
        sleepSignature: sleepSignature as any,
      },
      create: {
        userId: user.id,
        chronotype: validated.chronotype || undefined,
        sleepGoal: validated.sleepGoal || undefined,
        bedtimePref: validated.bedtimePref || undefined,
        wakeupPref: validated.wakeupPref || undefined,
        isHSP: validated.isHSP,
        workSchedule: validated.workSchedule || undefined,
        climate: validated.climate || undefined,
        stressors: validated.stressors || [],
        sleepSignature: sleepSignature as any,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Onboarding error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to save profile' },
      { status: 400 }
    )
  }
}

