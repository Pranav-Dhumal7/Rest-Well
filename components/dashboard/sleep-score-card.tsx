'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Moon } from 'lucide-react'
import { calculateSleepHours } from '@/lib/utils'
import { formatDate } from '@/lib/utils'

interface SleepLog {
  id: string
  bedtime: Date
  wakeTime: Date
  quality: number
  totalSleep?: number | null
  date: Date
}

interface SleepScoreCardProps {
  sleepLogs: SleepLog[]
}

export default function SleepScoreCard({ sleepLogs }: SleepScoreCardProps) {
  const latestLog = sleepLogs[0]
  
  if (!latestLog) {
    return (
      <Card className="bg-night-light border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Moon className="w-5 h-5 text-purple-400" />
            Sleep Score
          </CardTitle>
          <CardDescription>No sleep data yet</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400">Log your first sleep to see your score</p>
        </CardContent>
      </Card>
    )
  }

  const sleepHours = latestLog.totalSleep || calculateSleepHours(
    new Date(latestLog.bedtime),
    new Date(latestLog.wakeTime)
  )
  const quality = latestLog.quality

  // Calculate average quality over last 7 days
  const avgQuality = sleepLogs.length > 0
    ? sleepLogs.reduce((sum, log) => sum + log.quality, 0) / sleepLogs.length
    : quality

  return (
    <Card className="bg-night-light border-purple-500/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Moon className="w-5 h-5 text-purple-400" />
          Sleep Score
        </CardTitle>
        <CardDescription>Last night: {formatDate(latestLog.date)}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-white">{quality}</span>
              <span className="text-gray-400">/10</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">Quality Score</p>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-800">
            <div>
              <p className="text-2xl font-semibold text-white">{sleepHours.toFixed(1)}h</p>
              <p className="text-xs text-gray-400">Total Sleep</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-white">{avgQuality.toFixed(1)}</p>
              <p className="text-xs text-gray-400">7-day Avg</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

