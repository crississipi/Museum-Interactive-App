"use client"

import { CeilingProps } from '@/types'
import { useTexture } from '@react-three/drei'
import React from 'react'
import * as THREE from 'three';

const Ceiling = ({ height, width, position, rotation }: CeilingProps) => {
  const [
    colorMapBase,
    normalMapBase,
    roughnessMapBase,
    colorMap,
    normalMap,
    roughnessMap,
    displacementMap,
  ] = useTexture([
    '/texture/wood/WoodFloor056_1K-JPG_Color.jpg',
    '/texture/wood/WoodFloor056_1K-JPG_NormalGL.jpg',
    '/texture/wood/WoodFloor056_1K-JPG_Roughness.jpg',
    '/texture/tiles/Tiles050_1K-JPG_Color.jpg',
    '/texture/tiles/Tiles050_1K-JPG_NormalGL.jpg',
    '/texture/tiles/Tiles050_1K-JPG_Roughness.jpg',
    '/texture/tiles/Tiles050_1K-JPG_Displacement.jpg',
  ])

  const repeatX = 4, repeatY = 4
  const allTextures = [colorMapBase, normalMapBase, roughnessMapBase, colorMap, normalMap, roughnessMap, displacementMap];
  allTextures.forEach(tex => {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeatX, repeatY);
  })

  return (
    <group rotation={rotation} position={position} receiveShadow castShadow>
        <mesh rotation={[Math.PI,Math.PI,0]}>
            <planeGeometry args={[height, width]} /> {/* Larger ceiling */}
            <meshPhysicalMaterial 
                map={colorMapBase}
                normalMap={normalMapBase}
                roughnessMap={roughnessMapBase}
                roughness={0.8}
                metalness={-1}
                reflectivity={0.8}
                clearcoat={0}
                clearcoatRoughness={1}
                color="#848482"
            />
        </mesh>
    </group>
  )
}

export default Ceiling
