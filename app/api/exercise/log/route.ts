import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'

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
    const { type, duration, intensity, timeOfDay, date } = body

    const exercise = await prisma.exerciseLog.create({
      data: {
        userId: user.id,
        date: date ? new Date(date) : new Date(),
        type,
        duration: parseInt(duration),
        intensity,
        timeOfDay,
      },
    })

    return NextResponse.json({ success: true, exercise })
  } catch (error: any) {
    console.error('Exercise log error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to log exercise' },
      { status: 400 }
    )
  }
}

