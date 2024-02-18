import Plugin from "../abstractions/Plugin.js"
import Cache from '../abstractions/Cache.js'
import Cloning from '../cache/CloningStrategy.js'
import Disposing from '../cache/DisposingStrategy.js'

export default class Caches extends Plugin {
    constructor() {
        super();

        this.caches = [
            new Cache('meshes', 
                new Cloning.MeshStrategy(), 
                new Disposing.MeshStrategy(),
                1),
            new Cache('materials',
                new Cloning.MaterialStrategy(),
                new Disposing.MaterialStrategy(),
                2),
            new Cache('textures',
                new Cloning.TextureStrategy(),
                new Disposing.TextureStrategy(),
                3)
        ]
    }

    clear() {
        for (const cache of this.caches) {
            cache.disposeAll()
        }
    }

    find(name) {
        for (const cache of this.caches) {
            if (cache.name === name) {
                return cache
            }
        }

        return null
    }
}
