'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Moon, ArrowRight, ArrowLeft } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

const CHRONOTYPES = [
  { value: 'Bear', label: 'Bear', description: 'Sleep well, wake up refreshed, moderate energy throughout day' },
  { value: 'Wolf', label: 'Wolf', description: 'Night owl, most productive in evening, struggle with mornings' },
  { value: 'Lion', label: 'Lion', description: 'Early riser, peak performance in morning, early to bed' },
  { value: 'Dolphin', label: 'Dolphin', description: 'Light sleeper, intelligent, struggles with consistent sleep' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    chronotype: '',
    sleepGoal: 8,
    bedtimePref: '22:00',
    wakeupPref: '07:00',
    isHSP: false,
    workSchedule: '9-5',
    climate: '',
    stressors: [] as string[],
  })

  const totalSteps = 4

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to save profile')

      toast({
        title: 'Profile Created!',
        description: 'Your Sleep DNA profile has been saved.',
      })

      router.push('/dashboard')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save your profile. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const toggleStressor = (stressor: string) => {
    setFormData(prev => ({
      ...prev,
      stressors: prev.stressors.includes(stressor)
        ? prev.stressors.filter(s => s !== stressor)
        : [...prev.stressors, stressor]
    }))
  }

  return (
    <div className="min-h-screen gradient-night flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <Moon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Create Your Sleep DNA Profile</h1>
          <p className="text-gray-400">Help us personalize your Restwell experience</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-400">Step {step} of {totalSteps}</span>
            <span className="text-sm text-gray-400">{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <Card className="bg-night-light border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">
              {step === 1 && 'What\'s your chronotype?'}
              {step === 2 && 'Sleep preferences'}
              {step === 3 && 'Lifestyle factors'}
              {step === 4 && 'Stressors & challenges'}
            </CardTitle>
            <CardDescription>
              {step === 1 && 'Understanding your natural sleep-wake cycle'}
              {step === 2 && 'Your ideal sleep schedule'}
              {step === 3 && 'Factors that affect your sleep'}
              {step === 4 && 'What keeps you up at night?'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Chronotype */}
            {step === 1 && (
              <div className="grid gap-4">
                {CHRONOTYPES.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setFormData(prev => ({ ...prev, chronotype: type.value }))}
                    className={`p-4 rounded-lg border text-left transition-all ${
                      formData.chronotype === type.value
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <h3 className="font-semibold text-white mb-1">{type.label}</h3>
                    <p className="text-sm text-gray-400">{type.description}</p>
                  </button>
                ))}
              </div>
            )}

            {/* Step 2: Sleep Preferences */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Target Sleep Hours
                  </label>
                  <input
                    type="range"
                    min="4"
                    max="12"
                    value={formData.sleepGoal}
                    onChange={(e) => setFormData(prev => ({ ...prev, sleepGoal: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>4h</span>
                    <span className="text-purple-400 font-semibold">{formData.sleepGoal}h</span>
                    <span>12h</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Preferred Bedtime
                    </label>
                    <input
                      type="time"
                      value={formData.bedtimePref}
                      onChange={(e) => setFormData(prev => ({ ...prev, bedtimePref: e.target.value }))}
                      className="w-full bg-night border border-gray-700 rounded-md px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Preferred Wake Time
                    </label>
                    <input
                      type="time"
                      value={formData.wakeupPref}
                      onChange={(e) => setFormData(prev => ({ ...prev, wakeupPref: e.target.value }))}
                      className="w-full bg-night border border-gray-700 rounded-md px-3 py-2 text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Lifestyle */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-4">
                    Are you a Highly Sensitive Person (HSP)?
                  </label>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setFormData(prev => ({ ...prev, isHSP: true }))}
                      className={`flex-1 p-4 rounded-lg border transition-all ${
                        formData.isHSP
                          ? 'border-purple-500 bg-purple-500/10 text-white'
                          : 'border-gray-700 text-gray-400'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setFormData(prev => ({ ...prev, isHSP: false }))}
                      className={`flex-1 p-4 rounded-lg border transition-all ${
                        !formData.isHSP
                          ? 'border-purple-500 bg-purple-500/10 text-white'
                          : 'border-gray-700 text-gray-400'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Work Schedule
                  </label>
                  <select
                    value={formData.workSchedule}
                    onChange={(e) => setFormData(prev => ({ ...prev, workSchedule: e.target.value }))}
                    className="w-full bg-night border border-gray-700 rounded-md px-3 py-2 text-white"
                  >
                    <option value="9-5">9-5 Standard</option>
                    <option value="night-shift">Night Shift</option>
                    <option value="irregular">Irregular</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Climate/Region
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Tropical, Temperate, Cold"
                    value={formData.climate}
                    onChange={(e) => setFormData(prev => ({ ...prev, climate: e.target.value }))}
                    className="w-full bg-night border border-gray-700 rounded-md px-3 py-2 text-white"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Stressors */}
            {step === 4 && (
              <div className="space-y-4">
                <p className="text-sm text-gray-400 mb-4">
                  Select all that apply to you:
                </p>
                {[
                  'Work stress',
                  'Anxiety',
                  'Noise sensitivity',
                  'Light sensitivity',
                  'Temperature issues',
                  'Partner/roommate disruptions',
                  'Technology use before bed',
                  'Caffeine sensitivity',
                ].map((stressor) => (
                  <button
                    key={stressor}
                    onClick={() => toggleStressor(stressor)}
                    className={`w-full p-3 rounded-lg border text-left transition-all ${
                      formData.stressors.includes(stressor)
                        ? 'border-purple-500 bg-purple-500/10 text-white'
                        : 'border-gray-700 text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    {stressor}
                  </button>
                ))}
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6">
              <Button
                onClick={handleBack}
                variant="outline"
                disabled={step === 1}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={
                  (step === 1 && !formData.chronotype) ||
                  (step === 4 && formData.stressors.length === 0)
                }
              >
                {step === totalSteps ? 'Complete' : 'Next'}
                {step !== totalSteps && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

