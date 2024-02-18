import { State } from '../abstractions/States.js'

import Executing from './executing.js';

export default class Initializing extends State {
    constructor() {
        super()
    }

    enter() {
        for (const key in this.context.options.plugins) {
            this.context.options.plugins[key].setup(this.context)
        }

        /**
         * Move to the executing state
         */
        this.context.changeState(new Executing()) 
    }
}
