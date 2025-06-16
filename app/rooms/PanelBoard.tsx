"use client"

import { PanelProps } from '@/types'
import { useTexture } from '@react-three/drei'
import React from 'react'
import * as THREE from 'three';
import ArtificialLights from './ArtificialLights';

const PanelBoard = ({ position, size }: PanelProps) => {
  const [
    colorMap,
    normalMap,
    roughnessMap,
    displacementMap,
  ] = useTexture([
    '/texture/marble-flooring/Porcelain001_2K-JPG_Color.jpg',
    '/texture/marble-flooring/Porcelain001_2K-JPG_NormalGL.jpg',
    '/texture/marble-flooring/Porcelain001_2K-JPG_Roughness.jpg',
    '/texture/marble-flooring/Porcelain001_2K-JPG_Displacement.jpg',
  ])

  return (
    <group position={position}>
        <mesh>
            <boxGeometry args={size} /> {/* Larger ceiling */}
            <meshPhysicalMaterial 
                map={colorMap}
                normalMap={normalMap}
                roughnessMap={roughnessMap}
                displacementMap={displacementMap}
                displacementBias={0}
                displacementScale={0}
                roughness={0.3}
                metalness={-1}
                reflectivity={1}
                clearcoat={1}
                clearcoatRoughness={0.5}
                color="#FFFFFF"
            />
        </mesh>
        <ArtificialLights position={[0,0,0]} rotation={[Math.PI,Math.PI, 0]} lightType="highlight" lightSize={[size[0] * 2, size[1] * 2]} />
    </group>
  )
}

export default PanelBoard
