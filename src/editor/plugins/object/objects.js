import BasePlugin from '../../src/abstractions/BasePlugin.js';
import Util from "./src/util.js";
import * as THREE from 'three'

/**
 * @class Objects
 * @classdesc Container for dynamic objects in the scene
 * @extends BasePlugin
 * @property {Array} objects the objects
 * @property {Scene} scene the scene
 */ 
export default class Objects extends BasePlugin {

    /**
     * @constructor
     */
    constructor() {
        super();

        this.objects = []
    }

    /**
     * Setup the plugin
     * 
     * @param {Object} context
     * @returns {void}
     * @throws {Error} if unable to find scene
     */
    setup(context) {
        const { instance: scene } = context.options.view.viewConfiguration.sceneConfig
        
        if (scene === null) {
            throw new Error('View Error: Unable to find scene')
        }
        
        this.scene = scene
    }

    /**
     * Clear the objects
     * 
     * @returns {void}
     */
    clear() {
        if (this.scene) {
            for (const object of this.objects) {
                this.scene.remove(object)
            }
        }

        this.objects = []
    }

    /**
     * Add an object to the scene and objects list
     * 
     * @param {THREE.Object3D} object
     * @returns {THREE.Object3D} the object
     * @throws {Error} if object is not a THREE.Object3D
     * @throws {Error} if object is a THREE.Light and unable to find helper
     */
    add(object) {
        if (!(object instanceof THREE.Object3D)) {
            throw new Error('Must be a THREE.Object3D')
        }

        if (object instanceof THREE.Light) {
            const helper = Util.getLightHelper(object)
            object.add(helper)
        }

        if (object.name === '' || object.name === undefined || object.name === null) {
            object.name = object.type + ' ' + (this.objects.length + 1)
        }

        this.objects.push(object)
        this.scene.add(object)

        return object
    }

    /**
     * Remove an object from the scene and objects list
     * 
     * @param {THREE.Object3D} object
     * @returns {void}
     * @throws {Error} if object is not a THREE.Object3D
     * @throws {Error} if unable to find object
     */
    remove(object) {
        if (!(object instanceof THREE.Object3D)) {
            throw new Error('Must be a THREE.Object3D')
        }

        const index = this.objects.indexOf(object)
        if (index === -1) {
            throw new Error('Unable to find object')
        }

        this.objects.splice(index, 1)
        this.scene.remove(object)
    }
}
