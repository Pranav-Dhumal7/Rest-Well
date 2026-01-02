'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Calendar } from 'lucide-react'
import { formatDate, calculateSleepHours } from '@/lib/utils'
import Link from 'next/link'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface SleepLog {
  id: string
  date: Date
  bedtime: Date
  wakeTime: Date
  quality: number
  totalSleep?: number | null
}

interface SleepTrackerProps {
  initialLogs: SleepLog[]
}

export default function SleepTracker({ initialLogs }: SleepTrackerProps) {
  const [logs] = useState(initialLogs)

  const chartData = logs
    .slice()
    .reverse()
    .map((log) => ({
      date: formatDate(log.date),
      quality: log.quality,
      hours: log.totalSleep || calculateSleepHours(new Date(log.bedtime), new Date(log.wakeTime)),
    }))

  const avgQuality = logs.length > 0
    ? logs.reduce((sum, log) => sum + log.quality, 0) / logs.length
    : 0

  const avgHours = logs.length > 0
    ? logs.reduce((sum, log) => {
        const hours = log.totalSleep || calculateSleepHours(new Date(log.bedtime), new Date(log.wakeTime))
        return sum + hours
      }, 0) / logs.length
    : 0

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-night-light border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white text-lg">Total Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">{logs.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-night-light border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white text-lg">Avg Quality</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">{avgQuality.toFixed(1)}<span className="text-lg text-gray-400">/10</span></p>
          </CardContent>
        </Card>
        <Card className="bg-night-light border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white text-lg">Avg Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">{avgHours.toFixed(1)}<span className="text-lg text-gray-400">h</span></p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="bg-night-light border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Sleep Trends</CardTitle>
        </CardHeader>
        <CardContent>
          {logs.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="quality"
                  stroke="#6366f1"
                  strokeWidth={2}
                  name="Quality"
                />
                <Line
                  type="monotone"
                  dataKey="hours"
                  stroke="#14b8a6"
                  strokeWidth={2}
                  name="Hours"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">No sleep logs yet</p>
              <Link href="/sleep/log">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Log Your First Sleep
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Logs */}
      {logs.length > 0 && (
        <Card className="bg-night-light border-gray-800">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-white">Recent Logs</CardTitle>
              <Link href="/sleep/log">
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Log
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {logs.slice(0, 10).map((log) => {
                const hours = log.totalSleep || calculateSleepHours(new Date(log.bedtime), new Date(log.wakeTime))
                return (
                  <div
                    key={log.id}
                    className="flex justify-between items-center p-4 bg-night rounded-lg border border-gray-800"
                  >
                    <div>
                      <p className="text-white font-medium">{formatDate(log.date)}</p>
                      <p className="text-sm text-gray-400">
                        {hours.toFixed(1)} hours • Quality: {log.quality}/10
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      log.quality >= 8 ? 'bg-teal-500/20 text-teal-400' :
                      log.quality >= 6 ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {log.quality}/10
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

