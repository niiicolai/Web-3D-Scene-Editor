import { Command } from '../abstractions/Commands.js';

export default class CreateObject extends Command {
    constructor(meshName, position, rotation, scale) {
        super()
        
        if (typeof meshName !== 'string') {
            throw new Error('Must be a string')
        }
        
        this.meshName = meshName
        this.position = position
        this.rotation = rotation
        this.scale = scale
    }

    /**
     * Execute the command
     * 
     * @returns {void}
     */
    async execute() {
        console.log(this)
        const mesh = this.invoker.options.plugins.objects.addMeshByName(this.meshName)
        
        if (this.position) {
            mesh.position.set(this.position.x, this.position.y, this.position.z)
        }

        if (this.rotation) {
            mesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z)
        }

        if (this.scale) {
            mesh.scale.set(this.scale.x, this.scale.y, this.scale.z)
        }
    }
}
