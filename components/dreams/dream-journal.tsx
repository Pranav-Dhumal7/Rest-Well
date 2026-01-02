'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Moon, Sparkles, Plus } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { formatDate } from '@/lib/utils'

interface DreamLog {
  id: string
  content: string
  mood?: string | null
  themes: string[]
  aiInsights?: any
  createdAt: Date
}

interface DreamJournalProps {
  initialDreams: DreamLog[]
  recentSleepQuality: number[]
}

export default function DreamJournal({ initialDreams, recentSleepQuality }: DreamJournalProps) {
  const [dreams, setDreams] = useState(initialDreams)
  const [isOpen, setIsOpen] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [formData, setFormData] = useState({
    content: '',
    mood: 'neutral' as 'positive' | 'neutral' | 'negative' | 'anxious',
  })
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.content.trim()) return

    setIsAnalyzing(true)
    try {
      const response = await fetch('/api/dreams/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: formData.content,
          mood: formData.mood,
        }),
      })

      if (!response.ok) throw new Error('Failed to save dream')

      const data = await response.json()
      setDreams([data.dream, ...dreams])
      setFormData({ content: '', mood: 'neutral' })
      setIsOpen(false)

      toast({
        title: 'Dream logged!',
        description: 'AI insights are being generated...',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to log dream. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-gray-400">Track your dreams and discover patterns</p>
        <Button onClick={() => setIsOpen(!isOpen)}>
          <Plus className="w-4 h-4 mr-2" />
          Log Dream
        </Button>
      </div>

      {isOpen && (
        <Card className="bg-night-light border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">New Dream Entry</CardTitle>
            <CardDescription>Describe your dream in detail</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Dream Description
                </label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Describe your dream in detail..."
                  className="bg-night border-gray-700 text-white min-h-[150px]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Mood
                </label>
                <select
                  value={formData.mood}
                  onChange={(e) => setFormData(prev => ({ ...prev, mood: e.target.value as any }))}
                  className="w-full bg-night border border-gray-700 rounded-md px-3 py-2 text-white"
                >
                  <option value="positive">Positive</option>
                  <option value="neutral">Neutral</option>
                  <option value="negative">Negative</option>
                  <option value="anxious">Anxious</option>
                </select>
              </div>
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsOpen(false)
                    setFormData({ content: '', mood: 'neutral' })
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isAnalyzing}>
                  {isAnalyzing ? 'Analyzing...' : 'Save & Analyze'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {dreams.length === 0 ? (
          <Card className="bg-night-light border-gray-800">
            <CardContent className="py-12 text-center">
              <Moon className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No dreams logged yet</p>
              <p className="text-sm text-gray-500 mt-2">Start logging your dreams to get AI insights</p>
            </CardContent>
          </Card>
        ) : (
          dreams.map((dream) => (
            <Card key={dream.id} className="bg-night-light border-gray-800">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white text-lg">{formatDate(dream.createdAt)}</CardTitle>
                    {dream.mood && (
                      <span className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${
                        dream.mood === 'positive' ? 'bg-green-500/20 text-green-400' :
                        dream.mood === 'negative' || dream.mood === 'anxious' ? 'bg-red-500/20 text-red-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {dream.mood}
                      </span>
                    )}
                  </div>
                  {dream.themes.length > 0 && (
                    <div className="flex gap-1 flex-wrap">
                      {dream.themes.map((theme, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full"
                        >
                          {theme}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 whitespace-pre-wrap">{dream.content}</p>
                {dream.aiInsights && (
                  <div className="pt-4 border-t border-gray-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      <h4 className="text-sm font-semibold text-white">AI Insights</h4>
                    </div>
                    <p className="text-sm text-gray-400">
                      {typeof dream.aiInsights === 'string' 
                        ? dream.aiInsights 
                        : dream.aiInsights.insights || 'No insights available'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

