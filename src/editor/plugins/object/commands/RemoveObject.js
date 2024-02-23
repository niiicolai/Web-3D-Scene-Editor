import { Command } from '../../../editor.js'
import * as THREE from 'three'

/**
 * @extends Command
 * @class
 * @classdesc RemoveObject remove an object from the scene
 */
export default class RemoveObject extends Command {

    /**
     * @constructor
     * 
     * @param {THREE.Object3D} object3d the object to remove
     * @throws {Error} if object3d is not an instance of THREE.Object3D
     */
    constructor(object3d) {
        super()
        
        if (!(object3d instanceof THREE.Object3D)) {
            throw new Error('object3d Must be an instance of THREE.Object3D')
        }
        
        this.object3d = object3d
    }

    /**
     * Execute the command
     * 
     * @returns {void}
     */
    async execute() {
        const objects = this.invoker.options.getPlugin('objects')
        objects.remove(this.object3d)
    }
}
