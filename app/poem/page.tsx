"use client"
import { motion, useAnimation } from "framer-motion"
import Link from "next/link"
import { useState, useEffect } from "react"

const poem = [
  "My Love",

"Today marks another year of us, and I can’t let it pass without speaking from my heart.I know I’ve been too focused on serious things, forgetting to cherish the moments that matter most—like you.I see now how I pushed you away, and I’m truly sorry.",

"You are my greatest gift, and I never want to lose the love we share.I want to bring back the spark, the laughter, and the joy we had.Please give me a chance to be better, to love you the way you deserve.",

"Let this anniversary be a new beginning for us.I promise to treasure every moment with you.",

"Happy Anniversary, my love.",
]


const emojis = ["❤️", "💖", "💕", "💘", "💓", "💗", "💞", "🎉", "🎊", "✨"]

interface FloatingEmoji {
  id: number
  emoji: string
  x: number
  y: number
  scale: number
  rotation: number
}

export default function PoemPage() {
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    }
    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  useEffect(() => {
    const createEmoji = () => {
      const newEmoji: FloatingEmoji = {
        id: Date.now(),
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        scale: 0.5 + Math.random() * 1.5,
        rotation: Math.random() * 360,
      }
      setFloatingEmojis((prev) => [...prev, newEmoji])
    }

    const interval = setInterval(createEmoji, 2000)
    return () => clearInterval(interval)
  }, [dimensions])

  useEffect(() => {
    if (floatingEmojis.length > 15) {
      setFloatingEmojis((prev) => prev.slice(1))
    }
  }, [floatingEmojis])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-r from-rose-100 to-teal-100 overflow-hidden">
      {floatingEmojis.map((emoji) => (
        <FloatingEmoji key={emoji.id} emoji={emoji} dimensions={dimensions} />
      ))}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full bg-white bg-opacity-80 p-8 rounded-lg shadow-2xl relative z-10"
      >
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Our Love Poem</h1>
        <div className="space-y-4">
          {poem.map((line, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center text-gray-700 font-poem text-lg"
            >
              {line}
            </motion.p>
          ))}
        </div>
      </motion.div>
      <Link href="/" className="mt-8 text-gray-600 hover:text-gray-800 transition-colors relative z-10">
        Back to Gallery
      </Link>
    </main>
  )
}

function FloatingEmoji({ emoji, dimensions }: { emoji: FloatingEmoji; dimensions: { width: number; height: number } }) {
  const controls = useAnimation()

  useEffect(() => {
    const animate = async () => {
      while (true) {
        await controls.start({
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          transition: { duration: 10, ease: "linear" },
        })
      }
    }
    animate()
  }, [controls, dimensions])

  return (
    <motion.div
      initial={{ x: emoji.x, y: emoji.y, scale: emoji.scale, rotate: emoji.rotation }}
      animate={controls}
      className="absolute text-4xl pointer-events-none"
    >
      {emoji.emoji}
    </motion.div>
  )
}

