import State from '../abstractions/State.js'
import Executing from './Executing.js';

/**
 * @class Initializing
 * @classdesc The Initializing state is the first state that the editor will be in.
 * @extends State
 */
export default class Initializing extends State {
    enter() {
        /**
         * Setup the view
         */
        const view = this.context.options.getView()
        view.setup(this.context)

        /**
         * Setup all the plugins
         */
        const plugins = this.context.options.allPlugins()
        for (const key in plugins) {
            plugins[key].setup(this.context)
        }

        /**
         * Add the initial lights
         */
        const objects = this.context.options.getPlugin('objects')
        view.addLights(objects)

        /**
         * Move to the executing state
         */
        this.context.changeState(new Executing()) 
    }
}
