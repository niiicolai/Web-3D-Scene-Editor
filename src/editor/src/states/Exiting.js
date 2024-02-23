import State from '../abstractions/State.js'
import Stopped from './Stopped.js'

/**
 * @class Exiting
 * @classdesc The Exiting state is executed before the editor is stopped.
 * @extends State
 */
export default class Exiting extends State {
    enter() {
        /**
         * Clear all the plugins
         */
        const plugins = this.context.options.allPlugins()
        for (const key in plugins) {
            plugins[key].clear()
        }

        /**
         * Stop the view rendering
         */
        const view = this.context.options.getView()
        view.stopRender()

        /**
         * Change the state to Stopped        
         */
        this.context.changeState(new Stopped()) 
    }
}
 