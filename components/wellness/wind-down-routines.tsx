'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles, Loader2, RefreshCw } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

export default function WindDownRoutines() {
  const [routine, setRoutine] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch('/api/routines/generate', {
        method: 'POST',
      })

      if (!response.ok) throw new Error('Failed to generate routine')

      const data = await response.json()
      setRoutine(data.routine)

      toast({
        title: 'Routine generated!',
        description: 'Your personalized wind-down routine is ready.',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate routine. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-night-light border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Sparkles className="w-5 h-5 text-purple-400" />
            Personalized Wind-Down Routine
          </CardTitle>
          <CardDescription>
            Get a custom 30-minute pre-sleep routine based on your Sleep DNA profile
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!routine ? (
            <div className="text-center py-12">
              <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-4 opacity-50" />
              <p className="text-gray-400 mb-6">
                Generate a personalized wind-down routine tailored to your chronotype, 
                preferences, and stressors
              </p>
              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Routine
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-night rounded-lg p-6 border border-gray-800">
                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                    {routine}
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  variant="outline"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generate New Routine
                </Button>
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(routine)
                    toast({
                      title: 'Copied!',
                      description: 'Routine copied to clipboard',
                    })
                  }}
                  variant="outline"
                >
                  Copy Routine
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-night-light border-gray-800">
        <CardContent className="p-6">
          <h3 className="text-white font-semibold mb-2">💡 Tips for Success</h3>
          <ul className="space-y-2 text-sm text-gray-400 list-disc list-inside">
            <li>Start your routine 30-60 minutes before your target bedtime</li>
            <li>Eliminate distractions (put phone away, dim lights)</li>
            <li>Follow the routine consistently for best results</li>
            <li>Adjust the routine based on what works best for you</li>
            <li>Don't worry if you can't follow every step perfectly</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

