import { Command } from '../../../editor.js'
import CacheDisposeRefError from '../errors/CacheDisposeRefError.js'

/**
 * @extends Command
 * @class
 * @classdesc DisposeMesh, disposes a mesh and removes it from the meshes cache
 */
export default class DisposeMesh extends Command {

    /**
     * @constructor
     * 
     * @param {string} name the name of the material
     * @throws {Error} if name is not a string
     */
    constructor(name) {
        super()

        if (typeof name !== 'string') {
            throw new Error('Must be a string')
        }

        this.name = name
    }

    /**
     * Execute the command
     * 
     * @returns {void}
     */
    async execute() {
        const caches = this.invoker.options.getPlugin('caches')
        const objects = this.invoker.options.getPlugin('objects')

        /**
         * Loop through all the object and 
         * check if the mesh is in use
         */
        const usedBy = []
        for (const object of objects.objects) {
            if (object.name === this.name) {
                usedBy.push(object.name)
            }
        }

        if (usedBy.length > 0) {
            throw new CacheDisposeRefError(this.name, usedBy)
        }

        const meshCache = caches.find('meshes')

        meshCache.dispose(this.name)
    }
}
