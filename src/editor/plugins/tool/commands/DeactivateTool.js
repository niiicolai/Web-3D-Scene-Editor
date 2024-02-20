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
        this.invoker.options.plugins.tools.removeTool()
    }
}
