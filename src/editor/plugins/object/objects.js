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
        const view = context.options.getView()
        const scene = view.scene
        
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

        let index = -1;
        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].uuid === object.uuid) {
                index = i
                break
            }
        }

        if (index === -1) {
            throw new Error('Unable to find object')
        }

        const object3d = this.objects[index]
        this.scene.remove(object3d)
        this.objects.splice(index, 1)
    }

    /**
     * Add a light to the scene and objects list
     * 
     * @param {string} name the name of the light
     * @param {THREE.Color} color the color of the light
     * @param {number} intensity the intensity of the light
     * @returns {THREE.Light} the light
     */
    addLightByType(type, color, intensity = 1) {
        const light = Util.createLightByType(type, color, intensity)
        return this.add(light)
    }

    /**
     * Get the objects
     * 
     * @returns {Array<THREE.Object3D>} the objects
     */
    getObjects() {
        return this.objects
    }
}
