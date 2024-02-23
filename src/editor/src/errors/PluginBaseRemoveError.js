import PluginError from "./PluginError.js"

/**
 * The error message to display
 * 
 * @param {string} pluginName - the name of the plugin that tried to be removed
 * @returns {string} The error message.
 */
const message = (pluginName) => `
Plugin ${pluginName} is a built-in plugin and cannot be removed.
`

/**
 * @class
 * @classdesc PluginBaseRemoveError is thrown when a built-in plugin is tried to be removed
 * @property {string} pluginName - the name of the plugin that tried to be removed
 */
export default class PluginBaseRemoveError extends PluginError {

    /**
     * @constructor
     * 
     * @param {string} message - The error message.
     * @param {string} pluginName - the name of the plugin that tried to be removed
     */
    constructor(pluginName) {
        super(message(pluginName), pluginName)
        this.name = 'PluginBaseRemoveError'
    }
}
