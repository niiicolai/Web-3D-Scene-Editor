import { State } from '../abstractions/States.js'
import Stopped from './Stopped.js'

export default class Exiting extends State {
    enter() {
        for (const key in this.context.options.plugins) {
            this.context.options.plugins[key].clear()
        }

        this.context.options.view.stopLoop()

        /**
         * Change the state to Stopped        
         */
        this.context.changeState(new Stopped()) 
    }
}
 