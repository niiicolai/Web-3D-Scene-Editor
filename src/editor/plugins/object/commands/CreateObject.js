import { Command } from '../../../editor.js'

/**
 * @extends Command
 * @class
 * @classdesc CreateObject create an object from a mesh
 */
export default class CreateObject extends Command {

    /**
     * @constructor
     * 
     * @param {string} meshName the name of the mesh to create
     * @param {object} position the position of the object (optional)
     * @param {object} rotation the rotation of the object (optional)
     * @param {object} scale the scale of the object (optional)
     * @throws {Error} if meshName is not a string
     */
    constructor(meshName, position, rotation, scale) {
        super()
        
        if (typeof meshName !== 'string') {
            throw new Error('Must be a string')
        }
        
        this.meshName = meshName
        this.position = position
        this.rotation = rotation
        this.scale = scale
    }

    /**
     * Execute the command
     * 
     * @returns {void}
     */
    async execute() {
        const objects = this.invoker.options.getPlugin('objects')
        const caches = this.invoker.options.getPlugin('caches')
        const meshCache = caches.find('meshes')

        const mesh = meshCache.clone(this.meshName)
        if (!mesh) {
            throw new Error('Unable to clone mesh')
        }
        
        if (this.position) {
            mesh.position.set(this.position.x, this.position.y, this.position.z)
        }

        if (this.rotation) {
            mesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
        }

        if (this.scale) {
            mesh.scale.set(this.scale.x, this.scale.y, this.scale.z)
        }

        // Add the object to the scene and objects list
        objects.add(mesh)
    }
}
