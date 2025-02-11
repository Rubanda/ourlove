"use client"
import Image from "next/image"
import { motion } from "framer-motion"

// This would typically come from your cloud storage or API
const photos = [
  { src: "/mo-os.webp", alt: "Our first date", caption: "Where it all began" },
  { src: "/mo-os1.JPG", alt: "Vacation together", caption: "Exploring the world" },
  { src: "/mo-os2.JPG", alt: "Engagement day", caption: "The day we said yes!" },
  // Add more photos as needed
]

export default function Gallery() {
  return (
    <main className="min-h-screen p-8 ">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Our Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-4 rounded-lg shadow-lg"
          >
            <div className="relative w-full h-64 mb-4">
              <Image src={photo.src || "/placeholder.svg"} alt={photo.alt} fill className="rounded-lg object-cover" />
            </div>
            <p className="text-center text-gray-600">{photo.caption}</p>
          </motion.div>
        ))}
      </div>
      {/* <nav className="space-x-4  flex items-center justify-center p-4">
          <Link href="/" className="text-pink-600 hover:text-pink-800 transition-colors flex items-center gap-1">
          <BlindsIcon className="w-4 h-4" />
            Home
          </Link>
          <Link href="/gallery" className="text-pink-600 hover:text-pink-800 transition-colors flex items-center gap-1">
            <GalleryVerticalIcon className="w-4 h-4" />
            Gallery
          </Link>
          <Link href="/our-story" className="text-pink-600 hover:text-pink-800 transition-colors flex items-center gap-1">
            <BookHeart className="w-4 h-4" />
            Our Story
          </Link>
         
        </nav> */}
    </main>
  )
}

