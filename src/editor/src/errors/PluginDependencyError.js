import PluginError from "./PluginError.js"

/**
 * The error message to display
 * 
 * @param {string} independentPluginName - the name of the plugin that use the other plugin
 * @param {string} dependentPluginName - the name of the plugin that is being used
 * @returns {string} The error message.
 */
const message = (independentPluginName, dependentPluginName) => `
Plugin ${independentPluginName} is dependent on plugin ${dependentPluginName},
but ${dependentPluginName} does not exist.
- Ensure ${dependentPluginName} is added to the editor
`

/**
 * @class
 * @classdesc PluginDependencyError is thrown when a plugin is dependent on another plugin
 * that does not exist
 * 
 * @property {string} dependentPluginName - the name of the plugin that is being used
 */
export default class PluginDependencyError extends PluginError {

    /**
     * @constructor
     * 
     * @param {string} message - The error message.
     * @param {string} independentPluginName - the name of the plugin that use the other plugin
     * @param {string} dependentPluginName - the name of the plugin that is being used
     * @throws {Error} if independentPluginName is not a string
     * @throws {Error} if dependentPluginName is not a string
     */
    constructor(independentPluginName, dependentPluginName) {
        super(message(independentPluginName, dependentPluginName), independentPluginName)
        this.name = 'PluginError'
        this.dependentPluginName = dependentPluginName
    }
}
