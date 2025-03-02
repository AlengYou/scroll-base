"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"

export default function ParallaxSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const scrollPosition = window.pageYOffset
        const sectionTop = sectionRef.current.offsetTop
        const sectionHeight = sectionRef.current.offsetHeight
        const viewportHeight = window.innerHeight

        if (scrollPosition + viewportHeight > sectionTop && scrollPosition < sectionTop + sectionHeight) {
          const parallaxElements = sectionRef.current.querySelectorAll(".parallax-element")
          parallaxElements.forEach((el, index) => {
            const speed = 1 - index * 0.1
            const yPos = -(scrollPosition - sectionTop) * speed
            ;(el as HTMLElement).style.transform = `translateY(${yPos}px)`
          })
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={sectionRef} className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-6xl font-bold text-white z-10">Experience Innovation</h2>
      </div>
      <div className="parallax-element absolute inset-0">
        <Image src="/placeholder.svg" alt="Background 1" layout="fill" objectFit="cover" />
      </div>
      <div className="parallax-element absolute inset-0">
        <Image src="/placeholder.svg" alt="Background 2" layout="fill" objectFit="cover" style={{ opacity: 0.7 }} />
      </div>
      <div className="parallax-element absolute inset-0">
        <Image src="/placeholder.svg" alt="Background 3" layout="fill" objectFit="cover" style={{ opacity: 0.5 }} />
      </div>
    </div>
  )
}

