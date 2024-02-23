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
        const plugins = this.context.options.allPlugins()
        for (const key in plugins) {
            plugins[key].resume()
        }

        /**
         * Start the view rendering
         */
        const view = this.context.options.getView()
        view.startRender()
    }
}
