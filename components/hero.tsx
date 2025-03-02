"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current && imageRef.current) {
        const scrollPosition = window.scrollY
        const containerHeight = containerRef.current.offsetHeight
        const scrollPercentage = Math.min(scrollPosition / (containerHeight / 2), 1)

        // Scale and rotate the image based on scroll
        const scale = 1 + scrollPercentage
        const rotate = scrollPercentage * 360
        imageRef.current.style.transform = `scale(${scale}) rotate(${rotate}deg)`

        // Fade out the image as we scroll down
        imageRef.current.style.opacity = `${1 - scrollPercentage}`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={containerRef} className="h-[300vh] relative">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <Image
            ref={imageRef}
            src="/placeholder.svg"
            alt="Product"
            width={500}
            height={500}
            className="transition-transform duration-300 ease-out"
          />
        </div>

        <div className="relative z-20 container mx-auto px-4 h-screen flex flex-col justify-between py-12">
          <header className="w-full">
            <nav className="flex justify-between items-center">
              <div className="text-2xl font-medium">Brand</div>
              <div className="flex gap-8">
                <a href="#" className="hover:opacity-70 transition-opacity">
                  Product
                </a>
                <a href="#" className="hover:opacity-70 transition-opacity">
                  Features
                </a>
                <a href="#" className="hover:opacity-70 transition-opacity">
                  Specs
                </a>
                <a href="#" className="hover:opacity-70 transition-opacity">
                  Buy
                </a>
              </div>
            </nav>
          </header>

          <div className="text-center space-y-4 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">The next generation.</h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
              Introducing our revolutionary new product with groundbreaking technology.
            </p>
          </div>

          <div className="w-full flex justify-center">
            <button className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors">
              Learn more
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

