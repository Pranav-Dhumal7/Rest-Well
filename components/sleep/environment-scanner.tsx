'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload, Loader2, Home, CheckCircle2 } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

export default function EnvironmentScanner() {
  const [isUploading, setIsUploading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const { toast } = useToast()

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file',
        description: 'Please upload an image file.',
        variant: 'destructive',
      })
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleAnalyze = async () => {
    if (!imagePreview) return

    setIsAnalyzing(true)
    try {
      // Convert base64 to blob
      const response = await fetch(imagePreview)
      const blob = await response.blob()
      
      // Convert to base64 for API
      const reader = new FileReader()
      reader.onloadend = async () => {
        const base64data = (reader.result as string).split(',')[1]
        
        const apiResponse = await fetch('/api/sleep/environment/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64data }),
        })

        if (!apiResponse.ok) throw new Error('Analysis failed')

        const data = await apiResponse.json()
        setAnalysis(data.analysis)
      }
      reader.readAsDataURL(blob)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to analyze image. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-night-light border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Home className="w-5 h-5 text-purple-400" />
            Upload Bedroom Photo
          </CardTitle>
          <CardDescription>
            Our AI will analyze your sleep environment and provide personalized recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!imagePreview ? (
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-12 text-center">
              <Upload className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">Upload a clear photo of your bedroom</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload">
                <Button as="span" variant="outline">
                  Choose Image
                </Button>
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden border border-gray-700">
                <img
                  src={imagePreview}
                  alt="Bedroom preview"
                  className="w-full h-auto max-h-96 object-contain bg-night"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    setImagePreview(null)
                    setAnalysis(null)
                  }}
                >
                  Remove
                </Button>
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Analyze Environment
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {analysis && (
        <Card className="bg-night-light border-teal-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <CheckCircle2 className="w-5 h-5 text-teal-400" />
              AI Analysis & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-gray-300">{analysis}</div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

