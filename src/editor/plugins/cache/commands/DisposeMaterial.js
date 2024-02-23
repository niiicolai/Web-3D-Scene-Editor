import { Command } from '../../../editor.js'
import CacheDisposeRefError from '../errors/CacheDisposeRefError.js'

/**
 * @extends Command
 * @class
 * @classdesc DisposeMaterial, disposes a material and removes it from the materials cache
 */
export default class DisposeMaterial extends Command {

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
        const meshCache = caches.find('meshes')

        /**
         * Loop through all the meshes and 
         * check if the material is in use
         */
        const meshes = Object.values(meshCache.cache)
        const usedBy = []
        for (const mesh of meshes) {
            if (mesh.subMeshConfigurations.some(subMeshConfiguration => {
                return subMeshConfiguration.materialName === this.name
            })) usedBy.push(mesh.mesh.name)
        }

        if (usedBy.length > 0) {
            throw new CacheDisposeRefError(this.name, usedBy)
        }

        const materialCache = caches.find('materials')

        materialCache.dispose(this.name)
    }
}
