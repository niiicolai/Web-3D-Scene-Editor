import { PluginError } from "../../../editor.js"

/**
 * The error message to display
 * 
 * @param {string} cacheName - The cache name.
 * @param {string} cacheKey - The cache key.
 * @returns {string} The error message.
 */
const message = (cacheName, cacheKey) => `
The cache plugin failed to insert into a resource with cache key, ${cacheKey},
into cache with the name, ${cacheName}, because an entry with the same key already exists.
- A cache entry must have a unique key
- Use another key if the resource is different
`

/**
 * @class
 * @classdesc CacheEntryDuplicationError is thrown when a cache already contains an entry with the same key
 * @property {string} cacheName - The cache name.
 * @property {string} cacheKey - The cache key.
 */
export default class CacheEntryDuplicationError extends PluginError {

    /**
     * @constructor
     * 
     * @param {string} cacheName - The cache name.
     * @param {string} cacheKey - The cache key.
     * @throws {Error} if cacheName is not a string
     * @throws {Error} if cacheKey is not a string
     */
    constructor(cacheName, cacheKey) {
        super(message(cacheName, cacheKey), "Cache")

        if (typeof cacheName !== 'string') {
            throw new Error('cacheName must be a string')
        }

        if (typeof cacheKey !== 'string') {
            throw new Error('cacheKey must be a string')
        }

        this.name = 'CacheEntryDuplicationError'
        this.cacheName = cacheName
        this.cacheKey = cacheKey
    }
}
