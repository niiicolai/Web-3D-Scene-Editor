import { Command, PluginNotFoundError } from '../../../editor.js'

/**
 * @extends Command
 * @class
 * @classdesc RemoveEventListener removes an event listener
 */
export default class AddEventListener extends Command {

    /**
     * @constructor
     * 
     * @param {string} event the event to add
     * @param {function} callback the callback to add
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
        events.addEventListener(this.event, this.callback)
    }
}
