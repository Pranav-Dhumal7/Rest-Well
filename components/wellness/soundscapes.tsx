'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

const SOUNDSCAPES = [
  {
    id: 'rain',
    name: 'Gentle Rain',
    description: 'Soft rainfall in a forest',
    icon: '🌧️',
    color: 'from-blue-500/20 to-teal-500/20',
  },
  {
    id: 'ocean',
    name: 'Ocean Waves',
    description: 'Calming waves on a beach',
    icon: '🌊',
    color: 'from-teal-500/20 to-cyan-500/20',
  },
  {
    id: 'forest',
    name: 'Forest Ambience',
    description: 'Birds and rustling leaves',
    icon: '🌲',
    color: 'from-green-500/20 to-emerald-500/20',
  },
  {
    id: 'fireplace',
    name: 'Crackling Fire',
    description: 'Warm fireplace sounds',
    icon: '🔥',
    color: 'from-orange-500/20 to-red-500/20',
  },
  {
    id: 'white-noise',
    name: 'White Noise',
    description: 'Consistent ambient sound',
    icon: '⚪',
    color: 'from-gray-500/20 to-slate-500/20',
  },
  {
    id: 'brown-noise',
    name: 'Brown Noise',
    description: 'Deeper, richer ambient sound',
    icon: '🟤',
    color: 'from-amber-500/20 to-yellow-500/20',
  },
]

export default function Soundscapes() {
  const [playing, setPlaying] = useState<string | null>(null)
  const [volume, setVolume] = useState(50)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Generate white noise programmatically
    if (audioRef.current) {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const bufferSize = 4096
      const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate)
      const data = buffer.getChannelData(0)

      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1
      }

      const source = audioContext.createBufferSource()
      source.buffer = buffer
      source.loop = true

      const gainNode = audioContext.createGain()
      gainNode.gain.value = isMuted ? 0 : volume / 100

      source.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      if (playing) {
        source.start()
      }

      return () => {
        source.stop()
      }
    }
  }, [playing, volume, isMuted])

  const handlePlay = (id: string) => {
    if (playing === id) {
      setPlaying(null)
    } else {
      setPlaying(id)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <div className="space-y-6">
      {/* Now Playing Bar */}
      {playing && (
        <Card className="bg-night-light border-purple-500/20 sticky top-4 z-10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-4xl">
                  {SOUNDSCAPES.find(s => s.id === playing)?.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold">
                    {SOUNDSCAPES.find(s => s.id === playing)?.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {SOUNDSCAPES.find(s => s.id === playing)?.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(parseInt(e.target.value))}
                  className="w-24"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMute}
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setPlaying(null)}
                >
                  Stop
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Soundscape Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {SOUNDSCAPES.map((soundscape) => (
          <Card
            key={soundscape.id}
            className={`bg-night-light border-gray-800 hover:border-purple-500/50 transition-all ${
              playing === soundscape.id ? 'border-purple-500/50' : ''
            }`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">{soundscape.name}</CardTitle>
                  <CardDescription>{soundscape.description}</CardDescription>
                </div>
                <div className="text-4xl">{soundscape.icon}</div>
              </div>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => handlePlay(soundscape.id)}
                variant={playing === soundscape.id ? 'default' : 'outline'}
                className="w-full"
              >
                {playing === soundscape.id ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Stop
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Play
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info */}
      <Card className="bg-night-light border-gray-800">
        <CardContent className="p-6">
          <p className="text-sm text-gray-400 text-center">
            💡 Tip: Use soundscapes 30-60 minutes before bed to signal your body it's time to wind down. 
            Keep the volume low and comfortable.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

