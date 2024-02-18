import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { toRaw } from 'vue';

/**
 * A method used to check if the renderer needs to be resized.
 * Used to keep the canvas responsive.
 */
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

export class ViewConfiguration {
    constructor(sceneConfig, cameraConfig, rendererConfig, gridConfig, lightConfig) {
        this.sceneConfig = sceneConfig || {
            instance: new THREE.Scene(),
        }

        this.cameraConfig = cameraConfig || {
            instance: new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
            position: new THREE.Vector3(0, 5, 5),
        }

        this.rendererConfig = rendererConfig || {
            instance: (canvas) => new THREE.WebGLRenderer({ canvas, antialias: true }),
        }

        this.gridConfig = gridConfig || {
            instance: new THREE.GridHelper(25, 25),
        }

        this.lightConfig = lightConfig || {
            instances: [
                {
                    instance: new THREE.DirectionalLight(0xffffff, 1),
                    position: new THREE.Vector3(0, 10, 0),
                },
                {
                    instance: new THREE.AmbientLight(0x404040),
                    position: new THREE.Vector3(0, 10, 0),
                }
            ]
        }
    }
}

export default class View {
    constructor(canvas, viewConfiguration) {
        if (!(canvas instanceof HTMLCanvasElement)) {
            throw new Error('Must be a HTMLCanvasElement')
        }

        if (!(viewConfiguration instanceof ViewConfiguration)) {
            throw new Error('Must be a ViewConfiguration')
        }

        this.canvas = canvas
        this.viewConfiguration = viewConfiguration
        this.initView()
    }

    initView() {
        const { cameraConfig, rendererConfig, gridConfig, sceneConfig } = toRaw(this.viewConfiguration)

        this.scene = sceneConfig.instance

        this.camera = cameraConfig.instance
        this.camera.position.copy(cameraConfig.position)

        this.renderer = rendererConfig.instance(this.canvas)
        this.renderer.setSize(window.innerWidth, window.innerHeight)

        this.controls = new OrbitControls(this.camera, this.renderer.domElement)

        this.grid = gridConfig.instance
        this.scene.add(this.grid);
    }

    initLight(objectsHandler) {
        for (const lightConfig of this.viewConfiguration.lightConfig.instances) {
            const { instance, position } = lightConfig
            instance.position.copy(position)
            objectsHandler.add(instance)
        }
    }

    render() {
        const { renderer, canvas, camera, scene, controls } = toRaw(this)

        if (resizeRendererToDisplaySize(renderer)) {
            const aspect = canvas.clientWidth / canvas.clientHeight;
            camera.aspect = aspect;
            camera.updateProjectionMatrix();
        }

        controls.update();
        renderer.render(scene, camera);
    }

    dispose() {
        this.renderer.dispose()
        this.controls.dispose()
    }
}
