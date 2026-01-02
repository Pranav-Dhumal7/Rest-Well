'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity } from 'lucide-react'

interface ReadinessScore {
  id: string
  score: number
  recommendation?: string | null
  date: Date
}

interface ReadinessScoreCardProps {
  readinessScore?: ReadinessScore | null
}

export default function ReadinessScoreCard({ readinessScore }: ReadinessScoreCardProps) {
  if (!readinessScore) {
    return (
      <Card className="bg-night-light border-teal-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Activity className="w-5 h-5 text-teal-400" />
            Readiness Score
          </CardTitle>
          <CardDescription>Calculating your daily readiness...</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400">Complete your daily check-in to see your score</p>
        </CardContent>
      </Card>
    )
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-teal-400'
    if (score >= 6) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 8) return 'Excellent'
    if (score >= 6) return 'Good'
    if (score >= 4) return 'Fair'
    return 'Recovery'
  }

  return (
    <Card className="bg-night-light border-teal-500/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Activity className="w-5 h-5 text-teal-400" />
          Readiness Score
        </CardTitle>
        <CardDescription>Today's recovery status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className={`text-4xl font-bold ${getScoreColor(readinessScore.score)}`}>
                {readinessScore.score}
              </span>
              <span className="text-gray-400">/10</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">{getScoreLabel(readinessScore.score)}</p>
          </div>
          {readinessScore.recommendation && (
            <div className="pt-4 border-t border-gray-800">
              <p className="text-sm text-gray-300">{readinessScore.recommendation}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

