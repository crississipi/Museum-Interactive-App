"use client"

import React from 'react'
import Visitor from './Visitor';
import { PointerLockControls } from '@react-three/drei';
import Flooring from './Flooring';
import InnerWall from './InnerWall';
import OuterWall from './OuterWall';
import Baseboard from './Baseboard';
import Ceiling from './Ceiling';
import Table from './Table';
import Lamps from './Lamps';
import Fonts from './Fonts';
import LightPole from './LightPole';

const Scene = () => {
  const innerWalls: {
        x: number
        y: number
        position: [number, number, number]
        rotation: [number, number, number]
        width: number
        height: number
        depth: number
        rightBasePos: [number, number, number]
        leftBasePos: [number, number, number]
        baseWidth: number
    }[] = [
        { x: 2, y: 1, 
          position: [30, 5, -11], 
          rotation: [0, 0, 0], 
          width: 20, 
          height: 20, 
          depth: 1, 
          rightBasePos: [-6.5, 0, 0], 
          leftBasePos: [6.5, 0, 0],
          baseWidth: 7.2
        },
        { x: 2, y: 1, 
          position: [-30, 5, -11], 
          rotation: [0, 0, 0], 
          width: 20, 
          height: 20, 
          depth: 1, 
          rightBasePos: [-6.5, 0, 0], 
          leftBasePos: [6.5, 0, 0],
          baseWidth: 7.2
        },
        
        { x: 12, 
          y: 4, 
          position: [-20, 5, 10], 
          rotation: [0, Math.PI / 2, 0], 
          width: 40, 
          height: 20, 
          depth: 1, 
          rightBasePos: [-11.5, 0, 0], 
          leftBasePos: [11.5, 0, 0],
          baseWidth: 17.2
        },
        
        { x: 12, 
          y: 4, 
          position: [20, 5, 10], 
          rotation: [0, Math.PI / 2, 0], 
          width: 40, 
          height: 20, 
          depth: 1, 
          rightBasePos: [-11.5, 0, 0], 
          leftBasePos: [11.5, 0, 0],
          baseWidth: 17.2
        },
  ]

  const outerWalls: {
        x: number
        y: number
        position: [number, number, number]
        rotation: [number, number, number]
        width: number
        height: number
        depth: number
    }[] = [
        { x: 10, 
          y: 5, 
          position: [40.5, 5, -5], 
          rotation: [0, Math.PI / 2, 0], 
          width: 70, 
          height: 20, 
          depth: 1 
        },
        { x: 10, 
          y: 5, 
          position: [-40.5, 5, -5], 
          rotation: [0, Math.PI / 2, 0], 
          width: 70, 
          height: 20, 
          depth: 1 
        },
        { x: 10, 
          y: 5, 
          position: [0, 5, -40.5], 
          rotation: [0, 0, 0], 
          width: 82, 
          height: 20, 
          depth: 1 
        },
        { x: 10, 
          y: 5, 
          position: [0, 5, -10.5], 
          rotation: [0, 0, 0], 
          width: 40, 
          height: 20, 
          depth: 1, 
        },
        { x: 10, 
          y: 5, 
          position: [0, 5, 30], 
          rotation: [0, 0, 0], 
          width: 82, 
          height: 20, 
          depth: 1, 
        },
  ]

  const baseboards: {
    position: [number, number, number];
    size: [number, number, number];
    rotation?: [number, number, number];
  }[] = [
    { position: [0, -4.7, 29.95] as [number, number, number], 
      size: [80, 0.5, 0.1] as [number, number, number] 
    },
    { position: [0, -4.7, -39.95] as [number, number, number], 
      size: [80, 0.5, 0.1] as [number, number, number] 
    },
    { position: [-39.9, -4.7, -5] as [number, number, number], 
      size: [70, 0.5, 0.1] as [number, number, number], 
      rotation: [0, Math.PI / 2, 0] as [number, number, number] 
    },
    { position: [39.9, -4.7, -5] as [number, number, number], 
      size: [70, 0.5, 0.1] as [number, number, number], 
      rotation: [0, Math.PI / 2, 0] as [number, number, number] 
    },
    { position: [0, -4.7, -11] as [number, number, number], 
      size: [42, 0.5, 0.2] as [number, number, number], 
      rotation: [0, 0, 0] as [number, number, number] 
    },
    { position: [0, -4.7, -10] as [number, number, number], 
      size: [40, 0.5, 0.2] as [number, number, number], 
      rotation: [0, 0, 0] as [number, number, number] 
    },
  ];

  const ceilings: {
    rotation: [number, number, number];
    height: number;
    width: number;
    position: [number, number, number];
    panelWidth: number;
    panelHeight: number;
  }[] = [
    { rotation: [Math.PI / 2, 0, 0], 
      height: 40, 
      width: 40, 
      position: [0.5, 15, 10], 
      panelWidth: 40, 
      panelHeight: 35 
    },
    { rotation: [Math.PI / 2, 0, 0], 
      height: 19, 
      width: 40,  
      position: [30.5, 15, 10], 
      panelWidth: 40, 
      panelHeight: 15 
    },
    { rotation: [Math.PI / 2, 0, 0], 
      height: 20, 
      width: 40, 
      position: [-30, 15, 10], 
      panelWidth: 40, 
      panelHeight: 15  
    },
    { rotation: [Math.PI / 2, 0, 0], 
      height: 80, 
      width: 29, 
      position: [0, 15, -25.5], 
      panelWidth: 29, 
      panelHeight: 75 
    },
  ];

  return (
    <group>
      <Visitor />
      <PointerLockControls />
      <Flooring />

      {ceilings.map((props, i) => (
        <Ceiling key={i} {...props} />
      ))}

      {innerWalls.map((props, index) => (
        <InnerWall key={index} {...props} />
      ))}

      {outerWalls.map((props, index) => (
        <OuterWall key={index} {...props} />
      ))}   

      {baseboards.map((props, i) => (
        <Baseboard key={i} {...props} />
      ))}

      
      <Table 
        position={[3.5,-3.3,-7]} 
        rotation={[0,0,0]} 
        size={[5,2.5,5]}
        display="/display/3d_github_logo.glb"
        displayPos={[0, 0, -6]}
        displayScale={1}
      />
      <Table 
        position={[-3.5,-3.3,-7]} 
        rotation={[0,0,0]} 
        size={[5,2.5,5]}
        display="/display/3d_google_logo.glb"
        displayPos={[0, 0, -6]}
        displayScale={1}
      />
      <Table 
        position={[10.5,-3.3,-7]} 
        rotation={[0,0,0]} 
        size={[5,2.5,5]}
        display="/display/3d_linkedin_logo.glb"
        displayPos={[0, 0, -6]}
        displayScale={1}
      />
      <Table 
        position={[-10.5,-3.3,-7]} 
        rotation={[0,0,0]} 
        size={[5,2.5,5]}
        display="/display/3d_facebook_logo.glb"
        displayPos={[0, 0, -6]}
        displayScale={1}
      />

      
      <Table 
        position={[-30,-3.3, 25]} 
        rotation={[0,Math.PI/2,0]} 
        size={[5,2.5,15]}
      />
      <Table 
        position={[-23.5,-3.3,-1.5]} 
        rotation={[0,0,0]} 
        size={[5,2.5,15]}
      />

      
      <Table 
        position={[30.5,-3.3, 25]} 
        rotation={[0,Math.PI/2,0]} 
        size={[5,2.5,15]}
      />
      <Table 
        position={[24,-3.3,-1.5]} 
        rotation={[0,0,0]} 
        size={[5,2.5,15]}
      />

      
      <Table 
        position={[-22,-3.3,-28]} 
        rotation={[0, Math.PI/2, 0]} 
        size={[5,2.5,15]}
      />
      <Table 
        position={[-22,-3.3,-22]} 
        rotation={[0, Math.PI/2, 0]} 
        size={[5,2.5,15]}
      />
      <Table 
        position={[-0,-3.3,-28]} 
        rotation={[0, Math.PI/2, 0]} 
        size={[5,2.5,15]}
      />
      <Table 
        position={[-0,-3.3,-22]} 
        rotation={[0, Math.PI/2, 0]} 
        size={[5,2.5,15]}
      />
      <Table 
        position={[22,-3.3,-28]} 
        rotation={[0, Math.PI/2, 0]} 
        size={[5,2.5,15]}
      />
      <Table 
        position={[22,-3.3,-22]} 
        rotation={[0, Math.PI/2, 0]} 
        size={[5,2.5,15]}
      />

      <LightPole rotation={[0, 0, Math.PI/2]} position={[0, 14, 10]} height={40}/>
      <LightPole rotation={[0, 0, Math.PI/2]} position={[30, 14, 28]} height={20}/>
      <LightPole rotation={[0, Math.PI/2, Math.PI/2]} position={[21.8, 14, 10]} height={40}/>
      <LightPole rotation={[0, 0, Math.PI/2]} position={[-30, 14, 28]} height={20}/>
      <LightPole rotation={[0, Math.PI/2, Math.PI/2]} position={[-21.5, 14, 10]} height={40}/>

      
      <Lamps 
        position={[-10, 14.3, 10]} 
        color="" 
        lampType="" 
        rotation={[0,1.2,0]} 
        lampAngle={Math.PI/3.2}
        lampPos={[0.6,-2,0]}
        upper={true}
      />
      <Lamps 
        position={[10, 14.3, 10]} 
        color="" 
        lampType="" 
        rotation={[0,1.9,0]} 
        lampAngle={Math.PI/3.2}
        lampPos={[0.6,-2,0]}
        upper={true}
      />
      <Lamps 
        position={[-10, -5, 19]} 
        color="" 
        lampType="" 
        rotation={[0, Math.PI + 1, Math.PI]} 
        lampAngle={Math.PI/2} 
        lampPos={[0.7,-1.6,0]}
        distance={15}
        attenuation={10}
        intensity={0.6}
        anglePower={10}
      />
      <Lamps 
        position={[10, -5, 19]} 
        color="" 
        lampType="" 
        rotation={[0, Math.PI + 2.1, Math.PI]} 
        lampAngle={Math.PI/2} 
        lampPos={[0.7,-1.6,0]}
        distance={15}
        attenuation={10}
        intensity={0.6}
        anglePower={10}
      />

      
      <Lamps 
        position={[30.5, 14.3, 28]} 
        color="" 
        lampType="" 
        rotation={[0,1.9,0]} 
        lampAngle={0.1}
        lampPos={[0,-1,0]}
        upper={true}
      />
      <Lamps 
        position={[21.8, 14.3, -0.5]} 
        color="" 
        lampType="" 
        rotation={[0,1.9,0]} 
        lampAngle={0.1}
        lampPos={[0,-1,0]}
        upper={true}
      />


      <Lamps 
        position={[-30.5, 14.3, 28]} 
        color="" 
        lampType="" 
        rotation={[0,1.9,0]} 
        lampAngle={0.1}
        lampPos={[0,-1,0]}
        upper={true}
      />
      <Lamps 
        position={[-21.5, 14.3, -2.5]} 
        color="" 
        lampType="" 
        rotation={[0,1.9,0]} 
        lampAngle={-0.1}
        lampPos={[0,-1,0]}
        upper={true}
      />

      <mesh position={[0,-4.8, 10.8]} castShadow receiveShadow>
        <boxGeometry args={[20,0.5,7]}/>
        <meshPhysicalMaterial 
          reflectivity={1}
          clearcoat={1}
          clearcoatRoughness={0}
          metalness={0}
          roughness={0}
        />
      </mesh>
      <Fonts 
        text="The Portfolio" 
        color='#ffffff' 
        size={1.5} 
        height={1.5} 
        position={[-7.15,-1.9,10]} 
        rotation={[0,0,0]}
      />
      <Fonts 
        text="MUSEUM" 
        color='#ffffff' 
        size={2.5} 
        height={1.5} 
        position={[-7,-4.5,10]} 
        rotation={[0,0,0]}
      />

      <Fonts 
        text="Socials" 
        color='#ffffff' 
        size={1.5} 
        height={0.5} 
        position={[-3,5,-10]} 
        rotation={[0,0,0]}
        letterSpacing={0}
      />
    </group>
  );
}

export default Scene
