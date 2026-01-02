import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

export function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  if (hour < 21) return 'Good evening'
  return 'Good night'
}

export function calculateSleepHours(bedtime: Date, wakeTime: Date): number {
  const diff = wakeTime.getTime() - bedtime.getTime()
  return Math.round((diff / (1000 * 60 * 60)) * 10) / 10
}

export function calculateReadinessScore(
  sleepScore: number,
  exerciseScore: number,
  moodScore: number,
  stressScore: number
): number {
  const weights = { sleep: 0.4, exercise: 0.2, mood: 0.2, stress: 0.2 }
  return Math.round(
    sleepScore * weights.sleep +
    exerciseScore * weights.exercise +
    moodScore * weights.mood +
    (10 - stressScore) * weights.stress
  )
}

