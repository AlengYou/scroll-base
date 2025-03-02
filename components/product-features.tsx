"use client"

import { useEffect } from "react"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function ProductFeatures() {
  const features = [
    {
      title: "Revolutionary Design",
      description:
        "Crafted with precision and attention to detail, our product sets a new standard for design excellence.",
      image: "/placeholder.svg",
    },
    {
      title: "Unmatched Performance",
      description: "Powered by our latest technology, experience speed and efficiency like never before.",
      image: "/placeholder.svg",
    },
    {
      title: "Seamless Integration",
      description: "Works perfectly with all your devices and services, creating a unified ecosystem.",
      image: "/placeholder.svg",
    },
  ]

  return (
    <div className="py-32">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-24">Features that redefine excellence</h2>

        <div className="space-y-40">
          {features.map((feature, index) => (
            <FeatureSection
              key={index}
              title={feature.title}
              description={feature.description}
              image={feature.image}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

interface FeatureSectionProps {
  title: string
  description: string
  image: string
  index: number
}

function FeatureSection({ title, description, image, index }: FeatureSectionProps) {
  const isEven = index % 2 === 0
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const variants = {
    hidden: { opacity: 0, x: isEven ? -50 : 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12`}
    >
      <div className="flex-1">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={600}
          height={600}
          className="w-full h-auto rounded-2xl"
        />
      </div>

      <div className="flex-1 space-y-6">
        <h3 className="text-3xl md:text-4xl font-bold">{title}</h3>
        <p className="text-xl text-gray-400">{description}</p>
        <button className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition-colors">
          Learn more
        </button>
      </div>
    </motion.div>
  )
}

