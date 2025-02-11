"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { BackgroundLines } from "@/components/ui/background-lines"

// This would typically come from your cloud storage or API
const memories = [
  { type: "photo", src: "/mo-os.webp", alt: "Our first date", caption: "Where it all began" },
  { type: "letter", content: "Dear love, I'll never forget the day we met. Your smile lit up the room..." },
  { type: "photo", src: "/mo-os1.JPG", alt: "Vacation together", caption: "Exploring the world" },
  {
    type: "letter",
    content: "Remember our first trip? The way you laughed at my terrible attempts to speak the local language...",
  },
  { type: "photo", src: "/mo-os2.JPG", alt: "Engagement day", caption: "The day we said yes!" },
  { type: "letter", content: "I was so nervous that day, but when I saw your face, all my doubts melted away..." },
  // Add more photos and letters as needed
]

export default function Gallery() {
  const getRandomRotation = () => `${Math.floor(Math.random() * 40) - 20}deg`
  const getRandomPosition = () => ({
    top: `${Math.floor(Math.random() * 60)}%`,
    left: `${Math.floor(Math.random() * 60)}%`,
  })

  return (
    <BackgroundLines className="flex flex-col items-center min-h-screen bg-gradient-to-r from-rose-100 to-teal-100 overflow-auto ">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Love Story</h1>
      <h2 className="text-lg md:text-4xl mb-4 text-black dark:text-white max-w-4xl">
        Moise & Osborn
      </h2>
      <div className="relative w-full h-[300vh]">
        {memories.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8, rotate: getRandomRotation() }}
            animate={{ opacity: 1, scale: 1, rotate: getRandomRotation() }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            style={getRandomPosition()}
            className={`absolute bg-white p-4 rounded shadow-lg w-64 transform hover:z-10 hover:scale-105 transition-all duration-200 ${item.type === "letter" ? "bg-yellow-100" : ""
              }`}
          >
            {item.type === "photo" ? (
              <>
                <div className="relative w-full aspect-[3/4] mb-2">
                  <Image src={item.src || "/placeholder.svg"} alt={item.alt} fill className="rounded object-cover" />
                </div>
                <p className="text-center text-sm text-gray-600 font-handwriting">{item.caption}</p>
              </>
            ) : (
              <div className="h-full flex items-center">
                <p className="text-sm text-gray-800 font-handwriting leading-relaxed">{item.content}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </BackgroundLines>
  )
}

