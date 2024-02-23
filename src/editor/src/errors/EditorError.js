
export default class EditorError extends Error {
    constructor(message) {
        super(message)
        this.name = 'EditorError'
    }
}
