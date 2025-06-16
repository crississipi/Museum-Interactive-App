import * as THREE from 'three';

type GradientType = 'radial' | 'horizontal' | 'vertical';

export function createLightGlow(color = 'white', type: GradientType = 'radial') {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext('2d')!;
  let gradient: CanvasGradient;

  if (type === 'radial') {
    gradient = ctx.createRadialGradient(
      size / 2, size / 2, 0,
      size / 2, size / 2, size / 2
    );
  } else if (type === 'horizontal') {
    gradient = ctx.createLinearGradient(0, 0, size, 0);
  } else {
    // vertical
    gradient = ctx.createLinearGradient(0, 0, 0, size);
  }

  gradient.addColorStop(0, color);
  gradient.addColorStop(0.5, color);
  gradient.addColorStop(1, 'transparent');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  return texture;
}
