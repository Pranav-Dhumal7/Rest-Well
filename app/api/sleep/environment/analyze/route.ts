import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { analyzeRoomImage } from '@/lib/ai/openai'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { image } = body

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
    }

    const analysis = await analyzeRoomImage(image)

    return NextResponse.json({ analysis })
  } catch (error: any) {
    console.error('Environment analysis error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to analyze environment' },
      { status: 500 }
    )
  }
}

