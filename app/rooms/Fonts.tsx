'use client'
import { FontProps } from '@/types'
import { Text3D } from '@react-three/drei'

const Fonts = ({ text, color, size, height, position, rotation, letterSpacing }: FontProps) => {
  return (
    <mesh position={position} rotation={rotation} receiveShadow castShadow>
      <Text3D
        font="/fonts/Merriweather Light_Regular.json"
        size={size}
        height={height}
        bevelEnabled
        bevelSize={0.02}
        bevelThickness={0.03}
        letterSpacing={letterSpacing ?? -0.3}
      >
        {text}
        <meshPhysicalMaterial 
          color={color} 
          reflectivity={1}
          clearcoat={1}
          clearcoatRoughness={0}
          metalness={0}
          roughness={0}
        />
      </Text3D>
    </mesh>
  )
}

export default Fonts
