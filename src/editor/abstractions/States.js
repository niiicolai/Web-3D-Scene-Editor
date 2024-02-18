/**
 * https://refactoring.guru/design-patterns/state
 */

/**
 * A state is a class that encapsulates the behavior of the context.
 */
class State {
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

    /**
     * Verify if the object is a state.
     * 
     * @throws {Error} If not implemented
     * @returns {void}
     */
    static validate(state) {
        if (!(state instanceof State)) {
            throw new Error('Must be a State')
        }
    }
}

/**
 * The context is a class that contains a reference to the current state.
 * It delegates the execution of the behavior to the current state.
 * 
 * @param {State} initialState
 * @throws {Error} If initialState is not a state
 */
class Context {
    constructor(initialState, options={}) {
        this.options = options

        if (initialState instanceof State) {
            this.changeState(initialState)
        }
    }

    /**
     * The changeState method is called to change the current state.
     * 
     * @param {State} state
     * @throws {Error} If state is not a state
     * @returns {void}
     */
    changeState(state) {
        if (!(state instanceof State)) {
            throw new Error('Must be a State')
        }

        if (this.state != null && this.state !== state) {
            this.state.exit()
            this.state = null
        }

        this.state = state
        this.state?.setContext(this)
        this.state?.enter()
    }
    
    /**
     * The execute method is called in a loop to execute the behavior of the current state.
     * 
     * @returns {void}
     */
    execute() {
        if (this.state !== null) {
            this.state.execute()
        }
    }

    isState(stateType) {
        return this.state instanceof stateType
    }
}

export {
    State,
    Context
}
