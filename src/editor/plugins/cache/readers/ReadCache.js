import { Reader } from '../../../editor.js'

/**
 * @extends Reader
 * @class
 * @classdesc ReadCache reads a cache from the context
 */
export default class ReadCache extends Reader {

    /**
     * @constructor
     * @param {string} name - The name of the cache to read
     * @throws {Error} if name is not a string
     */
    constructor(editor, name) {
        super(editor);

        if (typeof name !== 'string') {
            throw new Error('Name must be a string');
        }

        this.name = name;
        this.cache = this.editor.getPlugin('caches').find(this.name);
    }

    /**
     * Read the cache from the context
     * 
     * @returns {Array<object>} the cache
     * @throws {Error} if the cache name is invalid
     */
    read() {
        return this.cache.toArray();
    }
}
