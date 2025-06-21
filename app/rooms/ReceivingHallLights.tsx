"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SpotLight } from '@react-three/drei';
import { LightPosition } from '@/types';
import { Group, Object3D } from 'three';

interface thisProps {
  distance?: number;
  attenuation?: number;
  penumbra?: number;
  intensity?: number;
  anglePower?: number;
}

type SpotlightProps = thisProps & LightPosition;

const SpotLights: React.FC<SpotlightProps> = ({
  position,
  rotation,
  color,
  distance,
  attenuation,
  penumbra,
  intensity,
  anglePower
}) => {
  const groupRef = useRef<Group>(null);
  const targetRef = useRef<Object3D>(new THREE.Object3D());

  useEffect(() => {
    const group = groupRef.current;   // ✅ cache the current value
    const target = targetRef.current; // ✅ cache the current value

    if (group && target) {
      group.layers.set(1);
      group.add(target);
      target.position.set(position[0], position[1] - 5, position[2]);
    }

    return () => {
      if (group && target && target.parent === group) {
        group.remove(target);
      }
    };
  }, [position]); // using cached values avoids the warning

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
        target={targetRef.current} // fine to reference here, not in useEffect cleanup
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
