'use client'

import { useThree, useFrame } from '@react-three/fiber'
import { useUIStore } from './CameraStore'
import * as THREE from 'three'
import { useRef } from 'react'

export default function CameraController() {
  const { camera } = useThree()
  const { focusTarget, isFocusing } = useUIStore()
  const vec = useRef(new THREE.Vector3())
  const lookAtVec = useRef(new THREE.Vector3())

  useFrame(() => {
    if (focusTarget && isFocusing) {
      // Smooth camera movement
      vec.current.lerp(focusTarget.position, 0.1)
      lookAtVec.current.lerp(focusTarget.lookAt, 0.1)
      
      camera.position.copy(vec.current)
      camera.lookAt(lookAtVec.current)
    }
  })

  return null
}