import PluginError from "./PluginError.js"

/**
 * The error message to display
 * 
 * @param {string} pluginName - the name of the plugin that already exists
 * @returns {string} The error message.
 */
const message = (pluginName) => `
Plugin ${pluginName} does already exist. Please use a different name.
`

/**
 * @class
 * @classdesc PluginDuplicationError is thrown when a plugin with the same name already exists
 * @property {string} pluginName - the name of the plugin that already exists
 */
export default class PluginDuplicationError extends PluginError {

    /**
     * @constructor
     * 
     * @param {string} message - The error message.
     * @param {string} pluginName - the name of the plugin that already exists
     */
    constructor(pluginName) {
        super(message(pluginName), pluginName)
        this.name = 'PluginDuplicationError'
    }
}
