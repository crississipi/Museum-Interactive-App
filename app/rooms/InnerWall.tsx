import { BaseProps, WallProps } from '@/types';
import { useTexture } from '@react-three/drei';
import React from 'react'
import * as THREE from 'three';

type InnerWallProps = WallProps & BaseProps;
const InnerWall: React.FC<InnerWallProps>= ({position,rotation,width,height,depth, x, y, rightBasePos, leftBasePos, baseWidth}) => {
  const doorWidth = 6;
  const doorHeight = 7;
  const archHeight = 0.1;

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
  const repeatX = 4, repeatY = 5
  const allTextures = [colorMap, displacementMap, normalMap, roughnessMap];
  allTextures.forEach(tex => {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeatX, repeatY);
  })

  const [
    colorMapBase,
    displacementMapBase,
    normalMapBase,
    roughnessMapBase
  ] = useTexture([
    '/texture/wood/WoodFloor033_1K-JPG_Color.jpg',
    '/texture/wood/WoodFloor033_1K-JPG_Displacement.jpg',
    '/texture/wood/WoodFloor033_1K-JPG_NormalGL.jpg',
    '/texture/wood/WoodFloor033_1K-JPG_Roughness.jpg'
  ])

  // Set wrapping and repeat for all textures
  const repeatXBase = 4, repeatYBase = 5
  const allTexture = [colorMap, displacementMap, normalMap, roughnessMap]
  allTexture.forEach(tex => {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(repeatXBase, repeatYBase)
  })

  // Full wall shape
  const wallShape = new THREE.Shape();
  wallShape.moveTo(-width / 2 , -height / 2);
  wallShape.lineTo(width / 2, -height / 2);
  wallShape.lineTo(width / 2, height / 2);
  wallShape.lineTo(-width / 2, height / 2);
  wallShape.lineTo(-width / 2, -height / 2);

  // Arched doorway hole
  const hole = new THREE.Path();
  const bottomY = -height / 2;
  const archTopY = bottomY + doorHeight;

  hole.moveTo(-doorWidth / 2, bottomY);
  hole.lineTo(-doorWidth / 2, archTopY - archHeight);
  hole.absarc(0, archTopY - archHeight, doorWidth / 2, Math.PI, 0, true);
  hole.lineTo(doorWidth / 2, bottomY);
  hole.lineTo(-doorWidth / 2, bottomY);

  wallShape.holes.push(hole);

  const extrudeSettings = {
    depth: depth,
    bevelEnabled: false,
  };

  const geometry = new THREE.ExtrudeGeometry(wallShape, extrudeSettings);
  geometry.computeVertexNormals();
  applyPlanarUVs(geometry);

  return (
    <group position={position} rotation={rotation} >
      <mesh geometry={geometry} castShadow receiveShadow>
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
          side={THREE.DoubleSide} 
        />
      </mesh>
      <group position={[0, position[1] - 14.7, 0.5]}>
        <mesh castShadow receiveShadow position={leftBasePos}>
          <boxGeometry args={[baseWidth, 0.5, depth + 0.2]}/>
          <meshPhysicalMaterial
            map={colorMapBase}
            displacementMap={displacementMapBase}
            displacementScale={0} // Tweak this
            normalMap={normalMapBase}
            roughnessMap={roughnessMapBase}
            metalness={-0.5}
            roughness={0.5}
            reflectivity={0.8}
            clearcoat={1}
            clearcoatRoughness={0}
            color='#2A3439'
          />
        </mesh>
        <mesh castShadow receiveShadow position={rightBasePos}>
          <boxGeometry args={[baseWidth, 0.5, depth + 0.2]}/>
          <meshPhysicalMaterial
            map={colorMapBase}
            displacementMap={displacementMapBase}
            displacementScale={0} // Tweak this
            normalMap={normalMapBase}
            roughnessMap={roughnessMapBase}
            metalness={-0.5}
            roughness={0.5}
            reflectivity={0.8}
            clearcoat={1}
            clearcoatRoughness={0}
            color='#2A3439'
          />
        </mesh>
      </group>
    </group>
  )
}


function applyPlanarUVs(geometry: THREE.BufferGeometry) {
  geometry.computeBoundingBox();
  const bbox = geometry.boundingBox!;
  const size = new THREE.Vector3().subVectors(bbox.max, bbox.min);
  const uvArray: number[] = [];

  const positions = geometry.attributes.position;
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    // Map x/y to UV space (XY projection)
    uvArray.push((x - bbox.min.x) / size.x); // U
    uvArray.push((y - bbox.min.y) / size.y); // V
  }

  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvArray, 2));
}


export default InnerWall
