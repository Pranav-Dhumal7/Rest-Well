'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

interface RecentInsightsProps {
  userId: string
}

export default function RecentInsights({ userId }: RecentInsightsProps) {
  const [insights, setInsights] = useState<string[]>([])

  useEffect(() => {
    // Fetch AI insights - placeholder for now
    setInsights([
      "Your sleep quality improves by 15% when you exercise before 6 PM.",
      "You sleep best on nights when you avoid caffeine after 2 PM.",
    ])
  }, [userId])

  if (insights.length === 0) return null

  return (
    <Card className="bg-night-light border-purple-500/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Sparkles className="w-5 h-5 text-purple-400" />
          Recent Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {insights.map((insight, index) => (
            <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>{insight}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

