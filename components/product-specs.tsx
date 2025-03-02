"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

const specs = [
  { name: "Processor", value: "A15 Bionic chip" },
  { name: "Display", value: "Super Retina XDR display" },
  { name: "Camera", value: "Pro camera system" },
  { name: "Battery", value: "Up to 28 hours video playback" },
  { name: "Storage", value: "Up to 1TB" },
  { name: "Water Resistance", value: "IP68" },
]

export default function ProductSpecs() {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <div className="py-24 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Product Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" ref={ref}>
          {specs.map((spec, index) => (
            <motion.div
              key={spec.name}
              className="bg-gray-800 p-6 rounded-lg"
              initial="hidden"
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0, transition: { delay: index * 0.1 } },
                hidden: { opacity: 0, y: 50 },
              }}
            >
              <h3 className="text-xl font-semibold mb-2">{spec.name}</h3>
              <p className="text-gray-400">{spec.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

