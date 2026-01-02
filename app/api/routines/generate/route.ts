import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { generateWindDownRoutine } from '@/lib/ai/openai'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        sleepProfile: true,
      },
    })

    if (!user || !user.sleepProfile) {
      return NextResponse.json(
        { error: 'User profile not found. Please complete onboarding.' },
        { status: 404 }
      )
    }

    const routine = await generateWindDownRoutine({
      chronotype: user.sleepProfile.chronotype || 'Bear',
      stressors: user.sleepProfile.stressors || [],
      preferences: {
        bedtime: user.sleepProfile.bedtimePref,
        wakeTime: user.sleepProfile.wakeupPref,
        isHSP: user.sleepProfile.isHSP,
      },
    })

    return NextResponse.json({ success: true, routine })
  } catch (error: any) {
    console.error('Routine generation error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate routine' },
      { status: 500 }
    )
  }
}

