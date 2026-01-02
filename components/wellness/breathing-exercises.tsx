'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Pause, RotateCcw, Wind } from 'lucide-react'
import { motion } from 'framer-motion'

const EXERCISES = [
  {
    id: '478',
    name: '4-7-8 Breathing',
    description: 'Classic sleep-inducing technique',
    inhale: 4,
    hold: 7,
    exhale: 8,
  },
  {
    id: 'box',
    name: 'Box Breathing',
    description: 'Navy SEAL technique for calm focus',
    inhale: 4,
    hold: 4,
    exhale: 4,
  },
  {
    id: 'triangle',
    name: 'Triangle Breathing',
    description: 'Simple and effective for beginners',
    inhale: 4,
    hold: 0,
    exhale: 4,
  },
  {
    id: 'coherent',
    name: 'Coherent Breathing',
    description: 'Optimal heart rate variability',
    inhale: 5,
    hold: 0,
    exhale: 5,
  },
]

export default function BreathingExercises() {
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null)
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale')
  const [timeRemaining, setTimeRemaining] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const exercise = selectedExercise 
    ? EXERCISES.find(e => e.id === selectedExercise)
    : null

  useEffect(() => {
    if (isActive && exercise) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Move to next phase
            if (phase === 'inhale') {
              if (exercise.hold > 0) {
                setPhase('hold')
                return exercise.hold
              } else {
                setPhase('exhale')
                return exercise.exhale
              }
            } else if (phase === 'hold') {
              setPhase('exhale')
              return exercise.exhale
            } else {
              setPhase('inhale')
              return exercise.inhale
            }
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive, phase, exercise])

  const handleStart = (exerciseId: string) => {
    const ex = EXERCISES.find(e => e.id === exerciseId)
    if (!ex) return
    
    setSelectedExercise(exerciseId)
    setPhase('inhale')
    setTimeRemaining(ex.inhale)
    setIsActive(true)
  }

  const handlePause = () => {
    setIsActive(false)
  }

  const handleReset = () => {
    setIsActive(false)
    setSelectedExercise(null)
    setPhase('inhale')
    setTimeRemaining(0)
  }

  const getCircleSize = () => {
    if (phase === 'inhale') return 200
    if (phase === 'hold') return 200
    return 100
  }

  const getPhaseText = () => {
    if (phase === 'inhale') return 'Breathe In'
    if (phase === 'hold') return 'Hold'
    return 'Breathe Out'
  }

  const getPhaseColor = () => {
    if (phase === 'inhale') return 'bg-teal-500'
    if (phase === 'hold') return 'bg-purple-500'
    return 'bg-blue-500'
  }

  return (
    <div className="space-y-6">
      {!selectedExercise ? (
        <div className="grid gap-4 md:grid-cols-2">
          {EXERCISES.map((ex) => (
            <Card
              key={ex.id}
              className="bg-night-light border-gray-800 hover:border-purple-500/50 cursor-pointer transition-all"
              onClick={() => handleStart(ex.id)}
            >
              <CardHeader>
                <CardTitle className="text-white">{ex.name}</CardTitle>
                <CardDescription>{ex.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Wind className="w-4 h-4" />
                  <span>
                    Inhale {ex.inhale}s
                    {ex.hold > 0 && ` • Hold ${ex.hold}s`}
                    {' • '}Exhale {ex.exhale}s
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-night-light border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">{exercise?.name}</CardTitle>
            <CardDescription>{exercise?.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-8">
              {/* Breathing Circle */}
              <motion.div
                className={`w-48 h-48 rounded-full ${getPhaseColor()} opacity-30`}
                animate={{
                  scale: phase === 'inhale' ? 1.2 : phase === 'hold' ? 1.2 : 0.8,
                }}
                transition={{
                  duration: phase === 'inhale' 
                    ? (exercise?.inhale || 4)
                    : phase === 'hold'
                    ? (exercise?.hold || 0)
                    : (exercise?.exhale || 4),
                  ease: 'easeInOut',
                }}
              />

              {/* Phase Text */}
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">{getPhaseText()}</h2>
                <p className="text-6xl font-light text-purple-400">{timeRemaining}</p>
              </div>

              {/* Controls */}
              <div className="flex gap-4">
                {isActive ? (
                  <Button onClick={handlePause} variant="outline">
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </Button>
                ) : (
                  <Button onClick={() => setIsActive(true)}>
                    <Play className="w-4 h-4 mr-2" />
                    Resume
                  </Button>
                )}
                <Button onClick={handleReset} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>

              {/* Instructions */}
              <div className="text-center text-sm text-gray-400 max-w-md">
                <p>
                  {phase === 'inhale' && 'Breathe in slowly through your nose'}
                  {phase === 'hold' && 'Hold your breath'}
                  {phase === 'exhale' && 'Exhale slowly through your mouth'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

