import { PoleProps } from '@/types';
import React from 'react'

import * as THREE from 'three';

const LightPole = ({ position, rotation, height }: PoleProps) => {
  return (
    <mesh rotation={rotation} position={position}>
        <cylinderGeometry args={[0.1, 0.1, height, 64]}/>
        <meshPhysicalMaterial 
            emissive="#000000"
            emissiveIntensity={1}
            roughness={0.3}
            metalness={-1}
            reflectivity={1}
            color="#000000"
            side={THREE.DoubleSide} 
        />
    </mesh>
  )
}

export default LightPole
