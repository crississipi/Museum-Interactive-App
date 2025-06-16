// components/CameraTrackerInCanvas.tsx
'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useCameraStore } from './CameraStore'

export default function CameraTrackerInCanvas() {
  const { camera } = useThree()
  const setCameraState = useCameraStore((s) => s.setCameraState)

  useFrame(() => {
    setCameraState(camera.position.clone(), camera.rotation.clone())
  })

  return null // no visible element needed
}
