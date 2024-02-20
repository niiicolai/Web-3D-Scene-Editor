
/**
 * @class Plugin
 * @classdesc Base class for all plugins.
 * @abstract
 */
export default class BasePlugin {

    /**
     * @constructor
     */
    constructor() {
    }

    /**
     * Setup the plugin.
     * 
     * @param {Context} context
     * @returns {void}
     * @abstract
     */
    setup(context) {
    }

    /**
     * Clear the plugin.
     * 
     * @returns {void}
     * @abstract
     */
    clear() {
    }

    /**
     * Pause the plugin.
     * 
     * @returns {void}
     * @abstract
     */
    pause() {
    }

    /**
     * Resume the plugin.
     * 
     * @returns {void}
     * @abstract
     */
    resume() {
    }
}
