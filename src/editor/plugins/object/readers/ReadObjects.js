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
        this.objects = this.editor.getPlugin('objects');
    }

    /**
     * Read the objects from the context
     * 
     * @returns {Array<object>} the objects
     */
    read() {
        return this.objects.getObjects();
    }
}
