import EditorError from "./EditorError.js"

export default class PluginError extends EditorError {
    constructor(message, pluginName) {
        super(message)
        this.name = 'PluginError'
        this.pluginName = pluginName
    }
}
