import PluginError from "./PluginError.js"

/**
 * The error message to display
 * 
 * @param {string} pluginName - the name of the plugin that could not be found
 * @returns {string} The error message.
 */
const message = (pluginName) => `
Plugin ${pluginName} does not exist. Ensure ${pluginName} is added to the editor.
`

/**
 * @class
 * @classdesc PluginNotFoundError is thrown when a plugin is not found
 * @property {string} pluginName - the name of the plugin that could not be found
 */
export default class PluginNotFoundError extends PluginError {

    /**
     * @constructor
     * 
     * @param {string} message - The error message.
     * @param {string} pluginName - the name of the plugin that could not be found
     */
    constructor(pluginName) {
        super(message(pluginName), pluginName)
        this.name = 'PluginNotFoundError'
    }
}
