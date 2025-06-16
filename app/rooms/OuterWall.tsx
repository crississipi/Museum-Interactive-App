import { WallProps } from '@/types';
import { useTexture } from '@react-three/drei'
import React from 'react'
import * as THREE from 'three';

const OuterWall = ({position,rotation,width,height,depth, x, y}: WallProps ) => {
  const [
    colorMap,
    displacementMap,
    normalMap,
    roughnessMap
  ] = useTexture([
    '/texture/stone-wall/Wallpaper001A_1K-JPG_Color.jpg',
    '/texture/stone-wall/Wallpaper001A_1K-JPG_Displacement.jpg',
    '/texture/stone-wall/Wallpaper001A_1K-JPG_NormalGL.jpg', // or normalDX.jpg
    '/texture/stone-wall/Wallpaper001A_1K-JPG_Roughness.jpg'
  ])

  // Set wrapping and repeat for all textures
  const repeatX = x, repeatY = y
  const allTextures = [colorMap, displacementMap, normalMap, roughnessMap]
  allTextures.forEach(tex => {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(repeatX, repeatY)
  })
  
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow userData={{ solid: true }}>
      <boxGeometry args={[width, height, depth]} />
      <meshPhysicalMaterial
        map={colorMap}
        displacementMap={displacementMap}
        displacementScale={0} // Tweak this
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        color="#FEFEFA" // Tint base (blends with color map)
        roughness={0.5}
        metalness={0}
        reflectivity={0.4}
      />
    </mesh>
  );
}

export default OuterWall
