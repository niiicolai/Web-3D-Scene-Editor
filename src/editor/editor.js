import { Context } from './abstractions/States.js'
import { Invoker } from './abstractions/Commands.js'
import Tool from './abstractions/Tool.js'

import { ViewConfiguration } from './handlers/view.js'
import Events from './handlers/events.js'
import Update from './handlers/update.js'
import Tools from './handlers/tools.js'

import Initializing from './states/Initializing.js'
import Executing from './states/Executing.js'
import Exiting from './states/Exiting.js'
import Stopped from './states/Stopped.js'
import Paused from './states/Paused.js'

export default class Editor {
    constructor(canvas, viewConfiguration = new ViewConfiguration(), frameRate = 1000 / 60) {
        if (!(canvas instanceof HTMLCanvasElement)) {
            throw new Error('Must be a HTMLCanvasElement')
        }

        if (!(viewConfiguration instanceof ViewConfiguration)) {
            throw new Error('Must be a ViewConfiguration')
        }

        if (typeof frameRate !== 'number') {
            throw new Error('Must be a number')
        }

        this.canvas = canvas
        this.frameRate = frameRate
        this.viewConfiguration = viewConfiguration
        this.invoker = new Invoker(this)
        this.context = new Context(new Stopped(), { 
            events: new Events(this.canvas), 
            update: new Update(this.frameRate),
            tools: new Tools()
        })
    }

    start() {
        if (this.isState(Stopped) || this.context.state == null) {
            this.context.changeState(new Initializing(this.canvas, this.viewConfiguration))
        } else {
            throw new Error('Cannot start when not stopped')
        }
    }

    resume() {
        if (this.isState(Paused)) {
            this.context.changeState(new Executing())
        } else {
            throw new Error('Cannot resume when not paused')
        }
    }

    pause() {
        if (this.isState(Executing)) {
            this.context.changeState(new Paused())
        } else {
            throw new Error('Cannot pause when not executing')
        }
    }

    stop() {
        if (!this.isState(Stopped)) {
            this.context.changeState(new Exiting())
        } else {
            throw new Error('Is already stopped')
        }
    }

    isState(stateType) {
        return this.context.isState(stateType)
    }

    addEventListener(event, callback) {
        this.context.options.events.addEventListener(event, callback)
    }

    removeEventListener(event, callback) {
        this.context.options.events.removeEventListener(event, callback)
    }

    activateTool(tool) {
        if (!(tool instanceof Tool)) {
            throw new Error('Must be a Tool')
        }

        this.context.options.tools.setTool(tool)
    }

    deactivateTool() {
        this.context.options.tools.removeTool()
    }

    isTool(tool) {
        return this.context.options.tools.isTool(tool)
    }

    async invoke(command) {
        await this.invoker.invoke(command)
    }
}

Editor.STATES = {
    Initializing,
    Executing,
    Exiting,
    Paused,
    Stopped
}
