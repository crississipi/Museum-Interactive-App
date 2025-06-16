import { useTexture, Plane } from '@react-three/drei'
import { RepeatWrapping } from 'three'

const MarbleFloor = () => {
  const textures = useTexture({
    map: '/texture/fabric/Fabric063_1K-JPG_Color.jpg',
    normalMap: '/texture/fabric/Fabric063_1K-JPG_NormalGL.jpg',
    roughnessMap: '/texture/fabric/Fabric063_1K-JPG_Displacement.jpg',
    displacementMap: '/texture/fabric/Fabric063_1K-JPG_Roughness.jpg',
    aoMap: '/texture/fabric/Fabric063_1K-JPG_AmbientOcclusion.jpg',
  })

  const tileX = 7
  const tileY = 7

  // Properly configure each texture
  Object.values(textures).forEach((tex) => {
    tex.wrapS = tex.wrapT = RepeatWrapping
    tex.repeat.set(tileX, tileY)
  })

  return (
    <Plane
      args={[80, 70]} // width, height
      rotation={[-Math.PI / 2, 0, 0]} // flat on XZ plane
      position={[0, -4.99, -5]} 
      receiveShadow
      userData={{ solid: true }}
    >
      <meshPhysicalMaterial
        {...textures}
        aoMapIntensity={1}
        displacementScale={0.05}
        reflectivity={0}
        clearcoat={0}
        clearcoatRoughness={0}
        color="#FF0000"
        roughness={1}
        metalness={0}
      />
    </Plane>
  )
}

export default MarbleFloor
