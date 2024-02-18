import Reader from "../abstractions/Reader.js";

export default class ReadCache extends Reader {
    constructor(name) {
        super();

        if (typeof name !== 'string') {
            throw new Error('Name must be a string');
        }

        this.name = name;
    }

    read() {
        const { cache } = this.context.options.plugins.caches.find(this.name);
        
        if (!cache) {
            throw new Error('Invalid cache name')
        }

        return Object.values(cache)
    }
}
