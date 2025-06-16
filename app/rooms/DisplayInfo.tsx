'use client'

import { useUIStore } from './CameraStore'

export default function DisplayInfo() {
  const { popupVisible, clearFocus } = useUIStore()
  
  if (!popupVisible) return null

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'white',
      padding: '20px',
      borderRadius: '8px',
      zIndex: 1000
    }}>
      <h1>Hello World</h1>
      <button 
        onClick={() => {
          clearFocus()
        }}
        style={{
          padding: '8px 16px',
          background: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Close
      </button>
    </div>
  )
}