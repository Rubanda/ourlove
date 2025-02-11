"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { HeartPulse } from "lucide-react"

const emojis = ["❤️", "💖", "💕", "💘", "💓", "💗", "💞", "🎉"]
const allEmojis = [...emojis, ...emojis]

interface CardType {
  id: number
  emoji: string
  isFlipped: boolean
  isMatched: boolean
}

export default function MemoryGame() {
  const [cards, setCards] = useState<CardType[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const shuffledCards = allEmojis
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }))
    setCards(shuffledCards)
    setFlippedCards([])
    setMoves(0)
    setIsGameOver(false)
  }

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) return

    const newCards = [...cards]
    newCards[id].isFlipped = true
    setCards(newCards)

    const newFlippedCards = [...flippedCards, id]
    setFlippedCards(newFlippedCards)

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1)
      checkForMatch(newFlippedCards)
    }
  }

  const checkForMatch = (flippedCardIds: number[]) => {
    const [firstId, secondId] = flippedCardIds
    if (cards[firstId].emoji === cards[secondId].emoji) {
      const newCards = [...cards]
      newCards[firstId].isMatched = true
      newCards[secondId].isMatched = true
      setCards(newCards)
      setFlippedCards([])

      if (newCards.every((card) => card.isMatched)) {
        setIsGameOver(true)
      }
    } else {
      setTimeout(() => {
        const newCards = [...cards]
        newCards[firstId].isFlipped = false
        newCards[secondId].isFlipped = false
        setCards(newCards)
        setFlippedCards([])
      }, 1000)
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 ">
      <Alert className="max-w-4xl mx-auto">
        <HeartPulse className="h-4 w-4" />
        <AlertTitle>Nakoze ino game for you have fun today at work!</AlertTitle>
        <AlertDescription>
          Send me a screenshot of you best move scrore.
        </AlertDescription>
      </Alert>

      <h1 className="text-4xl font-bold text-center text-muted-foreground mb-8">share a game with me love</h1>
      <p className="text-center text-muted-foreground mb-8">Match the emojis to win my heart</p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <h1 className="text-3xl font-bold text-center mb-6">Love Memory Game</h1>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {cards.map((card) => (
            <Card
              key={card.id}
              className={`h-24 cursor-pointer transition-all duration-300 ${card.isFlipped || card.isMatched ? "bg-white" : "bg-pink-300"
                }`}
              onClick={() => handleCardClick(card.id)}
            >
              <CardContent className="flex items-center justify-center h-full">
                {card.isFlipped || card.isMatched ? (
                  <span className="text-4xl">{card.emoji}</span>
                ) : (
                  <span className="text-4xl">❓</span>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mb-6">
          <p className="text-xl font-semibold">Moves: {moves}</p>
        </div>
        {isGameOver && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-6"
          >
            <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
            <p className="text-xl">You completed the game in {moves} moves.</p>
          </motion.div>
        )}
        <div className="flex justify-between">
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
          <Button onClick={initializeGame}>New Game</Button>
        </div>
      </motion.div>
    </main>
  )
}

