import { ref } from 'vue'
import * as THREE from 'three'

const gridConfig = ref({ 
    size: 25, 
    divisions: 25, 
    active: true 
});

const sceneConfig = ref({ 
    background: 0xCCCDDD 
});

const cameraConfig = ref({ 
    startPosition: { x: 0, y: 5, z: 5 } 
});

const rendererConfig = ref({
  antialias: true,
  alpha: true,
  shadowMapEnabled: true,
  shadowMapType: THREE.PCFSoftShadowMap,
  toneMappingEnabled: true,
  toneMapping: THREE.ReinhardToneMapping,
  toneMappingExposure: 2.3,
});

const lightConfig = ref({
  color: 0xFFFFFF,
  intensity: 1,
  startPosition: { x: 0, y: 10, z: 0 },
  startRotation: { x: 0, y: 0, z: 0 },
  castShadow: true,
  shadowMapWidth: 2048,
  shadowMapHeight: 2048,
  shadowCameraNear: 0.5,
  shadowCameraFar: 500,
  shadowCameraLeft: -10,
  shadowCameraRight: 10,
  shadowCameraTop: 10,
  shadowCameraBottom: -10,
});

const scene = ref(null)
const camera = ref(null)
const renderer = ref(null)
const light = ref(null)
const grid = ref(null)

export const useScene = () => {
  return {
    gridConfig,
    sceneConfig,
    cameraConfig,
    rendererConfig,
    lightConfig,
    scene,
    camera,
    renderer,
    light,
    grid
  }
}
