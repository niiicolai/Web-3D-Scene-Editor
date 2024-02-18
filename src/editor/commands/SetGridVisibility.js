import * as THREE from 'three'
import { Command } from '../abstractions/Commands.js';

export default class SetGridVisibility extends Command {
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
