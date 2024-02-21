import { Reader } from '../../../editor.js'

/**
 * @extends Reader
 * @class
 * @classdesc ReadTool reads the current active tool
 */
export default class ReadTool extends Reader {

    /**
     * @constructor
     */
    constructor(editor) {
        super(editor);
    }

    /**
     * Read the active tool
     * 
     * @returns {Tool|null} the active tool
     */
    read() {
        return this.editor.plugins.tools.getTool();
    }
}
