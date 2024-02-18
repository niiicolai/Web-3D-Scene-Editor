import { State } from '../abstractions/States.js'

export default class Executing extends State {
    enter() {
        /**
         * Setup event listeners
         */
        this.context.options.events.setupListeners()

        /**
         * Setup selector listeners
         */
        this.context.selector.setupListeners()

        /**
         * Setup the tool listeners
         */
        this.context.options.tools.setupListeners(this.context.options.events)

        /**
         * Start an interval executing the context
         * until it is stopped
         */
        this.context.options.update.start(this.context.execute.bind(this.context))
    }

    execute() {
        /**
         * Render the context view
         */
        this.context.view.render()
    }
}
