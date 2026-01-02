'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Moon, Brain, Users, BarChart3, Settings, LogOut, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { href: '/sleep/tracker', label: 'Sleep', icon: Moon },
  { href: '/ai/concierge', label: 'AI Concierge', icon: Brain },
  { href: '/wellness', label: 'Wellness', icon: Heart },
  { href: '/community', label: 'Community', icon: Users },
  { href: '/profile', label: 'Settings', icon: Settings },
]

export default function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="bg-night-light border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Moon className="w-6 h-6 text-purple-400" />
            <span className="text-xl font-bold text-white">Restwell</span>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname.startsWith(item.href)
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      'flex items-center gap-2',
                      isActive && 'bg-purple-500/20 text-purple-400'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden md:inline">{item.label}</span>
                  </Button>
                </Link>
              )
            })}
            <Button
              variant="ghost"
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

