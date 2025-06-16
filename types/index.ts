export interface LightPosition {
    position: [number, number, number];
    rotation: [number, number, number];
    color: string;
    lampType: string;
}

export interface LampProps {
  position: [number, number, number];
  outerRad: number;
  innerRad: number;
  cheight: number;
}

export interface WallProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  width: number;
  height: number;
  depth: number;
  x: number;
  y: number;
}

export interface BaseProps {
  rightBasePos: [number, number, number];
  leftBasePos: [number, number, number];
  baseWidth: number;
}

export interface BaseboardProps {
  position: [number, number, number];
  size?: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
}

export interface CeilingProps {
  height: number;
  width: number;
  position: [number, number, number];
  rotation: [number,number, number];
  panelWidth: number;
  panelHeight: number;
}

export interface GlassBoxProps {
  position: [number, number, number];
  rotation: [number,number, number];
  size: [number, number, number];
  display?: string;
  displayPos?: [number, number, number];
  displayScale?: number;
}

export interface ArtificialLightProps {
  position: [number, number, number];
  rotation: [number,number, number];
  lightType: string;
  lightSize: [number, number];
}

export interface FontProps {
  text: string
  color?: string
  size?: number
  height?: number
  position: [number, number, number]
  rotation: [number, number, number]
  letterSpacing?: number
}

export interface PanelProps {
  position: [number, number, number];
  size: [number, number, number];
}

export interface PoleProps {
  position: [number, number, number];
  rotation: [number, number, number];
  height: number;
}