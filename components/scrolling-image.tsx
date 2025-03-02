"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"

export default function ScrollingImage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current && imageRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const scrollProgress = (window.innerHeight - containerRect.top) / (window.innerHeight + containerRect.height)

        // Ensure the progress is between 0 and 1
        const clampedProgress = Math.max(0, Math.min(1, scrollProgress))

        // Calculate the horizontal position based on scroll progress
        // Limit the movement so it doesn't go all the way to the left
        const maxMovement = containerRef.current.offsetWidth * 0.5 // Only move halfway across
        const horizontalPosition = clampedProgress * maxMovement

        imageRef.current.style.transform = `translateX(${horizontalPosition}px)`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-screen py-24 overflow-visible bg-gray-900">
      <div className="absolute inset-0 flex items-center pointer-events-none">
        <div ref={imageRef} className="w-full h-64 md:h-96 relative flex-shrink-0">
          <Image src="/placeholder.svg" alt="Scrolling Product Image" fill className="object-contain" />
        </div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Experience the product from every angle</h2>
          <p className="text-xl text-gray-400">
            Our innovative design allows you to see and interact with the product in ways never before possible.
          </p>
        </div>
      </div>
    </div>
  )
}

