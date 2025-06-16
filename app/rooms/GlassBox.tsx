import { GlassBoxProps } from '@/types'
import React from 'react'
import * as THREE from 'three'

const GlassBox = ({ position, rotation, size }: GlassBoxProps) => {
  const [width, height, depth] = size
  const edgeThickness = 0.05 // Adjust thickness of the golden edges
  const edgeWidth = 0.05 // Width of the edge strips

  return (
    <group position={position} rotation={rotation}>
      {/* Glass Box */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={size} />
        <meshPhysicalMaterial
          color="white"
          metalness={0}
          roughness={0}
          transmission={1}
          thickness={0.1}
          transparent
          opacity={0.5}
          reflectivity={1}
          ior={1.45} // Increased for better glass effect
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </mesh>

      {/* Golden Edges */}
      <group>
        {/* Vertical Edges */}
        {[1, -1].map((xSign) => 
          [1, -1].map((ySign) => (
            <mesh 
              key={`vertical-${xSign}-${ySign}`}
              position={[
                xSign * ((width/2 - edgeWidth/2) + 0.05),
                ySign * ((height/2 - edgeWidth/2) + 0.05),
                0
              ]}
            >
              <boxGeometry args={[edgeWidth, edgeWidth, depth + edgeThickness*2]} />
              <meshPhysicalMaterial
                color="#FFD700"
                metalness={1}
                roughness={0.2}
                envMapIntensity={1.5}
              />
            </mesh>
          ))
        ).flat()}

        {/* Horizontal Edges (Top and Bottom) */}
        {[1, -1].map((zSign) => (
          <group key={`horizontal-${zSign}`}>
            {/* Front-Back Edges */}
            {[1, -1].map((xSign) => (
              <mesh
                key={`frontback-${xSign}`}
                position={[
                  xSign * ((width/2 - edgeWidth/2) + 0.05),
                  0,
                  zSign * ((depth/2 - edgeWidth/2) + 0.05)
                ]}
              >
                <boxGeometry args={[edgeWidth, height + edgeThickness*2, edgeWidth]} />
                <meshPhysicalMaterial
                  color="#FFD700"
                  metalness={1}
                  roughness={0.2}
                  envMapIntensity={1.5}
                />
              </mesh>
            ))}

            {/* Left-Right Edges */}
            {[1, -1].map((ySign) => (
              <mesh
                key={`leftright-${ySign}`}
                position={[
                  0,
                  ySign * ((height/2 - edgeWidth/2) + 0.05),
                  zSign * ((depth/2 - edgeWidth/2) + 0.05)
                ]}
              >
                <boxGeometry args={[width + edgeThickness*2, edgeWidth, edgeWidth]} />
                <meshPhysicalMaterial
                  color="#FFD700"
                  metalness={1}
                  roughness={0.2}
                  envMapIntensity={1.5}
                />
              </mesh>
            ))}
          </group>
        ))}
      </group>
    </group>
  );
}

export default GlassBox