import { State } from '../abstractions/States.js'

export default class Executing extends State {
    enter() {
        for (const key in this.context.options.plugins) {
            this.context.options.plugins[key].resume()
        }

        this.context.options.view.startLoop()
    }

    execute() {
        /**
         * Render the context view
         */
        this.context.options.view.render()
    }
}
