
/**
 * @class
 * @classdesc Base class for all readers
 * @property {BaseEditor} baseEditor
 * @abstract
 */
export default class Reader {

    /**
     * @constructor
     */
    constructor(editor) {
        this.editor = editor
    }

    /**
     * Read the context and return the result.
     * 
     * @abstract
     * @throws {Error} If not implemented
     * @returns {any}
     */
    read() {
        throw new Error('Not implemented')
    }
}
