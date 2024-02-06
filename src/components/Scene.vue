<template>
    <canvas ref="canvasRef"></canvas>
</template>

<script setup>
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ref, computed, onMounted } from 'vue';
import { useScene } from '../composables/scene.js';

const sceneManager = useScene();
const canvasRef = ref(null);
const props = defineProps({
    sceneObjects: {
        type: Array,
        default: () => []
    }
})

onMounted(() => {
    const canvas = canvasRef.value;
    const sceneConfig = sceneManager.sceneConfig.value;
    const rendererConfig = sceneManager.rendererConfig.value;
    const lightConfig = sceneManager.lightConfig.value;
    const gridConfig = sceneManager.gridConfig.value;
    const cameraConfig = sceneManager.cameraConfig.value;

    /**
     * Scene setup
     */
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(sceneConfig.background);
    sceneManager.scene.value = scene;

    /**
     * Camera setup
     */
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = cameraConfig.startPosition.x;
    camera.position.y = cameraConfig.startPosition.y;
    camera.position.z = cameraConfig.startPosition.z;
    sceneManager.camera.value = camera;

    /**
     * Renderer setup
     */
    const renderer = new THREE.WebGLRenderer({ 
        canvas, 
        antialias: rendererConfig.antialias, 
        alpha: rendererConfig.alpha 
    });
    renderer.shadowMap.enabled = rendererConfig.shadowMapEnabled;
    renderer.shadowMap.type = rendererConfig.shadowMapType;
    if (rendererConfig.toneMappingEnabled) {
        renderer.toneMapping = rendererConfig.toneMapping;
        renderer.toneMappingExposure = rendererConfig.toneMappingExposure;
    }
    sceneManager.renderer.value = renderer;

    /**
     * Orbit controls setup
     */
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    
    /**
     * Grid setup
     */
    if (gridConfig.active) {
        const gridPlane = new THREE.GridHelper(gridConfig.size, gridConfig.divisions);
        scene.add(gridPlane);
    }
    sceneManager.scene.value = scene;

    /**
     * Light setup
     */
    const light = new THREE.DirectionalLight(lightConfig.color, lightConfig.intensity);
    light.position.x = lightConfig.startPosition.x;
    light.position.y = lightConfig.startPosition.y;
    light.position.z = lightConfig.startPosition.z;
    light.rotation.x = lightConfig.startRotation.x;
    light.rotation.y = lightConfig.startRotation.y;
    light.rotation.z = lightConfig.startRotation.z;
    light.castShadow = lightConfig.castShadow;
    if (lightConfig.castShadow) {
        light.shadow.mapSize.width = lightConfig.shadowMapWidth;
        light.shadow.mapSize.height = lightConfig.shadowMapHeight;
        light.shadow.camera.near = lightConfig.shadowCameraNear;
        light.shadow.camera.far = lightConfig.shadowCameraFar;
        light.shadow.camera.left = lightConfig.shadowCameraLeft;
        light.shadow.camera.right = lightConfig.shadowCameraRight;
        light.shadow.camera.top = lightConfig.shadowCameraTop;
        light.shadow.camera.bottom = lightConfig.shadowCameraBottom;
    }
    scene.add(light);
    sceneManager.light.value = light;
    
    const resizeRendererToDisplaySize = (renderer) => {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }
    
    const animate = () => {
        requestAnimationFrame(animate);
        if (resizeRendererToDisplaySize(renderer)) {
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
        controls.update();
        renderer.render(scene, camera);
    };
    
    animate();
});

</script>

<style scoped>
canvas {
    width: 100%;
    height: 100%;
    display: block;
}
</style>