"use client"

import { BaseboardProps } from '@/types'
import { useTexture } from '@react-three/drei'
import React from 'react'
import * as THREE from 'three';

const Baseboard = ({ position, size = [1, 0.2, 0.1], rotation = [0, 0, 0], color = '#FFD700'}: BaseboardProps) => {
  const [
    colorMap,
    displacementMap,
    normalMap,
    roughnessMap
  ] = useTexture([
    '/texture/wood/WoodFloor033_1K-JPG_Color.jpg',
    '/texture/wood/WoodFloor033_1K-JPG_Displacement.jpg',
    '/texture/wood/WoodFloor033_1K-JPG_NormalGL.jpg',
    '/texture/wood/WoodFloor033_1K-JPG_Roughness.jpg'
  ])

  // Set wrapping and repeat for all textures
  const repeatX = 3, repeatY = 1
  const allTextures = [colorMap, displacementMap, normalMap, roughnessMap]
  allTextures.forEach(tex => {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(repeatX, repeatY)
  })
  
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshPhysicalMaterial
        map={colorMap}
        displacementMap={displacementMap}
        displacementScale={0} // Tweak this
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        metalness={-0.5}
        roughness={0.5}
        reflectivity={0.8}
        clearcoat={1}
        clearcoatRoughness={0}
        color='#2A3439'
      />
    </mesh>
  )
}

export default Baseboard
