'use client'
import { useCameraStore } from './CameraStore'

function CameraTracker() {
 const { position, rotation } = useCameraStore()

  return (
    <div className='fixed top-5 left-5 bg-black/60 text-white p-2 text-xs'
      >
        <div><strong>Camera Position</strong></div>
        <div>X: {position.x.toFixed(2)}</div>
        <div>Y: {position.y.toFixed(2)}</div>
        <div>Z: {position.z.toFixed(2)}</div>

        <div style={{ marginTop: '0.5rem' }}><strong>Camera Rotation</strong></div>
        <div>rX: {rotation.x.toFixed(2)}</div>
        <div>rY: {rotation.y.toFixed(2)}</div>
        <div>rZ: {rotation.z.toFixed(2)}</div>
    </div>
  )
}

export default CameraTracker;