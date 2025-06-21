'use client';

import { LightPosition } from '@/types';
import React from 'react';
import * as THREE from 'three';
import SpotLights from './ReceivingHallLights';

interface thisProps {
  lampAngle: number
  lampPos?: [number, number, number]
  distance?: number
  attenuation?: number
  penumbra?: number
  intensity?: number
  anglePower?: number
  upper?: boolean
}

type LampProps = LightPosition & thisProps;
const Lamps: React.FC<LampProps>= ({ position, rotation, lampAngle, lampPos, distance, attenuation, penumbra, intensity, anglePower, upper }) => {


  return (
    <group position={position} userData={{solid: true}} rotation={rotation}>
      { upper ?? (
        <mesh rotation={[0,0,Math.PI]}>
          <cylinderGeometry args={[0.5, 0.7, 0.3, 64]}/>
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
      )}

      <mesh position={[0,-1, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1.5, 64]}/>
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

      <group position={lampPos ?? [0.5,-2.3,0]} rotation={[0, 0, lampAngle ?? Math.PI/4.5]}>
        <mesh>
          <cylinderGeometry args={[0.1, 0.1, 1.5, 64]}/>
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

        <mesh rotation={[0,0,0]} position={[0,-1,0]}>
          <cylinderGeometry args={[0.2, 0.4, 1, 64]}/>
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
        
        <SpotLights 
          position={[0,-1,0]} 
          rotation={[0,0,0]} 
          color="#ffeed8" 
          lampType=""
          distance={distance}
          intensity={intensity}
          penumbra={penumbra}
          attenuation={attenuation}
          anglePower={anglePower}
        />
      </group>

      {/* Outer wall */}

    </group>
  );
};

export default Lamps;
