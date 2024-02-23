
import Util from './src/util.js';
import ViewConfiguration from './src/ViewConfiguration.js';
import { toRaw } from 'vue';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/**
 * @class
 * @classdesc View is a class that holds the 3D view of the editor.
 * @property {HTMLCanvasElement} canvas - The canvas to render the 3D view.
 * @property {ViewConfiguration} viewConfiguration - The view configuration.
 * @property {number} frameRate - The frame rate.
 * @property {number} interval - The interval for the loop.
 * @property {THREE.Scene} scene - The scene.
 * @property {THREE.Camera} camera - The camera.
 * @property {THREE.Renderer} renderer - The renderer.
 * @property {OrbitControls} controls - The orbit controls.
 * @property {THREE.GridHelper} grid - The grid.
 */
export default class View {

    /**
     * @constructor
     * 
     * @param {HTMLCanvasElement} canvas - The canvas to render the 3D view.
     * @param {ViewConfiguration} viewConfiguration - The view configuration.
     * @param {number} frameRate - The frame rate.
     */
    constructor(canvas, viewConfiguration = new ViewConfiguration(), frameRate = 1000 / 60) {

        if (!(canvas instanceof HTMLCanvasElement)) {
            throw new Error('Must be a HTMLCanvasElement')
        }

        if (!(viewConfiguration instanceof ViewConfiguration)) {
            throw new Error('Must be a ViewConfiguration')
        }

        if (typeof frameRate !== 'number') {
            throw new Error('Must be a number')
        }

        this.canvas = canvas
        this.viewConfiguration = viewConfiguration
        this.frameRate = frameRate
        this.interval = null
    }

    /**
     * Setup the view.
     * 
     * @param {Object} context
     * @returns {void}
     */
    setup(context) {
        const { cameraConfig, rendererConfig, gridConfig, sceneConfig, lightConfig } = toRaw(this.viewConfiguration)
        
        /**
         * Setup the scene
         */
        this.scene = sceneConfig.instance

        /**
         * Setup the camera
         */
        this.camera = cameraConfig.instance
        this.camera.position.copy(cameraConfig.position)

        /**
         * Setup the renderer
         */
        this.renderer = rendererConfig.instance(this.canvas)

        /**
         * Setup the orbit controls
         */
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        
        /**
         * Setup the orbit controls
         */
        this.grid = gridConfig.instance
        this.scene.add(this.grid);
    }

    /**
     * Add the initial lights to the scene.
     */
    addLights(objects) {
        /**
         * Add the inital light as dynamic objects
         */ 
        const lightConfig = this.viewConfiguration.lightConfig
        const lightInstances = lightConfig.instances
        for (const lightConfig of lightInstances) {
            const { instance, position } = lightConfig
            instance.position.copy(position)
            this.scene.add(instance)
            objects.add(instance)
        }
    }

    /**
     * Clear the view.
     * 
     * @returns {void}
     */
    clear() {
        this.renderer.dispose()
        this.controls.dispose()
        this.scene.remove(this.grid)

        this.scene = null
        this.camera = null
        this.renderer = null
        this.controls = null
        this.grid = null
    }

    /**
     * Start the loop rendering the view.
     * 
     * @returns {void}
     */
    startRender() {
        this.interval = setInterval(() => {
            this.render()
        }, this.frameRate)
    }

    /**
     * Stop the loop rendering the view.
     * 
     * @returns {void}
     */
    stopRender() {
        if (this.interval) {
            clearInterval(this.interval)
        }
    }

    /**
     * Render the view.
     * 
     * @returns {void}
     */
    render() {
        Util.render(
            toRaw(this.renderer), 
            toRaw(this.scene), 
            toRaw(this.camera), 
            toRaw(this.controls)
        )
    }
}
