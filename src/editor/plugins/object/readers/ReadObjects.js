import { Reader } from '../../../editor.js'

/**
 * @extends Reader
 * @class
 * @classdesc ReadObjects reads the objects from the context
 */
export default class ReadObjects extends Reader {

    /**
     * @constructor
     */
    constructor(editor) {
        super(editor);
    }

    /**
     * Read the objects from the context
     * 
     * @returns {Array<object>} the objects
     */
    read() {
        return this.editor.plugins.objects.objects;
    }
}
