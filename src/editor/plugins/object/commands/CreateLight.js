import { Command } from '../../../editor.js'

/**
 * @extends Command
 * @class
 * @classdesc CreateLight create a light object
 */
export default class CreateLight extends Command {

    /**
     * @constructor
     * 
     * @param {string} type the type of the light to create
     * @param {color} color the color of the light (optional)
     * @param {number} intensity the intensity of the light (optional)
     * @throws {Error} if type is not a string
     */
    constructor(type, color, intensity) {
        super()
        
        if (typeof type !== 'string') {
            throw new Error('Must be a string')
        }
        
        this.type = type
        this.color = color
        this.intensity = intensity
    }

    /**
     * Execute the command
     * 
     * @returns {void}
     */
    async execute() {
        const objects = this.invoker.options.getPlugin('objects')
        objects.addLightByType(this.type, this.color, this.intensity)
    }
}
