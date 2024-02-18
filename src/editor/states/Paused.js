import { State } from '../abstractions/States.js'

export default class Paused extends State {
    enter() {
        /**
         * Destroy the event listeners
         */
        this.context.options.events.destroyListeners()

        /**
         * Destroy the selector listeners
         */
        this.context.selector.destroyListeners()

        /**
         * Destroy the tool listeners
         */
        this.context.options.tools.destroyListeners(this.context.options.events)

        /**
         * Stop the loop         
         */
        this.context.options.update.stop()
    }
}
