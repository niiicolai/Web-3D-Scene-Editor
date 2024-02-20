import Context from '../Context.js'

/**
 * @class 
 * @classdesc A state is a class that encapsulates the behavior of the context.
 * @abstract
 */
export default class State {
    /**
     * The setContext method is called to set the context of the state.
     * 
     * @param {Context} context
     * @throws {Error} If context is not a context
     * @returns {void}
     */
    setContext(context) {
        if (!(context instanceof Context)) {
            throw new Error('Must be a Context')
        }
        
        this.context = context
    }

    /**
     * The enter method is called when the state is entered.
     * 
     * @returns {void}
     */
    enter() {
    }

    /**
     * The execute method is called in a loop while the state is active.
     * 
     * @returns {void}
     */
    execute() {
    }

    /**
     * The exit method is called when the state is exited.
     * 
     * @returns {void}
     */
    exit() {
    }
}
