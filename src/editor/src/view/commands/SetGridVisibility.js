import Command from '../../abstractions/Command.js';

/**
 * @class
 * @classdesc SetGridVisibility sets the visibility of the grid
 * @extends Command
 */
export default class SetGridVisibility extends Command {

    /**
     * @constructor
     * 
     * @param {boolean} visibility the visibility of the grid
     */
    constructor(visibility = false) {
        super()
        
        this.visibility = visibility
    }

    /**
     * Execute the command
     * 
     * @returns {void}
     */
    execute() {
        const { viewConfiguration } = this.invoker.options.view
        const { gridConfig } = viewConfiguration
        gridConfig.instance.visible = this.visibility
    }
}
