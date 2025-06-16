'use client';

import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { Group } from 'three';
import { createLightGlow } from '@/utils/LightGlow';
import * as THREE from 'three';
import { Plane } from '@react-three/drei';
import { ArtificialLightProps } from '@/types';
import { BloomSceneContext } from './LightingEffects';

const ArtificialLights = ({ position, rotation, lightType, lightSize }: ArtificialLightProps) => {
  const ref = useRef<Group>(null!);
  const bloomScene = useContext(BloomSceneContext);

  useEffect(() => {
    if (ref.current && bloomScene) {
      // Add to both scenes
      const clone = ref.current.clone();
      clone.userData.isLightClone = true;
      bloomScene.add(clone);
      
      // Enable both layers for the original
      ref.current.traverse((obj) => {
        obj.layers.enable(0); // Main scene
        obj.layers.enable(1); // Bloom scene
      });
      
      // Set clone to bloom layer only
      clone.traverse((obj) => {
        obj.layers.set(1); // Bloom scene only
      });
    }

    return () => {
      if (ref.current && bloomScene) {
        // Find and remove all children that match our light
        bloomScene.children.forEach(child => {
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
  const glowHighlight = useMemo(() => createLightGlow('#ffd6a0', 'horizontal'), []);
  const outerGeometry = useMemo(
    () => new THREE.CylinderGeometry(outerRadius, outerRadius, height, 64, 1, true),
    [outerRadius, height]
  );
  
  const bottomCap = useMemo(() => new THREE.RingGeometry(innerRadius, outerRadius, 64), [innerRadius, outerRadius]);
  
  return (
    <group ref={ref} position={position} rotation={rotation}>
      {lightType === 'main' && (
        <>
          <group userData={{solid: true}} rotation={[0, 0, 0]}>
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
          <Plane args={[8, 8]} position={[0, -0.01, 0]} rotation={[Math.PI/2, 0, 0]}>
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
        <mesh position={[0, 1, 0]} rotation={[0,0,0]}>
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
}

export default ArtificialLights;