'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Moon, Brain, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function QuickActions() {
  return (
    <Card className="bg-night-light border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Link href="/sleep/log">
          <Button className="w-full justify-start" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Log Sleep
          </Button>
        </Link>
        <Link href="/ai/concierge">
          <Button className="w-full justify-start" variant="outline">
            <Brain className="w-4 h-4 mr-2" />
            Ask AI Concierge
          </Button>
        </Link>
        <Link href="/wellness/routines">
          <Button className="w-full justify-start" variant="outline">
            <Sparkles className="w-4 h-4 mr-2" />
            Generate Routine
          </Button>
        </Link>
        <Link href="/sleep/tracker">
          <Button className="w-full justify-start" variant="outline">
            <Moon className="w-4 h-4 mr-2" />
            View Sleep History
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

