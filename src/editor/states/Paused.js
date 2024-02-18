import { State } from '../abstractions/States.js'

export default class Paused extends State {
    enter() {
        for (const key in this.context.options.plugins) {
            this.context.options.plugins[key].pause()
        }

        this.context.options.view.stopLoop()
    }
}
