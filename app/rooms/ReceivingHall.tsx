'use client';

import { Canvas, useLoader } from '@react-three/fiber';
import { Suspense } from 'react';
import Scene from './Scene';
import { RGBELoader } from 'three-stdlib';
import * as THREE from 'three'
import { LightingEffects } from './LightingEffects';
import PanelBoard from './PanelBoard';
import CameraTracker from './CameraTracker';
import CameraTrackerInCanvas from './CameraTrackerInCanvas';
import CameraController from './CameraController';
import DisplayInfo from './DisplayInfo';

function MuseumEnvironment() {
  const texture = useLoader(RGBELoader, '/hdr/empty_warehouse_01_1k.hdr');
  texture.mapping = THREE.EquirectangularReflectionMapping;

  return <primitive object={texture} attach="background" />;
}

const ReceivingHall = () => {
  const ceilingPanel: {
    position: [number, number, number]
    size: [number, number, number]
  }[] = [
    //Main Room - BL
    {
      position: [-10.5, -1, -14.5],
      size: [10, 10, 0.3],
    },
    {
      position: [-5.5, 4, -14],
      size: [10, 10, 0.3],
    },
    {
      position: [-4.5, -2, -13.5],
      size: [5, 5, 0.3],
    },
    {
      position: [-13.5, 7, -13.5],
      size: [4, 4, 0.3],
    },

    //Main Room - BR
    {
      position: [11.5, -1, -14.5],
      size: [10, 10, 0.3],
    },
    {
      position: [6.5, 4, -14],
      size: [10, 10, 0.3],
    },
    {
      position: [3.5, -4, -13.5],
      size: [4, 4, 0.3],
    },
    {
      position: [12.5, 5, -13.5],
      size: [5, 5, 0.3],
    },

    //Main Room - UL
    {
      position: [-10.5, 21, -14.5],
      size: [10, 10, 0.3],
    },
    {
      position: [-5.5, 16, -14],
      size: [10, 10, 0.3],
    },
    {
      position: [-2.5, 24, -13.5],
      size: [4, 4, 0.3],
    },
    {
      position: [-11.5, 15, -13.5],
      size: [5, 5, 0.3],
    },

    //Main room - UR
    {
      position: [11.5, 21, -14.5],
      size: [10, 10, 0.3],
    },
    {
      position: [6.5, 16, -14],
      size: [10, 10, 0.3],
    },
    {
      position: [14.5, 13, -13.5],
      size: [4, 4, 0.3],
    },
    {
      position: [5.5, 22, -13.5],
      size: [5, 5, 0.3],
    },

    //Left Room
    {
      position: [-27.5, 24, -14.5],
      size: [10, 5, 0.3],
    },
    {
      position: [-35.5, 21.5, -14],
      size: [5, 10, 0.3],
    },
    {
      position: [-25, 16, -13.5],
      size: [5, 10, 0.3],
    },
    {
      position: [-30.25, 18.75, -14.5],
      size: [4.45, 4.45, 0.3],
    },
    {
      position: [-33, 13.5, -14],
      size: [10, 5, 0.3],
    },

    {
      position: [-27.5, 6, -13.5],
      size: [10, 5, 0.3],
    },
    {
      position: [-35.5, 3.5, -14.5],
      size: [5, 10, 0.3],
    },
    {
      position: [-30.25, 0.75, -14],
      size: [4.45, 4.45, 0.3],
    },
    {
      position: [-25, -2, -13.5],
      size: [5, 10, 0.3],
    },
    {
      position: [-33, -4.5, -14.5],
      size: [10, 5, 0.3],
    },

    //Right Room
    {
      position: [27.5, 24, -14.5],
      size: [10, 5, 0.3],
    },
    {
      position: [35.5, 21.5, -14],
      size: [5, 10, 0.3],
    },
    {
      position: [25, 16, -13.5],
      size: [5, 10, 0.3],
    },
    {
      position: [30.25, 18.75, -14.5],
      size: [4.45, 4.45, 0.3],
    },
    {
      position: [33, 13.5, -14],
      size: [10, 5, 0.3],
    },

    {
      position: [27.5, 6, -13.5],
      size: [10, 5, 0.3],
    },
    {
      position: [35.5, 3.5, -14.5],
      size: [5, 10, 0.3],
    },
    {
      position: [30.25, 0.75, -14],
      size: [4.45, 4.45, 0.3],
    },
    {
      position: [25, -2, -13.5],
      size: [5, 10, 0.3],
    },
    {
      position: [33, -4.5, -14.5],
      size: [10, 5, 0.3],
    },

    //Back Room
    {
      position: [-30, -21, -14.5],
      size: [15, 15, 0.3],
    },
    {
      position: [-21, -30, -14],
      size: [15, 15, 0.3],
    },
    {
      position: [-18, -18, -14.5],
      size: [7, 7, 0.3],
    },
    {
      position: [-33, -33, -14],
      size: [7, 7, 0.3],
    },
    {
      position: [-3, -21, -14.5],
      size: [15, 15, 0.3],
    },
    {
      position: [5, -30, -14],
      size: [15, 15, 0.3],
    },
    {
      position: [9, -18, -14.5],
      size: [7, 7, 0.3],
    },
    {
      position: [-7, -33, -14],
      size: [7, 7, 0.3],
    },
    {
      position: [23, -21, -14.5],
      size: [15, 15, 0.3],
    },
    {
      position: [31, -30, -14],
      size: [15, 15, 0.3],
    },
    {
      position: [35, -18, -14.5],
      size: [7, 7, 0.3],
    },
    {
      position: [19, -33, -14],
      size: [7, 7, 0.3],
    },
  ]

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <Canvas
        className='relative'
        camera={{ position: [0, 0, 15], fov: 50 }}
        shadows
        gl={{ 
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.5,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
      >
        <ambientLight color="#000000" intensity={0.1} />
        <hemisphereLight
          args={['#fff5cc', '#403010', 0.8]}
        />
        {/** <fog attach="fog" args={['#1b1b1b', 10, 30]} />*/}

        {/* Directional museum-style light */}
        <directionalLight
          color="#fff0b3"
          intensity={1.2}
          position={[0, 10, 0]}
          castShadow={false}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-15}
          shadow-camera-right={15}
          shadow-camera-top={15}
          shadow-camera-bottom={-15}
        />

        {/* Scene and Environment */}
        <Suspense fallback={null}>
          <MuseumEnvironment />

          <Scene />
          <LightingEffects>
              <group rotation={[Math.PI/2,0,0]}>
                { ceilingPanel.map((val, i) => (
                  <PanelBoard key={i} {...val}/>
                ))}
              </group>
          </LightingEffects>
        </Suspense>
        <CameraTrackerInCanvas />
        <CameraController />
      </Canvas>
      <CameraTracker />
      <DisplayInfo />
    </div>
  )
}

export default ReceivingHall;