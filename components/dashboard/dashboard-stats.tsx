'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect, useState } from 'react'

interface DashboardStatsProps {
  userId: string
}

export default function DashboardStats({ userId }: DashboardStatsProps) {
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    // Fetch stats - this would be an API call
    // For now, placeholder
    setStats({
      weeklyAvg: 7.5,
      consistency: 85,
      improvement: '+12%',
    })
  }, [userId])

  if (!stats) return null

  return (
    <Card className="bg-night-light border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Weekly Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-2xl font-semibold text-white">{stats.weeklyAvg}h</p>
            <p className="text-xs text-gray-400">Avg Sleep</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-white">{stats.consistency}%</p>
            <p className="text-xs text-gray-400">Consistency</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-teal-400">{stats.improvement}</p>
            <p className="text-xs text-gray-400">vs Last Week</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

