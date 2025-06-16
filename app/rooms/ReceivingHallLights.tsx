"use client"

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { SpotLight } from '@react-three/drei'
import { LightPosition } from '@/types';
import { Group, Object3D } from 'three';
import { distance } from 'three/tsl';

interface thisProps {
  distance?: number
  attenuation?: number
  penumbra?: number
  intensity?: number
  anglePower?: number
}

type SpotlightProps = thisProps & LightPosition;

const SpotLights: React.FC<SpotlightProps> = ({ position, rotation, color, lampType, distance, attenuation, penumbra, intensity, anglePower }) => {
  const groupRef = useRef<Group>(null);
  const targetRef = useRef<Object3D>(new THREE.Object3D());

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.layers.set(1);
      // Add the target to the group
      groupRef.current.add(targetRef.current);
      targetRef.current.position.set(position[0], position[1] - 5, position[2]);
    }

    return () => {
      // Cleanup
      if (groupRef.current && targetRef.current.parent === groupRef.current) {
        groupRef.current.remove(targetRef.current);
      }
    };
  }, [position]);

  return (
    <group ref={groupRef}>
      <SpotLight
        penumbra={penumbra ?? 0.8}
        intensity={intensity ?? 0.4}
        color={color}
        angle={Math.PI / 3}
        castShadow
        position={position}
        rotation={rotation}
        target={targetRef.current}
        distance={distance ?? 20}
        attenuation={attenuation ?? 20}
        anglePower={anglePower ?? 5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </group>
  );
};

export default SpotLights;