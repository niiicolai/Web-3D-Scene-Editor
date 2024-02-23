import State from '../abstractions/State.js'

/**
 * @class Paused
 * @classdesc The Paused state is executed when the editor is paused.
 * @extends State
 */
export default class Paused extends State {
    enter() {
        /**
         * Pause all the plugins
         */
        const plugins = this.context.options.allPlugins()
        for (const key in plugins) {
            plugins[key].pause()
        }

        /**
         * Stop the view rendering
         */
        const view = this.context.options.getView()
        view.stopRender()
    }
}
