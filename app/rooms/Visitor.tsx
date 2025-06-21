'use client';

import { useThree, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useUIStore } from './CameraStore';
import dynamic from 'next/dynamic';

const Joystick = dynamic(() => import('./JoyStickControls'), { ssr: false });

const Visitor = () => {
  const { camera, scene } = useThree();
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const keys = useRef({ w: false, a: false, s: false, d: false });
  const speed = 10;
  const colliderRadius = 0.5;
  const isFocusing = useUIStore((state) => state.isFocusing);

  const [mobileDir, setMobileDir] = useState({ x: 0, z: 0 });
  const isMobile = typeof window !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent);

  const [colliders, setColliders] = useState<THREE.Mesh[]>([]);

  // Handle keyboard input
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key in keys.current) keys.current[key as keyof typeof keys.current] = true;
    };
    const up = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key in keys.current) keys.current[key as keyof typeof keys.current] = false;
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  // Detect solid objects for collision
  useEffect(() => {
    const meshes: THREE.Mesh[] = [];
    scene.traverse((obj) => {
      if (obj.userData.solid && obj instanceof THREE.Mesh) {
        meshes.push(obj);
      }
    });
    setColliders(meshes);
  }, [scene]);

  // Camera rotation on swipe (mobile only)
  useEffect(() => {
    if (!isMobile) return;

    let startX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const deltaX = endX - startX;

      if (Math.abs(deltaX) > 50) {
        const angle = deltaX > 0 ? -Math.PI / 8 : Math.PI / 8;
        camera.rotation.y += angle;
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [camera, isMobile]);

  // Movement with collision check
  useFrame((_, delta) => {
    if (isFocusing) return;

    direction.current.set(
      (keys.current.d ? 1 : 0) - (keys.current.a ? 1 : 0) + mobileDir.x,
      0,
      (keys.current.w ? 1 : 0) - (keys.current.s ? 1 : 0) + mobileDir.z
    );

    if (direction.current.lengthSq() > 0) {
      direction.current.normalize();

      const forward = new THREE.Vector3();
      camera.getWorldDirection(forward);
      forward.y = 0;
      forward.normalize();

      const right = new THREE.Vector3();
      right.crossVectors(forward, camera.up).normalize();

      velocity.current
        .copy(forward)
        .multiplyScalar(direction.current.z)
        .add(right.multiplyScalar(direction.current.x))
        .normalize()
        .multiplyScalar(speed * delta);

      const nextPos = camera.position.clone().add(velocity.current);

      let canMove = true;
      for (const wall of colliders) {
        const box = new THREE.Box3().setFromObject(wall);
        const closestPoint = new THREE.Vector3(
          THREE.MathUtils.clamp(nextPos.x, box.min.x, box.max.x),
          THREE.MathUtils.clamp(nextPos.y, box.min.y, box.max.y),
          THREE.MathUtils.clamp(nextPos.z, box.min.z, box.max.z)
        );
        const distanceSquared = nextPos.distanceToSquared(closestPoint);
        if (distanceSquared < colliderRadius * colliderRadius) {
          canMove = false;
          break;
        }
      }

      if (canMove) {
        camera.position.copy(nextPos);
      }
    }

    camera.position.y = 0;
  });

  return (
    <>
      {isMobile && <Joystick onMove={setMobileDir} />}
    </>
  );
};

export default Visitor;
