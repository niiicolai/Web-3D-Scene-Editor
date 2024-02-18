import Reader from "../abstractions/Reader.js";

export default class ReadObjects extends Reader {
    constructor() {
        super();
    }

    read() {
        return this.context.options.plugins.objects.objects;
    }
}
