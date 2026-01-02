import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { moodLogSchema } from '@/lib/validations/sleep'

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
    const validated = moodLogSchema.parse(body)

    const mood = await prisma.moodLog.create({
      data: {
        userId: user.id,
        mood: validated.mood,
        energy: validated.energy,
        stress: validated.stress,
        anxiety: validated.anxiety,
        notes: validated.notes,
      },
    })

    return NextResponse.json({ success: true, mood })
  } catch (error: any) {
    console.error('Mood log error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to log mood' },
      { status: 400 }
    )
  }
}

