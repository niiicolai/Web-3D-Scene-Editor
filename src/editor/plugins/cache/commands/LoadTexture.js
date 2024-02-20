import { Command } from '../../../editor.js'
import * as THREE from 'three'

/**
 * @extends Command
 * @class
 * @classdesc LoadTexture, loads a texture and adds it to the textures cache
 */
export default class LoadTexture extends Command {

    /**
     * @constructor
     * 
     * @param {string} name the name of the texture
     * @param {string} src the source of the texture
     * @param {string} type the type of the texture
     * @throws {Error} if name is not a string
     * @throws {Error} if src is not a string
     * @throws {Error} if type is not a string
     */
    constructor(name, src, type) {
        super()

        if (typeof name !== 'string') {
            throw new Error('Name must be a string')
        }

        if (typeof src !== 'string') {
            throw new Error('Src must be a string')
        }

        if (typeof type !== 'string') {
            throw new Error('Type must be a string')
        }
        
        this.name = name
        this.src = src
        this.type = type
    }

    /**
     * Execute the command
     * 
     * @returns {void}
     */
    async execute() {
        const cache = this.invoker.options.plugins.caches.find('textures')
        if (!cache) {
            throw new Error('Textures Cache not found')
        }

        const cacheKey = this.name
        const cached = cache.find(cacheKey)
        if (cached) {
            throw new Error('Texture already loaded')
        }

        const textureLoader = new THREE.TextureLoader()
        const texture = await textureLoader.loadAsync(this.src)
        texture.name = this.name
        const cacheValue = {texture, src: this.src, type: this.type}
        cache.add(cacheKey, cacheValue)
    }
}
