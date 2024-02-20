import Command from './abstractions/Command.js'

/**
 * @class
 * @classdesc The invoker is a class that is used to set a command and execute it.
 * @property {Command} command
 * @property {Object} options
 */
export default class Invoker {

    /**
     * @constructor
     * @param {Object} options
     */
    constructor(options = {}) {
        this.options = options
    }

    /**
     * The setCommand method is called to set the command of the invoker.
     * 
     * @param {Command} command
     * @throws {Error} If command is not a Command
     * @returns {void}
     */
    setCommand(command) {
        if (!(command instanceof Command)) {
            throw new Error('Must be a Command')
        }

        this.command = command
        this.command?.setInvoker(this)
    }

    /**
     * The execute method is called to execute the command.
     * 
     * @returns {Promise<void>}
     */
    async execute() {
        if (this.command) {
            await this.command.execute()
        }
    }

    /**
     * Set the command and instantly execute it.
     * 
     * @param {Command} command
     * @returns {Promise<void>}
     */
    async invoke(command) {
        this.setCommand(command)
        await this.execute()
    }
}
