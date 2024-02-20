import { Command } from '../../../editor.js'
import Tool from '../src/Tool.js';

/**
 * @extends Command
 * @class
 * @classdesc ActivateTool activates a tool
 */
export default class ActivateTool extends Command {

    /**
     * @constructor
     * 
     * @param {Tool} tool the tool to activate
     * @throws {Error} if tool is not a Tool
     */
    constructor(tool) {
        super()

        if (!(tool instanceof Tool)) {
            throw new Error('Must be a Tool')
        }
        
        this.tool = tool
    }

    /**
     * Execute the command
     * 
     * @returns {void}
     */
    async execute() {
        this.invoker.options.plugins.tools.setTool(this.tool)
    }
}
