import * as THREE from 'three'
import { Command } from '../abstractions/Commands.js';

export default class CreateMaterial extends Command {
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
        const materialCache = this.invoker.options.plugins.caches.find('materials')
        if (!materialCache) {
            throw new Error('Material cache not found')
        }

        const cacheKey = this.name
        const cached = materialCache.find(cacheKey)
        if (cached) {
            throw new Error('Material already loaded')
        }

        const textureCache = this.invoker.options.plugins.caches.find('textures')
        if (!textureCache) {
            throw new Error('Textures cache not found')
        }

        const material = new THREE[this.type]()
        material.name = this.name
        
        for (const textureName of this.textureNames) {
            const clonedTexture = textureCache.clone(textureName)
            material[clonedTexture.type] = clonedTexture.texture
        }
        const cacheValue = {material, 
            type: this.type, textureSources: this.textureSources}

        materialCache.add(cacheKey, cacheValue)
    }
}
