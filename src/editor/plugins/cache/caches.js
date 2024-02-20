import BasePlugin from '../../src/abstractions/BasePlugin.js';
import Cache from './src/Cache.js'

import MeshCloningStrategy from "./strategies/cloning/MeshStrategy.js";
import MaterialCloningStrategy from "./strategies/cloning/MaterialStrategy.js";
import TextureCloningStrategy from "./strategies/cloning/TextureStrategy.js";

import MeshDisposingStrategy from "./strategies/disposing/MeshStrategy.js";
import MaterialDisposingStrategy from "./strategies/disposing/MaterialStrategy.js";
import TextureDisposingStrategy from "./strategies/disposing/TextureStrategy.js";

/**
 * @extends BasePlugin
 * @class
 * @classdesc A plugin used to manage loading, caching, and disposing of resources
 */
export default class Caches extends BasePlugin {

    /**
     * Constructor
     * 
     */
    constructor() {
        super();

        this.caches = [
            new Cache('meshes', 
                new MeshCloningStrategy(), 
                new MeshDisposingStrategy(),
                1
            ),
            new Cache('materials',
                new MaterialCloningStrategy(),
                new MaterialDisposingStrategy(),
                2
            ),
            new Cache('textures',
                new TextureCloningStrategy(),
                new TextureDisposingStrategy(),
                3
            )
        ]
    }

    /**
     * Clear all caches
     * 
     * @returns {void}
     */
    clear() {
        for (const cache of this.caches) {
            cache.disposeAll()
        }
    }

    /**
     * Find a cache by name
     * 
     * @param {string} name
     * @returns {Cache|null}
     */
    find(name) {
        for (const cache of this.caches) {
            if (cache.name === name) {
                return cache
            }
        }

        return null
    }
}
