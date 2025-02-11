"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState, useEffect } from "react"

const poem = [
  "One year together, our love's gentle bloom,",
  "Your eyes shine like stars in the night's room.",
  "Your smile is the dawn that fills up my day,",
  "In your warm embrace, all worries fade away.",
  "Your love is the melody that lifts my heart high,",
  "In every shared moment, our spirits fly.",
  "Hand in hand, we journey through life's art,",
  "You, the most beautiful love, forever in my heart."
];


const emojis = ["❤️", "💖", "💕", "💘", "💓", "💗", "💞", "🎉", "🎊", "✨"]

interface FloatingEmoji {
  id: number
  emoji: string
  initialX: string
  initialY: string
  scale: number
  rotation: number
}

const NUM_EMOJIS = 10

export default function PoemPage() {
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([])

  useEffect(() => {
    const newEmojis = Array.from({ length: NUM_EMOJIS }, (_, index) => ({
      id: index,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      initialX: `${Math.random() * 100}%`,
      initialY: `${Math.random() * 100}%`,
      scale: 0.5 + Math.random() * 1.5,
      rotation: Math.random() * 360,
    }))
    setFloatingEmojis(newEmojis)
  }, [])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-r from-rose-100 to-teal-100 overflow-hidden">
      {floatingEmojis.map((emoji) => (
        <motion.div
          key={emoji.id}
          initial={{ x: emoji.initialX, y: emoji.initialY, scale: emoji.scale, rotate: emoji.rotation }}
          animate={{
            x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
            y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`, `${Math.random() * 100}%`],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          className="absolute text-4xl pointer-events-none"
        >
          {emoji.emoji}
        </motion.div>
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
        Back to Home
      </Link>
    </main>
  )
}

