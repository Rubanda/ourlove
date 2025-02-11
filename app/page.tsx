"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { BackgroundLines } from "@/components/ui/background-lines"

// This would typically come from your cloud storage or API
const memories = [
  { type: "photo", src: "/mo-os.webp", alt: "Our first date", caption: "LOVE" },
  { type: "letter", content: "Dear love, I'll never forget the day we met. Your smile lit up the room..." },
  { type: "photo", src: "/mo-os1.JPG", alt: "Vacation together", caption: "Great" },
  {
    type: "letter",
    content: "You are truly wonderful—your uplifting attitude and genuine kindness brighten every room and inspire everyone around you.",
  },
  { type: "photo", src: "/proposal.JPG", alt: "Nice day", caption: "Amazing!" },

  { type: "photo", src: "/mo-os1.JPG", alt: "Nice day", caption: "Amazing!" },
  { type: "photo", src: "/os1.webp", alt: "Nice day", caption: "Amazing!" },
  { type: "photo", src: "/os2.webp", alt: "Nice day", caption: "Amazing!" },
  { type: "photo", src: "/os3.webp", alt: "Nice day", caption: "Amazing!" },
  { type: "photo", src: "/mo-os5.JPG", alt: "Nice day", caption: "Amazing!" },
  { type: "photo", src: "/mo-os6.jpg", alt: "Nice day", caption: "Amazing!" },
  { type: "photo", src: "/mo-os7.webp", alt: "Nice day", caption: "Amazing!" },
  { type: "letter", content: "You have big, beautiful eyes that light up every room, revealing the wonder of your soul." },
  // Add more photos and letters as needed
]

export default function Gallery() {
  const getRandomRotation = () => `${Math.floor(Math.random() * 40) - 20}deg`
  const getRandomPosition = () => ({
    top: `${Math.floor(Math.random() * 60)}%`,
    left: `${Math.floor(Math.random() * 60)}%`,
  })

  return (
    <BackgroundLines className=" flex flex-col items-center min-h-screen bg-gradient-to-r from-rose-100 to-teal-100 ">
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
            className={`absolute bg-white p-4 rounded shadow-lg w-64 transform hover:z-10 hover:scale-105 transition-all duration-200 ${item?.type === "letter" ? "bg-yellow-100" : ""
              }`}
          >
            {item?.type === "photo" ? (
              <>
                <div className="relative w-full aspect-[3/4] mb-2">
                  <Image src={item?.src || "/placeholder.svg"} alt={item?.alt!} fill className="rounded object-cover" />
                </div>
                <p className="text-center text-sm text-gray-600 font-handwriting">{item?.caption}</p>
              </>
            ) : (
              <div className="h-full flex items-center">
                <p className="text-sm text-gray-800 font-handwriting leading-relaxed">{item?.content}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </BackgroundLines>
  )
}

