declare module 'three/examples/jsm/controls/PointerLockControls.js' {
  import * as THREE from 'three';

  export class PointerLockControls extends THREE.EventDispatcher {
    constructor(camera: THREE.Camera, domElement: HTMLElement);
    dispose(): void;
    getObject(): THREE.Object3D;
    isLocked: boolean;
    lock(): void;
    unlock(): void;
    moveForward(distance: number): void;
    moveRight(distance: number): void;
  }
}
