"use client"

import type { Metadata } from "next"
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { FilePen, GalleryHorizontal, Gamepad, HomeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import type React from "react"
import { useEffect, useState } from "react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-r from-rose-100 to-teal-100 pt-16`}
      >
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled ? "bg-white/80 backdrop-blur-md shadow-md" : ""
          }`}
        >
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="flex-shrink-0">
                  <p className="text-lg font-semibold" aria-hidden="true">
                    Mo & Os
                  </p>
                </Link>
              </div>
              <div className="md:block">
                <div className="ml-10 flex items-baseline space-x-2">
                  <Button asChild variant="ghost">
                    <Link href="/" className="flex items-center space-x-1">
                      <HomeIcon className="h-4 w-4" />
                      <span className="hidden md:block">Home</span>
                    </Link>
                  </Button>
                  <Button asChild variant="ghost">
                    <Link href="/love-quizy" className="flex items-center space-x-1">
                      <Gamepad className="h-4 w-4" />
                      <span className="hidden md:block">Game My love</span>
                    </Link>
                  </Button>
                  <Button asChild variant="ghost">
                    <Link href="/gallery" className="flex items-center space-x-1">
                      <GalleryHorizontal className="h-4 w-4" />
                      <span className="hidden md:block">Gallery</span>
                    </Link>
                  </Button>
                  <Button asChild variant="ghost">
                    <Link href="/poem" className="flex items-center space-x-1">
                      <FilePen className="h-4 w-4" />
                      <span className="hidden md:block">Our Poem</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <main className="pt-4">{children}</main>
      </body>
    </html>
  )
}

