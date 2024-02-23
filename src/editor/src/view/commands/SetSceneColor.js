import Command from '../../abstractions/Command.js';
import * as THREE from 'three'

/**
 * @class
 * @classdesc SetSceneColor sets the color of the scene
 * @extends Command
 */
export default class SetSceneColor extends Command {

    /**
     * @constructor
     * 
     * @param {THREE.Color} color - The color to set
     * @throws {Error} If color is not a THREE.Color
     */
    constructor(color) {
        super()

        if (!(color instanceof THREE.Color)) {
            throw new Error('Must be a THREE.Color')
        }
        
        this.color = color
    }

    /**
     * Execute the command
     * 
     * @returns {void}
     */
    execute() {
        const { viewConfiguration } = this.invoker.options.getView()
        const scene = viewConfiguration.sceneConfig.instance

        scene.background = this.color
    }
}
