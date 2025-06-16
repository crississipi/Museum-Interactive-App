import { create } from 'zustand'
import * as THREE from 'three'

interface CameraState {
  position: THREE.Vector3
  rotation: THREE.Euler
  setCameraState: (position: THREE.Vector3, rotation: THREE.Euler) => void
}

export const useCameraStore = create<CameraState>((set) => ({
  position: new THREE.Vector3(),
  rotation: new THREE.Euler(),
  setCameraState: (position, rotation) => set({ position, rotation }),
}))

interface UIState {
  focusTarget: {
    position: THREE.Vector3
    lookAt: THREE.Vector3
  } | null
  isFocusing: boolean
  popupVisible: boolean
  setFocusTarget: (position: THREE.Vector3, lookAt: THREE.Vector3) => void
  clearFocus: () => void
  showPopup: () => void
  hidePopup: () => void
}

export const useUIStore = create<UIState>((set) => ({
  focusTarget: null,
  isFocusing: false,
  popupVisible: false,
  setFocusTarget: (position, lookAt) => set({ 
    focusTarget: { position, lookAt }, 
    isFocusing: true,
    popupVisible: true
  }),
  clearFocus: () => set({ 
    focusTarget: null, 
    isFocusing: false,
    popupVisible: false 
  }),
  showPopup: () => set({ popupVisible: true }),
  hidePopup: () => set({ popupVisible: false }),
}))