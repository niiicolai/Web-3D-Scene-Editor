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
        for (const key in this.context.options.plugins) {
            this.context.options.plugins[key].clear()
        }

        /**
         * Stop the view rendering
         */
        this.context.options.view.stopRender()

        /**
         * Change the state to Stopped        
         */
        this.context.changeState(new Stopped()) 
    }
}
 