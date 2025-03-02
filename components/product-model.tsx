"use client"

import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import type { MotionValue } from "framer-motion"
import { motion } from "framer-motion-3d"
import type { Group } from "three"

interface ProductModelProps {
  scrollProgress: MotionValue<number>
}

export default function ProductModel({ scrollProgress }: ProductModelProps) {
  const group = useRef<Group>(null)
  const { scene } = useGLTF("/assets/3d/duck.glb")

  // Clone the scene to avoid modifying the original
  const model = scene.clone()

  useEffect(() => {
    if (model) {
      // Center and scale the model appropriately
      model.scale.set(2, 2, 2)
      model.position.set(0, 0, 0)
      model.rotation.set(0, 0, 0)
    }
  }, [model])

  useFrame((state) => {
    if (!group.current) return

    // Gentle rotation animation
    group.current.rotation.y = state.clock.getElapsedTime() * 0.1
  })

  return (
    <motion.group
      ref={group}
      scale={scrollProgress.to({
        range: [0, 0.5, 1],
        output: [1, 2, 0.5],
      })}
      position-y={scrollProgress.to({
        range: [0, 0.5, 1],
        output: [0, 0.5, -1],
      })}
      rotation-x={scrollProgress.to({
        range: [0, 0.5, 1],
        output: [0, Math.PI / 8, Math.PI / 4],
      })}
    >
      <primitive object={model} />
    </motion.group>
  )
}

