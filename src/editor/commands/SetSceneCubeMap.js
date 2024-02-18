import * as THREE from 'three'
import { Command } from '../abstractions/Commands.js';

export default class SetSceneCubeMap extends Command {
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
