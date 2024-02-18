import Reader from "../abstractions/Reader.js";

export default class ReadView extends Reader {
    constructor() {
        super();
    }

    read() {
        return {
            scene: this.context.options.view.scene,
        }
    }
}
