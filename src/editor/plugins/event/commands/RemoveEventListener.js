import { Command, PluginNotFoundError } from '../../../editor.js'

/**
 * @extends Command
 * @class
 * @classdesc RemoveEventListener removes an event listener
 */
export default class RemoveEventListener extends Command {

    /**
     * @constructor
     * 
     * @param {string} event the event to remove
     * @param {function} callback the callback to remove
     * @throws {Error} if event is not a string
     * @throws {Error} if callback is not a function
     */
    constructor(event, callback) {
        super()

        if (typeof event !== 'event') {
            throw new Error('Name must be a string')
        }

        if (typeof callback !== 'function') {
            throw new Error('Callback must be a function')
        }
        
        this.event = event
        this.callback = callback
    }

    /**
     * Execute the command
     * 
     * @returns {void}
     */
    async execute() {
        const events = this.invoker.options.getPlugin('events')
        events.removeEventListener(this.event, this.callback)
    }
}
