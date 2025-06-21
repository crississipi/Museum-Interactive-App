'use client';

import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { Group } from 'three';
import * as THREE from 'three';
import { Plane } from '@react-three/drei';
import { createLightGlow } from '@/utils/LightGlow';
import { ArtificialLightProps } from '@/types';
import { BloomSceneContext } from './LightingEffects';

const ArtificialLights = ({ position, rotation, lightType, lightSize }: ArtificialLightProps) => {
  const ref = useRef<Group>(null!);
  const bloomScene = useContext(BloomSceneContext);

  useEffect(() => {
    const lightGroup = ref.current; // ✅ Fix: Capture ref value at the time of effect run

    if (lightGroup && bloomScene) {
      const clone = lightGroup.clone();
      clone.userData.isLightClone = true;
      bloomScene.add(clone);

      lightGroup.traverse((obj) => {
        obj.layers.enable(0);
        obj.layers.enable(1);
      });

      clone.traverse((obj) => {
        obj.layers.set(1);
      });
    }

    return () => {
      if (lightGroup && bloomScene) {
        bloomScene.children.forEach((child) => {
          if (child.userData?.isLightClone) {
            bloomScene.remove(child);
          }
        });
      }
    };
  }, [bloomScene]);

  const outerRadius = 0.2;
  const innerRad = 0.2;
  const height = 0.2;
  const innerRadius = outerRadius - innerRad;

  const glowTexture = useMemo(() => createLightGlow('#ffd6a0', 'radial'), []);

  const outerGeometry = useMemo(
    () => new THREE.CylinderGeometry(outerRadius, outerRadius, height, 64, 1, true),
    [outerRadius, height]
  );

  const bottomCap = useMemo(() => new THREE.RingGeometry(innerRadius, outerRadius, 64), [
    innerRadius,
    outerRadius,
  ]);

  return (
    <group ref={ref} position={position} rotation={rotation}>
      {lightType === 'main' && (
        <>
          <group userData={{ solid: true }} rotation={[0, 0, 0]}>
            {/* Outer wall */}
            <mesh geometry={outerGeometry}>
              <meshPhysicalMaterial
                emissive="#ffd6a0"
                emissiveIntensity={3}
                roughness={0.3}
                metalness={-1}
                reflectivity={1}
                color="#ffbb66"
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Bottom cap */}
            <mesh geometry={bottomCap} rotation={[Math.PI / 2, 0, 0]} position={[0, -height / 2, 0]}>
              <meshPhysicalMaterial
                emissive="#ffd6a0"
                emissiveIntensity={3}
                roughness={0.3}
                metalness={-1}
                reflectivity={1}
                color="#ffbb66"
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>

          <Plane args={[8, 8]} position={[0, -0.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <meshBasicMaterial
              map={glowTexture}
              transparent
              opacity={0.6}
              depthWrite={false}
              toneMapped={false}
            />
          </Plane>
        </>
      )}

      {lightType === 'highlight' && (
        <Plane args={lightSize} rotation={[0, 0, 0]}>
          <meshBasicMaterial
            map={glowTexture}
            transparent
            opacity={0.6}
            depthWrite={false}
            toneMapped={false}
          />
        </Plane>
      )}

      {lightType === 'display' && (
        <mesh position={[0, 1, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 3, 32]} />
          <meshPhysicalMaterial
            color="#ffffff"
            emissive="#ffd6a0"
            emissiveIntensity={2}
            transmission={0.95}
            roughness={0}
            metalness={0.1}
          />
        </mesh>
      )}
    </group>
  );
};

export default ArtificialLights;