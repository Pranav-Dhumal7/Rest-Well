'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Download, Calendar } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { formatDate } from '@/lib/utils'

interface HealthReportsProps {
  sleepLogs: any[]
  readinessScores: any[]
  moodLogs: any[]
  exerciseLogs: any[]
  user: any
}

export default function HealthReports({ 
  sleepLogs, 
  readinessScores, 
  moodLogs, 
  exerciseLogs,
  user 
}: HealthReportsProps) {
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'quarter'>('month')
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const handleGeneratePDF = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch(`/api/reports/generate?range=${dateRange}`, {
        method: 'GET',
      })

      if (!response.ok) throw new Error('Failed to generate report')

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `restwell-report-${dateRange}-${new Date().toISOString().split('T')[0]}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast({
        title: 'Report generated!',
        description: 'Your health report has been downloaded.',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate report. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsGenerating(false)
    }
  }

  // Prepare chart data
  const chartData = sleepLogs.slice(0, 14).reverse().map((log, idx) => ({
    date: formatDate(log.date),
    sleep: log.quality,
    readiness: readinessScores.find(r => 
      new Date(r.date).toDateString() === new Date(log.date).toDateString()
    )?.score || null,
    mood: moodLogs.find(m => 
      new Date(m.date).toDateString() === new Date(log.date).toDateString()
    )?.mood || null,
  }))

  // Calculate averages
  const avgSleep = sleepLogs.length > 0
    ? sleepLogs.reduce((sum, log) => sum + log.quality, 0) / sleepLogs.length
    : 0

  const avgReadiness = readinessScores.length > 0
    ? readinessScores.reduce((sum, score) => sum + score.score, 0) / readinessScores.length
    : 0

  const avgMood = moodLogs.length > 0
    ? moodLogs.reduce((sum, log) => sum + log.mood, 0) / moodLogs.length
    : 0

  return (
    <div className="space-y-6">
      {/* Report Generator */}
      <Card className="bg-night-light border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <FileText className="w-5 h-5 text-purple-400" />
            Generate Report
          </CardTitle>
          <CardDescription>
            Create a printable PDF report for your healthcare provider
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Report Period
            </label>
            <div className="flex gap-2">
              {(['week', 'month', 'quarter'] as const).map((range) => (
                <Button
                  key={range}
                  variant={dateRange === range ? 'default' : 'outline'}
                  onClick={() => setDateRange(range)}
                  className="capitalize"
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>
          <Button
            onClick={handleGeneratePDF}
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              'Generating...'
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Generate & Download PDF Report
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-night-light border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white text-lg">Avg Sleep Quality</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">
              {avgSleep.toFixed(1)}<span className="text-lg text-gray-400">/10</span>
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Based on {sleepLogs.length} logs
            </p>
          </CardContent>
        </Card>

        <Card className="bg-night-light border-teal-500/20">
          <CardHeader>
            <CardTitle className="text-white text-lg">Avg Readiness</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">
              {avgReadiness.toFixed(1)}<span className="text-lg text-gray-400">/10</span>
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Based on {readinessScores.length} scores
            </p>
          </CardContent>
        </Card>

        <Card className="bg-night-light border-pink-500/20">
          <CardHeader>
            <CardTitle className="text-white text-lg">Avg Mood</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">
              {avgMood.toFixed(1)}<span className="text-lg text-gray-400">/10</span>
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Based on {moodLogs.length} logs
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Trends Chart */}
      <Card className="bg-night-light border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Wellness Trends</CardTitle>
          <CardDescription>Last 14 days overview</CardDescription>
        </CardHeader>
        <CardContent>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" domain={[0, 10]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="sleep"
                  stroke="#6366f1"
                  strokeWidth={2}
                  name="Sleep Quality"
                />
                <Line
                  type="monotone"
                  dataKey="readiness"
                  stroke="#14b8a6"
                  strokeWidth={2}
                  name="Readiness"
                  strokeDasharray="5 5"
                />
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="#ec4899"
                  strokeWidth={2}
                  name="Mood"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400 text-center py-12">
              Not enough data to generate trends chart
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

