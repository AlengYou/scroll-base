"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"

export default function RightSideImage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current && imageRef.current) {
        const sectionRect = sectionRef.current.getBoundingClientRect()
        const viewportHeight = window.innerHeight

        // Calculate how far the section is in the viewport
        const sectionProgress = (viewportHeight - sectionRect.top) / (viewportHeight + sectionRect.height)

        // Clamp the value between 0 and 1
        const progress = Math.max(0, Math.min(1, sectionProgress))

        // Start with the image off-screen to the right
        const startPosition = 100 // 100% off-screen to the right
        const endPosition = 0 // 0% means at its final position on the right

        const translateX = startPosition - progress * (startPosition - endPosition)

        // Apply the transform
        imageRef.current.style.transform = `translateX(${translateX}%)`

        // Adjust opacity for a fade-in effect
        imageRef.current.style.opacity = `${progress}`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={sectionRef} className="relative min-h-[200vh]">
      <div className="sticky top-0 min-h-screen flex items-center bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left side content */}
            <div className="w-full md:w-1/2 mb-12 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Innovative Design</h2>
              <p className="text-xl text-gray-400 mb-8">
                Our product features a revolutionary design that combines aesthetics with functionality. Every detail
                has been carefully considered to provide the best user experience.
              </p>
              <button className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors">
                Discover more
              </button>
            </div>

            {/* Right side image that enters from the right */}
            <div
              ref={imageRef}
              className="w-full md:w-1/2 h-[400px] md:h-[500px] relative transform translate-x-full opacity-0"
              style={{ willChange: "transform, opacity" }}
            >
              <Image src="/placeholder.svg" alt="Product Feature" fill className="object-contain" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

