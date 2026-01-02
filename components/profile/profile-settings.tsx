'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Settings, User, Moon } from 'lucide-react'
import Link from 'next/link'

interface ProfileSettingsProps {
  user: {
    id: string
    name?: string | null
    email: string
    image?: string | null
  }
  sleepProfile: any
}

export default function ProfileSettings({ user, sleepProfile }: ProfileSettingsProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-night-light border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <User className="w-5 h-5 text-purple-400" />
            Account Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
            <p className="text-white">{user.name || 'Not set'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
            <p className="text-white">{user.email}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-night-light border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Moon className="w-5 h-5 text-purple-400" />
            Sleep Profile
          </CardTitle>
          <CardDescription>Your personalized sleep DNA profile</CardDescription>
        </CardHeader>
        <CardContent>
          {sleepProfile ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Chronotype</label>
                  <p className="text-white">{sleepProfile.chronotype || 'Not set'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Sleep Goal</label>
                  <p className="text-white">{sleepProfile.sleepGoal || 'Not set'} hours</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Bedtime</label>
                  <p className="text-white">{sleepProfile.bedtimePref || 'Not set'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Wake Time</label>
                  <p className="text-white">{sleepProfile.wakeupPref || 'Not set'}</p>
                </div>
              </div>
              <Link href="/onboarding">
                <Button variant="outline">Update Profile</Button>
              </Link>
            </div>
          ) : (
            <div>
              <p className="text-gray-400 mb-4">You haven't completed your sleep profile yet.</p>
              <Link href="/onboarding">
                <Button>Complete Profile</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

