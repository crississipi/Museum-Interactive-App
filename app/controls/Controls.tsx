"use client"

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

const Controls = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current; // ✅ Capture the current ref value safely

    // Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa0a0a0);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.6, 5); // Human eye level

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount?.appendChild(renderer.domElement); // Use stable ref

    // Lighting
    const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
    light.position.set(0, 20, 0);
    scene.add(light);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 7.5);
    scene.add(dirLight);

    // Floor
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshStandardMaterial({ color: 0x888888 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Sample Cube
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ color: 0x00ff00 })
    );
    cube.position.set(0, 0.5, -5);
    scene.add(cube);

    // Pointer Lock Controls
    const controls = new PointerLockControls(camera, renderer.domElement);
    scene.add(controls.getObject());

    document.addEventListener('click', () => {
      controls.lock();
    });

    // Movement
    const move = { forward: false, backward: false, left: false, right: false };
    const velocity = new THREE.Vector3();
    const direction = new THREE.Vector3();
    const speed = 4;

    const keyDownHandler = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'KeyW': move.forward = true; break;
        case 'KeyS': move.backward = true; break;
        case 'KeyA': move.left = true; break;
        case 'KeyD': move.right = true; break;
      }
    };

    const keyUpHandler = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'KeyW': move.forward = false; break;
        case 'KeyS': move.backward = false; break;
        case 'KeyA': move.left = false; break;
        case 'KeyD': move.right = false; break;
      }
    };

    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);

    const clock = new THREE.Clock();

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      direction.set(0, 0, 0);

      if (move.forward) direction.z -= 1;
      if (move.backward) direction.z += 1;
      if (move.left) direction.x -= 1;
      if (move.right) direction.x += 1;
      direction.normalize();

      if (controls.isLocked) {
        velocity.x = direction.x * speed * delta;
        velocity.z = direction.z * speed * delta;

        controls.moveRight(velocity.x);
        controls.moveForward(velocity.z);

        // Lock camera height
        camera.position.y = -1;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyUpHandler);
      renderer.dispose();
      if (mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div ref={mountRef} className="w-screen h-screen overflow-hidden" />
  );
};

export default Controls;
