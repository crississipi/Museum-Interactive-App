'use client'

import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { useUIStore } from './CameraStore' // ✅ import the store

const Visitor = () => {
  const { camera, scene } = useThree()
  const velocity = useRef(new THREE.Vector3())
  const direction = useRef(new THREE.Vector3())
  const keys = useRef({ w: false, a: false, s: false, d: false })
  const speed = 15
  const colliderRadius = 0.5

  const isFocusing = useUIStore((state) => state.isFocusing) // ✅ observe focusing state

  // Key handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (key in keys.current) keys.current[key as keyof typeof keys.current] = true
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (key in keys.current) keys.current[key as keyof typeof keys.current] = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  const [colliders, setColliders] = useState<THREE.Mesh[]>([])

  useEffect(() => {
    const meshes: THREE.Mesh[] = []
    scene.traverse((obj) => {
      if (obj.userData.solid && obj instanceof THREE.Mesh) {
        meshes.push(obj)
      }
    })
    setColliders(meshes)
  }, [scene])

  // Movement & Collision
  useFrame((_, delta) => {
    if (isFocusing) return

    direction.current.set(
      (keys.current.d ? 1 : 0) - (keys.current.a ? 1 : 0),
      0,
      (keys.current.w ? 1 : 0) - (keys.current.s ? 1 : 0)
    )

    if (direction.current.lengthSq() > 0) {
      direction.current.normalize()

      const forward = new THREE.Vector3()
      camera.getWorldDirection(forward)
      forward.y = 0
      forward.normalize()

      const right = new THREE.Vector3()
      right.crossVectors(forward, camera.up).normalize()

      velocity.current
        .copy(forward)
        .multiplyScalar(direction.current.z)
        .add(right.multiplyScalar(direction.current.x))
        .normalize()
        .multiplyScalar(speed * delta)

      const nextPos = camera.position.clone().add(velocity.current)

      let canMove = true
      for (const wall of colliders) {
        const box = new THREE.Box3().setFromObject(wall)
        const closestPoint = new THREE.Vector3(
          THREE.MathUtils.clamp(nextPos.x, box.min.x, box.max.x),
          THREE.MathUtils.clamp(nextPos.y, box.min.y, box.max.y),
          THREE.MathUtils.clamp(nextPos.z, box.min.z, box.max.z)
        )
        const distanceSquared = nextPos.distanceToSquared(closestPoint)
        if (distanceSquared < colliderRadius * colliderRadius) {
          canMove = false
          break
        }
      }

      if (canMove) {
        camera.position.copy(nextPos)
      }
    }

    camera.position.y = 0
  })

  return null
}

export default Visitor
