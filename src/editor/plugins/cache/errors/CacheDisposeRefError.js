import { PluginError } from "../../../editor.js"

/**
 * The error message to display
 * 
 * @param {string} cacheKey - The cache key.
 * @param {Array<string>} usedBy - The resources that are using the cache key.
 * @returns {string} The error message.
 */
const message = (cacheKey, usedBy) => `
The cache plugin failed to dispose a the cached object with ID, ${cacheKey},
because it is currently in use by another resource. For example, if the a
mesh is using a material, the material cannot be disposed until the mesh is
disposed. 

The object is currently in use by the following resources:
${usedBy.map(name => `- ${name}`).join('\n')}
`

/**
 * @class
 * @classdesc CacheDisposeRefError is thrown when a cache object cannot be disposed
 * because it is currently in use by another resource.
 * 
 * @property {string} cacheKey - The cache key.
 * @property {Array<string>} usedBy - The resources that are using the cache key.
 */
export default class CacheDisposeRefError extends PluginError {

    /**
     * @constructor
     * 
     * @param {string} cacheKey - The cache key.
     * @param {Array<string>} usedBy - The resources that are using the cache key.
     * @throws {Error} if cacheKey is not a string
     * @throws {Error} if usedBy is not an array
     */
    constructor(cacheKey, usedBy = []) {
        super(message(cacheKey, usedBy), "Cache")

        if (typeof cacheKey !== 'string') {
            throw new Error('cacheKey must be a string')
        }

        if (!Array.isArray(usedBy)) {
            throw new Error('usedBy must be an array')
        }

        this.name = 'CacheDisposeRefError'
        this.cacheKey = cacheKey
        this.usedBy = usedBy
    }
}
