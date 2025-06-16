'use client'

import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useMemo } from 'react'

type ModelProps = {
  position?: [number, number, number]
  scale?: number
  display?: string
}

export default function Model({ position = [0, 0, 0], scale = 2, display }: ModelProps) {
  
  const { scene } = useGLTF(display ?? '/paintings/ancient_shiba.glb')

  // 👇 Clone the scene to reuse it safely
  const clonedScene = useMemo(() => {
    return scene.clone(true) as THREE.Group
  }, [scene])

  return <primitive object={clonedScene} position={position} scale={scale} />
}

useGLTF.preload('/paintings/ancient_shiba.glb')
