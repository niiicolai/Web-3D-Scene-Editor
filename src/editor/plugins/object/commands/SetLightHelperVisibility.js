import { Command } from '../../../editor.js'
import * as THREE from 'three'

/**
 * @extends Command
 * @class
 * @classdesc SetLightHelperVisibility set the visibility of a light's helper
 */
export default class SetLightHelperVisibility extends Command {

    /**
     * @constructor
     * 
     * @param {boolean} state the visibility state of the light's helper
     */
    constructor(state) {
        super()
        this.type = state
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
                // Set visibility for all child helpers or meshes
                for (const child of object.children) {
                    child.visible = this.type
                }
            }
        }
    }
}
