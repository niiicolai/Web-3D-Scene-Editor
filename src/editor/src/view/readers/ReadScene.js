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
        this.view = this.editor.getView();
    }

    read() {
        return this.view.scene;
    }
}
