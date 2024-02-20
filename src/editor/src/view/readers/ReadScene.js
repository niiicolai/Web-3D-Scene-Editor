import Reader from "../../abstractions/Reader.js";

/**
 * @extends Reader
 * 
 * @class
 * @classdesc ReadScene reads the current scene
 */
export default class ReadScene extends Reader {
    constructor(editor) {
        super(editor);
    }

    read() {
        return this.editor.view.scene
    }
}
