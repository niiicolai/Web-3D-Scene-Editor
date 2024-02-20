import Command from '../../abstractions/Command.js';
import * as THREE from 'three'

/**
 * @class
 * @classdesc SetSceneCubeMap sets the cube map of the scene
 * @extends Command
 */
export default class SetSceneCubeMap extends Command {

    /**
     * @constructor
     * 
     * @param {THREE.CubeTexture} cubemap - The cube texture to set
     * @throws {Error} If cubemap is not a THREE.CubeTexture
     */
    constructor(cubemap) {
        super()
        
        if (!(cubemap instanceof THREE.CubeTexture)) {
            throw new Error('Must be a THREE.CubeTexture')
        }

        this.cubemap = cubemap
    }

    /**
     * Execute the command
     * 
     * @returns {void}
     */
    async execute() {
        /**
         * Set the cube texture as the background of the scene
         */
        const { viewConfiguration } = this.invoker.options.view
        const scene = viewConfiguration.sceneConfig.instance
        scene.background = cubemap
    }
}
