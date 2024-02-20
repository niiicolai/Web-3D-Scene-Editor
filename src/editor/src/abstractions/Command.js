import Invoker from '../Invoker.js';

/**
 * @class
 * @classdesc A command is a class that encapsulates a request as an object.
 * @abstract
 */
export default class Command {

    /**
     * @constructor
     */
    constructor() {
        this.invoker = null;
    }

    /**
     * The setInvoker method is called to set the invoker of the command.
     * 
     * @param {Invoker} invoker
     * @throws {Error} If invoker is not an Invoker
     * @returns {void}
     */
    setInvoker(invoker) {
        if (!(invoker instanceof Invoker)) {
            throw new Error('Must be an Invoker');
        }
        
        this.invoker = invoker;
    }
    
    /**
     * The execute method is called to execute the command.
     * 
     * @abstract
     * @throws {Error} If not implemented
     * @returns {void}
     */
    async execute() {
        throw new Error('execute method must be implemented');
    }
}
