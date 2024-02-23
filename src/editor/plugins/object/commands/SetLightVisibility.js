import { Command } from '../../../editor.js'
import * as THREE from 'three'

/**
 * @extends Command
 * @class
 * @classdesc SetLightVisibility set the visibility of a light
 */
export default class SetLightVisibility extends Command {

    /**
     * @constructor
     * 
     * @param {boolean} state the visibility state of the light
     */
    constructor(state) {
        super()
        this.state = state
    }

    /**
     * Execute the command
     * 
     * @returns {void}
     */
    async execute() {
        const objects = this.invoker.options.getPlugin('objects')

        const sceneObjects = objects.objects;
        for (const object of sceneObjects) {
            if (object instanceof THREE.Light) {
                if (this.state) {
                    object.intensity = object.userData.intensity
                } else {
                    if (!object.userData) object.userData = {}
                    object.userData.intensity = object.intensity
                    object.intensity = 0
                }
            }
        }
    }
}
