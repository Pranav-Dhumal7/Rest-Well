'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { Moon } from 'lucide-react'

export default function SleepLogForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    bedtime: '22:00',
    wakeTime: '07:00',
    quality: 7,
    notes: '',
    caffeine: 0,
    alcohol: false,
    exercise: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Combine date with time
      const bedtimeDate = new Date(`${formData.date}T${formData.bedtime}`)
      const wakeTimeDate = new Date(`${formData.date}T${formData.wakeTime}`)
      
      // If wake time is earlier than bedtime, it's the next day
      if (wakeTimeDate < bedtimeDate) {
        wakeTimeDate.setDate(wakeTimeDate.getDate() + 1)
      }

      const response = await fetch('/api/sleep/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          bedtime: bedtimeDate.toISOString(),
          wakeTime: wakeTimeDate.toISOString(),
          date: new Date(formData.date).toISOString(),
        }),
      })

      if (!response.ok) throw new Error('Failed to save sleep log')

      toast({
        title: 'Sleep logged!',
        description: 'Your sleep session has been recorded.',
      })

      router.push('/sleep/tracker')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to log sleep. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-night-light border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Moon className="w-5 h-5 text-purple-400" />
          Sleep Session
        </CardTitle>
        <CardDescription>Record details about your sleep</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Date
            </label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="bg-night border-gray-700 text-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Bedtime
              </label>
              <Input
                type="time"
                value={formData.bedtime}
                onChange={(e) => setFormData(prev => ({ ...prev, bedtime: e.target.value }))}
                className="bg-night border-gray-700 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Wake Time
              </label>
              <Input
                type="time"
                value={formData.wakeTime}
                onChange={(e) => setFormData(prev => ({ ...prev, wakeTime: e.target.value }))}
                className="bg-night border-gray-700 text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Sleep Quality: {formData.quality}/10
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.quality}
              onChange={(e) => setFormData(prev => ({ ...prev, quality: parseInt(e.target.value) }))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Poor</span>
              <span>Excellent</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Caffeine (servings before bed)
            </label>
            <Input
              type="number"
              min="0"
              value={formData.caffeine}
              onChange={(e) => setFormData(prev => ({ ...prev, caffeine: parseInt(e.target.value) || 0 }))}
              className="bg-night border-gray-700 text-white"
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.alcohol}
                onChange={(e) => setFormData(prev => ({ ...prev, alcohol: e.target.checked }))}
                className="rounded border-gray-700"
              />
              <span className="text-white">Consumed alcohol before bed</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.exercise}
                onChange={(e) => setFormData(prev => ({ ...prev, exercise: e.target.checked }))}
                className="rounded border-gray-700"
              />
              <span className="text-white">Exercised today</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Notes (optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="w-full bg-night border border-gray-700 rounded-md px-3 py-2 text-white min-h-[100px]"
              placeholder="How did you feel? Any disturbances?"
            />
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? 'Saving...' : 'Save Sleep Log'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

