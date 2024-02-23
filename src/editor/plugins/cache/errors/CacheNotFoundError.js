import { PluginError } from "../../../editor.js"

/**
 * The error message to display
 * 
 * @param {string} cacheName - The cache name.
 * @returns {string} The error message.
 */
const message = (cacheName) => `
The cache plugin failed to find the cache with the name, ${cacheName},
because it does not exist in the cache list.
- A cache can only be found by the name it was created with
- Ensure the cache name is correct
- Ensure the cache has been created
`

/**
 * @class
 * @classdesc CacheNotFoundError is thrown when a cache cannot be found
 * @property {string} cacheName - The cache name.
 */
export default class CacheNotFoundError extends PluginError {

    /**
     * @constructor
     * 
     * @param {string} cacheName - The cache name.
     * @throws {Error} if cacheName is not a string
     */
    constructor(cacheName) {
        super(message(cacheName), "Cache")

        if (typeof cacheName !== 'string') {
            throw new Error('cacheName must be a string')
        }

        this.name = 'CacheNotFoundError'
        this.cacheName = cacheName
    }
}
