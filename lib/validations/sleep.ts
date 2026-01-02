import { z } from 'zod'

export const sleepLogSchema = z.object({
  date: z.date(),
  bedtime: z.date(),
  wakeTime: z.date(),
  quality: z.number().min(1).max(10),
  deepSleep: z.number().optional(),
  remSleep: z.number().optional(),
  lightSleep: z.number().optional(),
  notes: z.string().optional(),
  caffeine: z.number().min(0).optional(),
  alcohol: z.boolean().optional(),
  exercise: z.boolean().optional(),
})

export const sleepProfileSchema = z.object({
  chronotype: z.enum(['Wolf', 'Bear', 'Lion', 'Dolphin']).optional(),
  sleepGoal: z.number().min(4).max(12).optional(),
  bedtimePref: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
  wakeupPref: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
  isHSP: z.boolean().optional(),
  workSchedule: z.string().optional(),
  climate: z.string().optional(),
  stressors: z.array(z.string()).optional(),
})

export const dreamLogSchema = z.object({
  content: z.string().min(10),
  mood: z.enum(['positive', 'neutral', 'negative', 'anxious']).optional(),
  sleepLogId: z.string().optional(),
})

export const moodLogSchema = z.object({
  mood: z.number().min(1).max(10),
  energy: z.number().min(1).max(10).optional(),
  stress: z.number().min(1).max(10).optional(),
  anxiety: z.number().min(1).max(10).optional(),
  notes: z.string().optional(),
})

