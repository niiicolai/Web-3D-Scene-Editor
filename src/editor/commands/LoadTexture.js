import * as THREE from 'three'
import { Command } from '../abstractions/Commands.js';
import Cache from '../abstractions/Cache.js';

export default class LoadTexture extends Command {
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
        const cache = this.invoker.options.context.textureCache
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
