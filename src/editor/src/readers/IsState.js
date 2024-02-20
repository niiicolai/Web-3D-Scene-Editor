import Reader from "../abstractions/Reader.js";

const validNames = [
    'initializing',
    'executing',
    'paused',
    'stopped',
    'exiting'
];

/**
 * @extends Reader
 * @class
 * @classdesc IsState Checks if the current state is the given state
 */
export default class IsState extends Reader {

    /**
     * @constructor
     */
    constructor(editor) {
        super(editor);
    }

    /**
     * Read the result of the state check
     * 
     * @returns {boolean} true if the current state is the given state
     */
    read() {
        throw new Error('use compare() instead');
    }

    /**
     * Read the result of the state check
     * 
     * @param {string} name - The name of the state to check
     * @returns {boolean} true if the current state is the given state
     */
    compare(name) {
        name = name.toLowerCase();

        const state = this.editor.context.state;
        if (!validNames.includes(name)) {
            throw new Error('Invalid state name');
        }
        
        return state.constructor.name.toLowerCase() == name;
    }
}
