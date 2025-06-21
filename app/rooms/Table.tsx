"use client";

import { GlassBoxProps } from '@/types';
import React, { useState } from 'react'
import GlassBox from './GlassBox';
import Model from './Model';
import { Plane, useTexture } from '@react-three/drei';
import { RepeatWrapping } from 'three';
import { useSpring, a } from '@react-spring/three'
import { useUIStore } from './CameraStore';
import * as THREE from 'three'
import { ThreeEvent } from '@react-three/fiber'

const Table = ({ position, rotation, size, display, displayPos, displayScale }: GlassBoxProps) => {
  const textures = useTexture({
    map: '/texture/fabric/Fabric063_1K-JPG_Color.jpg',
    normalMap: '/texture/fabric/Fabric063_1K-JPG_NormalGL.jpg',
    roughnessMap: '/texture/fabric/Fabric063_1K-JPG_Displacement.jpg',
    displacementMap: '/texture/fabric/Fabric063_1K-JPG_Roughness.jpg',
    aoMap: '/texture/fabric/Fabric063_1K-JPG_AmbientOcclusion.jpg',
  })

  const tileX = 1
  const tileY = 1
  
  Object.values(textures).forEach((tex) => {
    tex.wrapS = tex.wrapT = RepeatWrapping
    tex.repeat.set(tileX, tileY)
  })

  const [hovered, setHovered] = useState(false)

  const { scale } = useSpring({
    scale: hovered ? 1.05 : 1,
    config: { mass: 1, tension: 300, friction: 20 },
  })

  const identifyX = (xCoor: number ) => {
    if ( xCoor === 24 ) { return 34 } 
    else if ( xCoor === -23.5) { return -34 }
    else return xCoor
  }
  
  const identifyZ = ( zCoor: number ) => {
    if ( zCoor === 25 ) { return 15 }
    else if ( zCoor === -22 ) { return zCoor + 3 }
    else if ( zCoor === -28 ) { return zCoor - 3 }
    else return zCoor + 7;
  }

  const handleClick = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    
    const object = e.object as THREE.Object3D;
    const target = new THREE.Vector3();
    object.getWorldPosition(target);

    // Calculate camera position in front of the table
    const cameraPosition = new THREE.Vector3(
      identifyX(target.x),
      target.y + 0.8, // Slightly above the table
      identifyZ(target.z)   // 3 units in front
    )
    
    useUIStore.getState().setFocusTarget(cameraPosition, target);
  };

  return (
    <a.group 
      position={[position[0], position[1] - 0.5, position[2]]} 
      rotation={rotation}
      scale={scale}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Your existing table components */}
      <GlassBox position={[0,size[1] + 0.4,0]} rotation={[0,0,0]} size={[size[0], size[1] + 2, size[2]]} />
      <a.mesh position={[0, 0.3, 0]} receiveShadow castShadow>
        <boxGeometry args={[size[0] + 0.5, size[1], size[2] + 0.5]}/>
        <meshPhysicalMaterial 
          reflectivity={1}
          clearcoat={1}
          clearcoatRoughness={0}
          metalness={-1}
        />
      </a.mesh>
      <Plane args={[size[0] - 0.1, size[2] - 0.1]} position={[0,1.52,0]} rotation={[1.57, Math.PI, 0]}>
        <meshPhysicalMaterial
          {...textures}
          aoMapIntensity={1}
          displacementScale={0.05}
          reflectivity={0}
          clearcoat={1}
          clearcoatRoughness={1}
          color="#FF0000"
          roughness={1}
          metalness={-1}
        />
      </Plane>
      <mesh receiveShadow castShadow>
        <boxGeometry args={size}/>
        <meshPhysicalMaterial 
          color="#2A3439"
          reflectivity={1}
          clearcoat={1}
          clearcoatRoughness={0}
          metalness={-1}
        />
      </mesh>
      <Model position={displayPos} scale={displayScale} display={display}/>
    </a.group>
  )
}

export default Table