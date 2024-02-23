import { Command } from '../../../editor.js'
import CacheEntryDuplicationError from '../errors/CacheEntryDuplicationError.js'
import * as THREE from 'three'

/**
 * @extends Command
 * @class
 * @classdesc LoadMaterial, loads a material and adds it to the materials cache
 */
export default class LoadMaterial extends Command {

    /**
     * @constructor
     * 
     * @param {string} name the name of the material
     * @param {string} type the type of the material
     * @param {Array<string>} textureNames the names of the textures to use
     * @throws {Error} if name is not a string
     * @throws {Error} if type is not a string
     * @throws {Error} if textureNames is not an array
     * @throws {Error} if textureName is not a string
     */
    constructor(name, type, textureNames) {
        super()

        if (typeof name !== 'string') {
            throw new Error('Must be a string')
        }

        if (typeof type !== 'string') {
            throw new Error('Must be a string')
        }

        if (!Array.isArray(textureNames)) {
            throw new Error('Must be an array')
        }

        for (const textureName of textureNames) {            
            if (typeof textureName !== 'string') {
                throw new Error('TextureNames must be strings')
            }
        }
        
        this.name = name
        this.type = type
        this.textureNames = textureNames
    }

    /**
     * Execute the command
     * 
     * @returns {void}
     */
    async execute() {
        const caches = this.invoker.options.getPlugin('caches')
        const materialCache = caches.find('materials')

        const cacheKey = this.name
        const cached = materialCache.find(cacheKey)
        if (cached) {
            throw new CacheEntryDuplicationError('materials', cacheKey)
        }

        const textureCache = caches.find('textures')

        const material = new THREE[this.type]()
        material.name = this.name
        for (const textureName of this.textureNames) {
            const clonedTexture = textureCache.clone(textureName)
            material[clonedTexture.type] = clonedTexture.texture
        }

        const cacheValue = {material, type: this.type, textureNames: this.textureNames}

        materialCache.add(cacheKey, cacheValue)
    }
}
