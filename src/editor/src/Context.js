import State from './abstractions/State.js'
import { EditorInterface } from './BaseEditor.js'

/**
 * @class
 * @classdesc The context is a class that contains a reference to the current state.
 * @classdesc It delegates the execution of the behavior to the current state.
 * @property {State} state
 * @property {Object} options
 */
export default class Context {

    /**
     * @constructor
     * @param {State} initialState
     * @param {EditorInterface} editorInterface
     * @throws {Error} If initialState is not a state
     */
    constructor(initialState, editorInterface) {
        if (!(editorInterface instanceof EditorInterface)) {
            throw new Error('BaseInterface Must be a BaseInterface')
        }
        this.options = editorInterface

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

    /**
     * Check if the current state is of a specific state type.
     * 
     * @param {State} stateType
     * @returns {boolean}
     */
    isStateType(stateType) {
        return this.state instanceof stateType
    }
}
