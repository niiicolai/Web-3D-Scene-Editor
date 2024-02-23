import { Command } from '../../../editor.js'
import CacheDisposeRefError from '../errors/CacheDisposeRefError.js'
import * as THREE from 'three'

/**
 * @extends Command
 * @class
 * @classdesc DisposeTexture, disposes a texture and removes it from the textures cache
 */
export default class DisposeTexture extends Command {

    /**
     * @constructor
     * 
     * @param {string} name the name of the texture
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
        const materialsCache = caches.find('materials')

        /**
         * Loop through all the materials and 
         * check if the texture is in use
         */
        const materials = Object.values(materialsCache.cache)
        const usedBy = []
        for (const data of materials) {
            const material = data.material
            for (const key in material) {
                if (material[key] instanceof THREE.Texture && material[key].name === this.name) {
                    usedBy.push(material.name)
                    break
                }
            }
        }

        if (usedBy.length > 0) {
            throw new CacheDisposeRefError(this.name, usedBy)
        }

        const textureCache = caches.find('textures')

        textureCache.dispose(this.name)
    }
}
