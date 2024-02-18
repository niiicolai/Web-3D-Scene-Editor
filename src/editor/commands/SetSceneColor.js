import * as THREE from 'three'
import { Command } from '../abstractions/Commands.js';

export default class SetSceneColor extends Command {
    constructor(color) {
        super()

        if (!(color instanceof THREE.Color)) {
            throw new Error('Must be a THREE.Color')
        }
        
        this.color = color
    }

    /**
     * Execute the command
     * 
     * @returns {void}
     */
    async execute() {
        const { viewConfiguration } = this.invoker.options.context.view
        viewConfiguration.sceneConfig.instance.background = this.color
    }
}
