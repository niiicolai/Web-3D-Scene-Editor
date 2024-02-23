import { Command } from '../../../editor.js'

/**
 * @extends Command
 * @class
 * @classdesc DeactivateTool deactivates the current active tool
 */
export default class DeactivateTool extends Command {

    /**
     * @constructor
     */
    constructor() {
        super()
    }

    /**
     * Execute the command
     * 
     * @returns {void}
     */
    async execute() {
        const tools = this.invoker.options.getPlugin('tools')
        tools.removeTool()
    }
}
