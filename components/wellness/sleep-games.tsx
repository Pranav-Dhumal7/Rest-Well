'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Moon, Sparkles, Palette } from 'lucide-react'

const GAMES = [
  {
    id: 'sheep',
    name: 'Counting Sheep',
    description: 'Count gentle clouds drifting by',
    icon: Moon,
  },
  {
    id: 'mandala',
    name: 'Mandala Coloring',
    description: 'Color soothing mandala patterns',
    icon: Palette,
  },
  {
    id: 'stars',
    name: 'Star Field',
    description: 'Watch stars slowly drift',
    icon: Sparkles,
  },
]

export default function SleepGames() {
  const [activeGame, setActiveGame] = useState<string | null>(null)
  const [sheepCount, setSheepCount] = useState(0)
  const [colors, setColors] = useState<string[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleStart = (gameId: string) => {
    setActiveGame(gameId)
    if (gameId === 'sheep') {
      setSheepCount(0)
    } else if (gameId === 'mandala') {
      setColors(['#6366f1', '#8b5cf6', '#ec4899', '#14b8a6', '#0ea5e9'])
    }
  }

  const handleReset = () => {
    setActiveGame(null)
    setSheepCount(0)
  }

  // Sheep counting game
  const renderSheep = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-8">
        <div className="text-8xl">🐑</div>
        <div className="text-center">
          <h2 className="text-3xl font-light text-white mb-2">{sheepCount}</h2>
          <p className="text-gray-400">sheep</p>
        </div>
        <Button
          onClick={() => setSheepCount(prev => prev + 1)}
          variant="outline"
          className="px-8"
        >
          Count
        </Button>
        <p className="text-sm text-gray-500 text-center max-w-md">
          Tap to count each sheep as they drift by. Focus on the gentle rhythm.
        </p>
      </div>
    )
  }

  // Mandala coloring game
  const renderMandala = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
        <div className="relative">
          <svg width="300" height="300" className="opacity-50">
            <circle cx="150" cy="150" r="140" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-400" />
            <circle cx="150" cy="150" r="100" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-teal-400" />
            <circle cx="150" cy="150" r="60" fill="none" stroke="currentColor" strokeWidth="1" className="text-pink-400" />
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <line
                key={i}
                x1="150"
                y1="150"
                x2={150 + 140 * Math.cos((angle * Math.PI) / 180)}
                y2={150 + 140 * Math.sin((angle * Math.PI) / 180)}
                stroke="currentColor"
                strokeWidth="1"
                className="text-purple-400"
              />
            ))}
          </svg>
        </div>
        <div className="flex gap-2">
          {colors.map((color, i) => (
            <button
              key={i}
              className="w-12 h-12 rounded-full border-2 border-gray-700"
              style={{ backgroundColor: color }}
              onClick={() => {
                // Simple interaction - could be expanded
              }}
            />
          ))}
        </div>
        <p className="text-sm text-gray-500 text-center max-w-md">
          Tap colors to fill the mandala. There's no right or wrong way - just relax and create.
        </p>
      </div>
    )
  }

  // Star field game
  useEffect(() => {
    if (activeGame === 'stars' && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      canvas.width = 800
      canvas.height = 600

      const stars: Array<{ x: number; y: number; size: number; speed: number }> = []
      for (let i = 0; i < 50; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2,
          speed: Math.random() * 0.5 + 0.1,
        })
      }

      const animate = () => {
        if (activeGame !== 'stars') return

        ctx.fillStyle = '#0f172a'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        stars.forEach(star => {
          star.y += star.speed
          if (star.y > canvas.height) {
            star.y = 0
            star.x = Math.random() * canvas.width
          }

          ctx.fillStyle = '#ffffff'
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
          ctx.fill()
        })

        requestAnimationFrame(animate)
      }

      animate()
    }
  }, [activeGame])

  const renderStars = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
        <canvas
          ref={canvasRef}
          className="border border-gray-800 rounded-lg bg-night"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        <p className="text-sm text-gray-500 text-center max-w-md">
          Watch the stars drift slowly across the sky. Let your mind follow them gently.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {!activeGame ? (
        <div className="grid gap-4 md:grid-cols-3">
          {GAMES.map((game) => {
            const Icon = game.icon
            return (
              <Card
                key={game.id}
                className="bg-night-light border-gray-800 hover:border-purple-500/50 cursor-pointer transition-all"
                onClick={() => handleStart(game.id)}
              >
                <CardHeader>
                  <Icon className="w-8 h-8 text-purple-400 mb-2" />
                  <CardTitle className="text-white">{game.name}</CardTitle>
                  <CardDescription>{game.description}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card className="bg-night-light border-purple-500/20">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-white">
                  {GAMES.find(g => g.id === activeGame)?.name}
                </CardTitle>
                <CardDescription>
                  {GAMES.find(g => g.id === activeGame)?.description}
                </CardDescription>
              </div>
              <Button onClick={handleReset} variant="outline">
                Exit
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {activeGame === 'sheep' && renderSheep()}
            {activeGame === 'mandala' && renderMandala()}
            {activeGame === 'stars' && renderStars()}
          </CardContent>
        </Card>
      )}

      <Card className="bg-night-light border-gray-800">
        <CardContent className="p-6">
          <p className="text-sm text-gray-400 text-center">
            💤 These games are designed to be calming and repetitive, helping your mind transition into sleep. 
            If you find yourself getting too engaged, switch to a breathing exercise instead.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

