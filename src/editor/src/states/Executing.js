import State from '../abstractions/State.js'

/**
 * @class Executing
 * @classdesc The Executing state is the state where the view can be used.
 * @extends State
 */
export default class Executing extends State {
    enter() {
        /**
         * Resume all the plugins
         */
        for (const key in this.context.options.plugins) {
            this.context.options.plugins[key].resume()
        }

        /**
         * Start the view rendering
         */
        this.context.options.view.startRender()
    }
}
