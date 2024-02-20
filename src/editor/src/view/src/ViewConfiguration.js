import * as THREE from 'three';

/**
 * @class
 * @classdesc ViewConfiguration is a class that holds the configuration for the view.
 */
export default class ViewConfiguration {

    /**
     * @constructor
     * @param {object} sceneConfig - The scene configuration.
     * @param {object} cameraConfig - The camera configuration.
     * @param {object} rendererConfig - The renderer configuration.
     * @param {object} gridConfig - The grid configuration.
     * @param {object} lightConfig - The light configuration.
     */
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