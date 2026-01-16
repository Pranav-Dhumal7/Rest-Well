import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Moon, Brain, Users, BarChart3, Sparkles } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen gradient-night">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Moon className="w-8 h-8 text-purple-400" />
          <span className="text-2xl font-bold text-white">Restwell</span>
        </div>
        <div className="flex gap-4">
          <Link href="/auth/signin">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/auth/signup">
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Sleep Better,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-400">
              Live Better
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your AI-powered companion for personalized sleep optimization, 
            wellness tracking, and holistic rest. Discover your Sleep DNA and 
            unlock your best night's sleep.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Link href="/auth/signup">
              <Button size="lg" className="text-lg px-8">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="text-lg px-8">
                See Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Brain className="w-8 h-8" />}
            title="AI Sleep Concierge"
            description="Get personalized sleep insights and recommendations powered by AI that learns your unique patterns."
          />
          <FeatureCard
            icon={<Moon className="w-8 h-8" />}
            title="Sleep DNA Profile"
            description="Discover your unique chronotype and sleep signature through our comprehensive wellness questionnaire."
          />
          <FeatureCard
            icon={<BarChart3 className="w-8 h-8" />}
            title="Advanced Analytics"
            description="Track sleep quality, readiness scores, and correlations with exercise, mood, and daily activities."
          />
          <FeatureCard
            icon={<Users className="w-8 h-8" />}
            title="Community Features"
            description="Join live wind-down sessions, share tips, and participate in wellness challenges with others."
          />
          <FeatureCard
            icon={<Sparkles className="w-8 h-8" />}
            title="Wellness Tools"
            description="Breathing exercises, soundscapes, sleep-inducing mini-games, and dream journal with AI insights."
          />
          <FeatureCard
            icon={<Moon className="w-8 h-8" />}
            title="Environment Scanner"
            description="Upload a photo of your bedroom and get AI-powered recommendations for optimal sleep environment."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto bg-night-light rounded-2xl p-12 border border-purple-500/20">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Sleep?
          </h2>
          <p className="text-gray-300 mb-8">
            Join thousands of users who have improved their sleep quality and overall wellness with Restwell.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="text-lg px-8">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t border-gray-800">
        <div className="text-center text-gray-400">
          <p>&copy; 2024 Restwell. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-night-light rounded-xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all">
      <div className="text-purple-400 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

