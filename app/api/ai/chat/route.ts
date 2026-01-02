import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { openai, SLEEP_CONCIERGE_SYSTEM_PROMPT } from '@/lib/ai/openai'

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

    const body = await request.json()
    const { message, conversationHistory } = body

    // Build context from user data
    const context = `
User Profile:
- Chronotype: ${user.sleepProfile?.chronotype || 'Not set'}
- Sleep Goal: ${user.sleepProfile?.sleepGoal || 8} hours
- Preferred Bedtime: ${user.sleepProfile?.bedtimePref || 'Not set'}
- Work Schedule: ${user.sleepProfile?.workSchedule || 'Not set'}
- Stressors: ${user.sleepProfile?.stressors.join(', ') || 'None'}

Recent Sleep Logs (last 7 days):
${JSON.stringify(user.sleepLogs, null, 2)}

Recent Exercise:
${JSON.stringify(user.exerciseLogs, null, 2)}

Recent Mood Logs:
${JSON.stringify(user.moodLogs, null, 2)}
`.trim()

    // Build messages array
    const messages = [
      { role: 'system', content: SLEEP_CONCIERGE_SYSTEM_PROMPT + '\n\n' + context },
      ...conversationHistory,
      { role: 'user', content: message },
    ]

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: messages as any,
      temperature: 0.7,
      max_tokens: 500,
    })

    const response = completion.choices[0]?.message?.content || 'Sorry, I couldn\'t process that request.'

    return NextResponse.json({ response })
  } catch (error: any) {
    console.error('AI chat error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to process chat' },
      { status: 500 }
    )
  }
}

