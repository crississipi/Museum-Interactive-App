'use client';

import { createContext, useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Scene } from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

export const BloomSceneContext = createContext<Scene | null>(null);

export function LightingEffects({ children }: { children: React.ReactNode }) {
  const { camera } = useThree();
  const bloomScene = useRef(new Scene());

  // Enable bloom layer on mount and ensure it persists
  useEffect(() => {
    const originalLayers = camera.layers.mask;
    camera.layers.enable(1); // Layer 1 = bloom-only objects
    
    return () => {
      // Restore original layers on unmount
      camera.layers.mask = originalLayers;
    };
  }, [camera]);

  return (
    <BloomSceneContext.Provider value={bloomScene.current}>
      <EffectComposer multisampling={10}>
        <Bloom 
          intensity={1.5} 
          luminanceThreshold={0.7}
          luminanceSmoothing={2}
          height={500}
          // Explicitly specify which layers to include
          layers={1}
        />
      </EffectComposer>
      {children}
    </BloomSceneContext.Provider>
  );
}