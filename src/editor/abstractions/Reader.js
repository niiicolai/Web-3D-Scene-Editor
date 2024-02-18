
export default class Reader {
    constructor() {
        this.context = null
    }

    setContext(context) {
        this.context = context
    }

    read() {
        throw new Error('Not implemented')
    }
}
